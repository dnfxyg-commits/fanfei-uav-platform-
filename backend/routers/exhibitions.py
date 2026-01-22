from fastapi import APIRouter, HTTPException
from database import supabase
from models import ExhibitionApplication, Exhibition
from typing import List

router = APIRouter(prefix="/api/exhibitions", tags=["Exhibitions"])

@router.get("/", response_model=List[Exhibition])
def get_exhibitions():
    try:
        response = supabase.table("exhibitions").select("*").order("start_date", desc=True).execute()
        return response.data
    except Exception as e:
        print(f"Error fetching exhibitions: {e}")
        return []

@router.get("/{exhibition_id}", response_model=Exhibition)
def get_exhibition(exhibition_id: str):
    try:
        response = supabase.table("exhibitions").select("*").eq("id", exhibition_id).single().execute()
        return response.data
    except Exception as e:
        print(f"Error fetching exhibition {exhibition_id}: {e}")
        raise HTTPException(status_code=404, detail="Exhibition not found")

@router.post("/")
def create_exhibition(exhibition: Exhibition):
    try:
        # Exclude 'id' and 'created_at' as they are handled by DB
        data = exhibition.model_dump(exclude={"id", "created_at"})
        response = supabase.table("exhibitions").insert(data).execute()
        return {"status": "success", "data": response.data}
    except Exception as e:
        print(f"Error creating exhibition: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/{exhibition_id}")
def update_exhibition(exhibition_id: str, exhibition: Exhibition):
    try:
        data = exhibition.model_dump(exclude={"id", "created_at"})
        response = supabase.table("exhibitions").update(data).eq("id", exhibition_id).execute()
        return {"status": "success", "data": response.data}
    except Exception as e:
        print(f"Error updating exhibition: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{exhibition_id}")
def delete_exhibition(exhibition_id: str):
    try:
        response = supabase.table("exhibitions").delete().eq("id", exhibition_id).execute()
        return {"status": "success", "data": response.data}
    except Exception as e:
        print(f"Error deleting exhibition: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/apply")
def submit_application(application: ExhibitionApplication):
    try:
        # Exclude 'id' and 'created_at' as they are handled by DB (or should be)
        # But for 'created_at', sometimes we might want to pass it or let DB handle default now()
        # 'id' is definitely DB generated.
        data = application.model_dump(exclude={"id", "created_at"})
        response = supabase.table("exhibition_applications").insert(data).execute()
        return {"status": "success", "data": response.data}
    except Exception as e:
        print(f"Error submitting exhibition application: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/applications", response_model=List[ExhibitionApplication])
def get_applications():
    try:
        response = supabase.table("exhibition_applications").select("*").order("created_at", desc=True).execute()
        return response.data
    except Exception as e:
        print(f"Error fetching exhibition applications: {e}")
        # Return empty list if table doesn't exist or other error, to avoid crashing frontend
        return []
