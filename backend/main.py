from fastapi import FastAPI, UploadFile, File, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from langchain_community.vectorstores import SupabaseVectorStore
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_core.messages import HumanMessage
import os
from dotenv import load_dotenv
from supabase import create_client
import tempfile
from pypdf import PdfReader

load_dotenv()

app = FastAPI(title="RAG AI Assistant")

# === МАКСИМАЛЬНЫЙ CORS ===
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Глобальная обработка ошибок (чтобы CORS работал даже при 500)
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    print(f"ОШИБКА 500: {exc}")  # видно в логах Railway
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error"},
        headers={"Access-Control-Allow-Origin": "*"}
    )

@app.get("/health")
async def health():
    return {"status": "ok", "llm": "Grok", "backend": "живой"}

# Supabase
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
    try:
        message = data.get("message", "")
        if not message:
            return {"response": "Сообщение пустое"}

        docs = vector_store.similarity_search(message, k=4)
        context = "\n".join([d.page_content for d in docs])

        prompt = f"Context: {context}\n\nQuestion: {message}\nAnswer in Russian, be helpful and concise:"
        response = llm.invoke([HumanMessage(content=prompt)])

        return {"response": response.content}
    except Exception as e:
        print(f"Ошибка в /chat: {e}")
        return {"response": f"Ошибка на сервере: {str(e)}"}
