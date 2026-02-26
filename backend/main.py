from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from langchain_community.vectorstores import SupabaseVectorStore
from langchain_openai import OpenAIEmbeddings
from langchain_anthropic import ChatAnthropic
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage
import os
from dotenv import load_dotenv
from supabase import create_client
import tempfile
from pypdf import PdfReader

load_dotenv()

app = FastAPI(title="RAG AI Assistant")

app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

# Supabase
supabase = create_client(os.getenv("SUPABASE_URL"), os.getenv("SUPABASE_KEY"))
embeddings = OpenAIEmbeddings()

vector_store = SupabaseVectorStore(
    client=supabase,
    embedding=embeddings,
    table_name="documents",
    query_name="match_documents",
)

llm_map = {
    "grok": ChatOpenAI(model="grok-beta", base_url="https://api.x.ai/v1", api_key=os.getenv("GROK_API_KEY")),
    "claude": ChatAnthropic(model="claude-3-5-sonnet-20241022", api_key=os.getenv("ANTHROPIC_API_KEY")),
    "gpt": ChatOpenAI(model="gpt-4o", api_key=os.getenv("OPENAI_API_KEY")),
}

@app.post("/upload")
async def upload(file: UploadFile = File(...)):
    content = await file.read()
    text = ""
    if file.filename.endswith(".pdf"):
        with tempfile.NamedTemporaryFile(suffix=".pdf", delete=False) as tmp:
            tmp.write(content)
            reader = PdfReader(tmp.name)
            text = "\n".join([page.extract_text() or "" for page in reader.pages])
    else:
        text = content.decode()

    # Добавляем в векторную БД
    vector_store.add_texts([text])
    return {"status": "ok", "filename": file.filename}

@app.post("/chat")
async def chat(message: str, model: str = "grok"):
    llm = llm_map.get(model, llm_map["grok"])
    docs = vector_store.similarity_search(message, k=4)
    context = "\n".join([d.page_content for d in docs])
    
    prompt = f"Context: {context}\n\nQuestion: {message}"
    response = llm.invoke([HumanMessage(content=prompt)])
    
    return {
        "response": response.content,
        "sources": [d.metadata for d in docs]
    }
