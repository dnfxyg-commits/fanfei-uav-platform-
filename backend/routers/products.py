from fastapi import APIRouter, HTTPException
from database import supabase
from models import Product
from typing import List

router = APIRouter(prefix="/api/products", tags=["Products"])

@router.get("/", response_model=List[Product])
def get_products():
    response = supabase.table("products").select("*").execute()
    return response.data
