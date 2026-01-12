from fastapi import APIRouter, HTTPException
from database import supabase
from models import NewsItem
from typing import List

router = APIRouter(prefix="/api/news", tags=["News"])

@router.get("/", response_model=List[NewsItem])
def get_news():
    response = supabase.table("news_items").select("*").execute()
    return response.data
