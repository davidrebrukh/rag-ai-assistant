# RAG AI Assistant

**Production-ready Full-Stack RAG AI**  
Next.js 15 + FastAPI + Supabase pgvector + Grok / Claude 3.5 Sonnet / GPT-4o

![Next.js 15](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![FastAPI](https://img.shields.io/badge/FastAPI-0.115-green?style=flat-square&logo=fastapi)
![Supabase](https://img.shields.io/badge/Supabase-pgvector-blue?style=flat-square&logo=supabase)
![LangChain](https://img.shields.io/badge/LangChain-0.3-orange?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square)

**🚀 Live Demo**: [Открыть демо](https://rag-ai-assistant-smoky.vercel.app)

---

## ✨ Возможности
- Загрузка **PDF / DOCX / TXT**
- Полноценный **RAG** (поиск по твоим документам)
- **Streaming-ответы** в реальном времени
- 3 модели: **Grok** 🚀 • **Claude 3.5** 🌲 • **GPT-4o** 🔥
- Красивый тёмный интерфейс + память чата
- Показ источников

---

## 🛠 Tech Stack

| Слой         | Технологии                                      |
|--------------|-------------------------------------------------|
| **Frontend** | Next.js 15 (App Router), TypeScript, Tailwind   |
| **Backend**  | FastAPI, LangChain                              |
| **Vector DB**| Supabase (PostgreSQL + pgvector)                |
| **LLM**      | Grok API, Anthropic, OpenAI                     |

---

## 🚀 Как запустить локально

```bash
# Backend
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000

# Frontend (новый терминал)
cd ../frontend
npm install
npm run dev
