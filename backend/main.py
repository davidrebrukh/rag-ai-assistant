from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Grok AI Assistant - Demo Mode")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

llm = ChatOpenAI(
    model="grok-beta",
    base_url="https://api.x.ai/v1",
    api_key=os.getenv("GROK_API_KEY")
)

@app.get("/health")
async def health():
    return {"status": "ok", "mode": "Demo Grok", "llm": "живой"}

@app.post("/upload")
async def upload(file: UploadFile = File(...)):
    return {"status": "ok", "filename": file.filename, "note": "Demo Mode — документ не сохраняется"}

@app.post("/chat")
async def chat(data: dict):
    message = data.get("message", "Привет")
    prompt = f"Ты Grok — полезный и остроумный AI. Отвечай на русском, коротко и по делу: {message}"
    response = llm.invoke([HumanMessage(content=prompt)])
    return {"response": response.content + "\n\n(Demo Mode — Grok отвечает сам)"} 
