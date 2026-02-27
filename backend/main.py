from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Grok AI Assistant - Live Demo")

# Максимальный CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
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
    return {"status": "ok", "llm": "Grok", "mode": "Live Demo"}

@app.post("/chat")
async def chat(data: dict):
    message = data.get("message", "")
    prompt = f"Ты Grok. Отвечай на русском, полезно и с юмором: {message}"
    response = llm.invoke([HumanMessage(content=prompt)])
    return {"response": response.content}

print("Backend запущен успешно!")
