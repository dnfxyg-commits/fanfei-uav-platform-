from fastapi import APIRouter, HTTPException
from database import supabase
from models import NewsItem
from typing import List

router = APIRouter(prefix="/api/news", tags=["News"])

@router.get("/", response_model=List[NewsItem])
def get_news():
    try:
        response = supabase.table("news_items").select("*").execute()
        if getattr(response, "error", None):
            raise HTTPException(status_code=500, detail=str(response.error))
        return response.data
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/", response_model=List[NewsItem])
def create_news(news: NewsItem):
    try:
        response = supabase.table("news_items").insert(news.model_dump()).execute()
        if getattr(response, "error", None):
            raise HTTPException(status_code=500, detail=str(response.error))
        return response.data
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/{news_id}", response_model=List[NewsItem])
def update_news(news_id: str, news: NewsItem):
    try:
        response = supabase.table("news_items").update(news.model_dump()).eq("id", news_id).execute()
        if getattr(response, "error", None):
            raise HTTPException(status_code=500, detail=str(response.error))
        return response.data
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{news_id}")
def delete_news(news_id: str):
    try:
        response = supabase.table("news_items").delete().eq("id", news_id).execute()
        if getattr(response, "error", None):
            raise HTTPException(status_code=500, detail=str(response.error))
        return {"message": "News item deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
