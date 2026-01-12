from fastapi import APIRouter, HTTPException
from database import supabase
from models import NewsItem
from typing import List

router = APIRouter(prefix="/api/news", tags=["News"])

@router.get("/", response_model=List[NewsItem])
def get_news():
    response = supabase.table("news_items").select("*").execute()
    return response.data

@router.post("/", response_model=List[NewsItem])
def create_news(news: NewsItem):
    response = supabase.table("news_items").insert(news.model_dump()).execute()
    return response.data

@router.put("/{news_id}", response_model=List[NewsItem])
def update_news(news_id: str, news: NewsItem):
    response = supabase.table("news_items").update(news.model_dump()).eq("id", news_id).execute()
    return response.data

@router.delete("/{news_id}")
def delete_news(news_id: str):
    response = supabase.table("news_items").delete().eq("id", news_id).execute()
    return {"message": "News item deleted successfully"}
