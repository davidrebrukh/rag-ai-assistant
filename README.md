# RAG AI Assistant

**Production Full-Stack RAG AI**  
Next.js 15 + FastAPI + Supabase pgvector + Grok / Claude 3.5 / GPT-4o

![Next.js 15](https://img.shields.io/badge/Next.js-15-black?style=flat-square) 
![FastAPI](https://img.shields.io/badge/FastAPI-0.115-green?style=flat-square) 
![Supabase](https://img.shields.io/badge/Supabase-pgvector-blue?style=flat-square) 
![LangChain](https://img.shields.io/badge/LangChain-0.3-orange?style=flat-square) 
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square)

## ✨ Features
- Загрузка PDF / DOCX / TXT
- Автоматический RAG (поиск по документам)
- Streaming-ответы в реальном времени
- Поддержка 3 моделей: **Grok**, **Claude 3.5 Sonnet**, **GPT-4o**
- Красивый современный UI (shadcn-style + Tailwind)
- Chat memory и sources

## Tech Stack
- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind
- **Backend**: FastAPI, LangChain, Supabase
- **Vector DB**: pgvector
- **LLMs**: Grok API, Anthropic, OpenAI

## Live Demo
Скоро на Vercel (я помогу задеплоить в следующем сообщении)

## Как запустить локально (2 минуты)
1. Нажми **Code** → **Download ZIP** → распакуй
2. Установи Python + Node.js (если нет — пиши, дам ссылки)
3. В папке `backend`: `pip install -r requirements.txt` → `uvicorn main:app --reload`
4. В папке `frontend`: `npm install` → `npm run dev`

Автор: **David Rebrukh** — Full Stack AI Developer  
[LinkedIn](https://www.linkedin.com/in/david-rebrukh/) | [Другие проекты](#)

⭐ Star, если понравилось!
