from fastapi import APIRouter, HTTPException
from database import supabase
from models import Product
from typing import List

router = APIRouter(prefix="/api/products", tags=["Products"])

@router.get("/", response_model=List[Product])
def get_products():
    response = supabase.table("products").select("*").execute()
    return response.data

@router.post("/", response_model=List[Product])
def create_product(product: Product):
    response = supabase.table("products").insert(product.model_dump()).execute()
    return response.data

@router.put("/{product_id}", response_model=List[Product])
def update_product(product_id: str, product: Product):
    response = supabase.table("products").update(product.model_dump()).eq("id", product_id).execute()
    return response.data

@router.delete("/{product_id}")
def delete_product(product_id: str):
    response = supabase.table("products").delete().eq("id", product_id).execute()
    return {"message": "Product deleted successfully"}
