from fastapi import APIRouter, HTTPException
from database import supabase
from models import ExhibitionApplication
from typing import List

router = APIRouter(prefix="/api/exhibitions", tags=["Exhibitions"])

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
