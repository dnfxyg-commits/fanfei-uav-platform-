from fastapi import APIRouter, HTTPException
from database import supabase
from models import Association
from typing import List

router = APIRouter(prefix="/api/associations", tags=["Associations"])

@router.get("/", response_model=List[Association])
def get_associations():
    try:
        response = supabase.table("associations").select("*").order("created_at", desc=True).execute()
        return response.data
    except Exception as e:
        print(f"Error fetching associations: {e}")
        return []

@router.get("/{association_id}", response_model=Association)
def get_association(association_id: str):
    try:
        response = supabase.table("associations").select("*").eq("id", association_id).single().execute()
        return response.data
    except Exception as e:
        print(f"Error fetching association {association_id}: {e}")
        raise HTTPException(status_code=404, detail="Association not found")

@router.post("/")
def create_association(association: Association):
    try:
        data = association.model_dump(exclude={"id", "created_at"})
        response = supabase.table("associations").insert(data).execute()
        return {"status": "success", "data": response.data}
    except Exception as e:
        print(f"Error creating association: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/{association_id}")
def update_association(association_id: str, association: Association):
    try:
        data = association.model_dump(exclude={"id", "created_at"})
        response = supabase.table("associations").update(data).eq("id", association_id).execute()
        return {"status": "success", "data": response.data}
    except Exception as e:
        print(f"Error updating association: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{association_id}")
def delete_association(association_id: str):
    try:
        response = supabase.table("associations").delete().eq("id", association_id).execute()
        return {"status": "success", "data": response.data}
    except Exception as e:
        print(f"Error deleting association: {e}")
        raise HTTPException(status_code=500, detail=str(e))
