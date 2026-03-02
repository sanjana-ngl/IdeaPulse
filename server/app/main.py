from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.validate import router

app = FastAPI()

# CORS Middleware (IMPORTANT)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routes
app.include_router(router)

@app.get("/")
def root():
    return {"message": "IdeaPulse API Running 🚀"}