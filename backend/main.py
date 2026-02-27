from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from langchain_community.vectorstores import SupabaseVectorStore
from langchain_openai import OpenAIEmbeddings
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage
import os
from dotenv import load_dotenv
from supabase import create_client
import tempfile
from pypdf import PdfReader

load_dotenv()

app = FastAPI(title="RAG AI Assistant")

# === CORS — самое важное ===
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*", "https://rag-ai-assistant-smoky.vercel.app", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health check
@app.get("/health")
async def health():
    return {"status": "ok", "llm": "Grok", "backend": "живой"}

# Supabase + embeddings
supabase = create_client(os.getenv("SUPABASE_URL"), os.getenv("SUPABASE_KEY"))
embeddings = OpenAIEmbeddings()

vector_store = SupabaseVectorStore(
    client=supabase,
    embedding=embeddings,
    table_name="documents",
    query_name="match_documents",
)

# Grok
llm = ChatOpenAI(
    model="grok-beta",
    base_url="https://api.x.ai/v1",
    api_key=os.getenv("GROK_API_KEY")
)

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
    vector_store.add_texts([text])
    return {"status": "ok", "filename": file.filename}

@app.post("/chat")
async def chat(data: dict):
    message = data.get("message", "")
    if not message:
        return {"response": "Сообщение пустое"}

    docs = vector_store.similarity_search(message, k=4)
    context = "\n".join([d.page_content for d in docs])
    
    prompt = f"Context: {context}\n\nQuestion: {message}\nAnswer in Russian, be helpful and concise:"
    response = llm.invoke([HumanMessage(content=prompt)])
    
    return {"response": response.content}
