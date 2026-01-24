from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import solutions, products, partners, news, auth, exhibitions, associations

app = FastAPI(
    title="Fanfei UAV Platform API",
    description="Backend API for Fanfei Low-Altitude Economy Platform",
    version="1.0.0"
)

# CORS Configuration
origins = [
    "http://localhost:5173",  # Vite default
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:3002",
    "https://bianaero.top",
    "https://www.bianaero.top",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(solutions.router)
app.include_router(products.router)
app.include_router(partners.router)
app.include_router(news.router)
app.include_router(auth.router)
app.include_router(exhibitions.router)
app.include_router(associations.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to Fanfei UAV API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
