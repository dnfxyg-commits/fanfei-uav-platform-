from fastapi import APIRouter, HTTPException
from database import supabase
from models import Product
from typing import List

router = APIRouter(prefix="/api/products", tags=["Products"])

@router.get("/", response_model=List[Product])
def get_products():
    try:
        # Sort by sort_order ascending, then by id descending (newest first if sort_order same)
        response = supabase.table("products").select("*").order("sort_order", desc=False).order("id", desc=True).execute()
        if getattr(response, "error", None):
            raise HTTPException(status_code=500, detail=str(response.error))
        return response.data
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/reorder")
def reorder_products(items: List[dict]):
    # items should be a list of {"id": "...", "sort_order": 1}
    try:
        # Since Supabase Python client doesn't support bulk upsert easily for partial updates without checking primary keys,
        # we will loop update. For a small number of products (e.g. < 100), this is acceptable.
        # Ideally, we would use an RPC call if performance is critical.
        for item in items:
            supabase.table("products").update({"sort_order": item["sort_order"]}).eq("id", item["id"]).execute()
        return {"message": "success"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/", response_model=List[Product])
def create_product(product: Product):
    try:
        response = supabase.table("products").insert(product.model_dump()).execute()
        if getattr(response, "error", None):
            raise HTTPException(status_code=500, detail=str(response.error))
        return response.data
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/{product_id}", response_model=List[Product])
def update_product(product_id: str, product: Product):
    try:
        response = supabase.table("products").update(product.model_dump()).eq("id", product_id).execute()
        if getattr(response, "error", None):
            raise HTTPException(status_code=500, detail=str(response.error))
        return response.data
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{product_id}")
def delete_product(product_id: str):
    try:
        response = supabase.table("products").delete().eq("id", product_id).execute()
        if getattr(response, "error", None):
            raise HTTPException(status_code=500, detail=str(response.error))
        return {"message": "Product deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
