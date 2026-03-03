from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.validate import router
import os

app = FastAPI()

# 🔥 Allowed Origins
origins = [
    "http://localhost:5173",  # Vite local dev
    "https://ideapulsestartupanalyzer-ocaiu5c1i-sunnys-projects-d7978883.vercel.app/",  # 🔥 Replace with YOUR actual Vercel URL
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routes
app.include_router(router)

@app.get("/")
def root():
    return {"message": "IdeaPulse API Running 🚀"}
