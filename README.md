# RAG AI Assistant

**Production-ready Full-Stack RAG AI**  
Next.js 15 + FastAPI + Supabase pgvector + Grok / Claude 3.5 Sonnet / GPT-4o

![Next.js 15](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![FastAPI](https://img.shields.io/badge/FastAPI-0.115-green?style=flat-square&logo=fastapi)
![Supabase](https://img.shields.io/badge/Supabase-pgvector-blue?style=flat-square&logo=supabase)
![LangChain](https://img.shields.io/badge/LangChain-0.3-orange?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square)

**Live Demo**: [🚀 Открыть демо](https://rag-ai-assistant-abcdef.vercel.app) ← **замени на свою Vercel ссылку**

---

## ✨ Возможности

- Загрузка документов **PDF / DOCX / TXT**
- Автоматический **RAG** (поиск по загруженным файлам)
- **Streaming-ответы** в реальном времени
- Поддержка трёх топовых моделей:
  - **Grok** (xAI) 🚀
  - **Claude 3.5 Sonnet** 🌲
  - **GPT-4o** 🔥
- Красивый современный интерфейс (тёмная тема)
- Память чата + показ источников

---

## 🛠 Tech Stack

| Слой       | Технологии                              |
|------------|-----------------------------------------|
| **Frontend** | Next.js 15 (App Router), TypeScript, Tailwind CSS |
| **Backend**  | FastAPI, LangChain, LangSmith          |
| **Vector DB** | Supabase (PostgreSQL + pgvector)      |
| **LLM**      | Grok API, Anthropic, OpenAI            |
| **Деплой**   | Vercel (frontend) + Railway/Supabase (backend) |

---

## 🚀 Как запустить локально (2 минуты)

```bash
# 1. Backend
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000

# 2. Frontend (в новом терминале)
cd ../frontend
npm install
npm run dev
