from fastapi import APIRouter, HTTPException
from database import supabase
from models import PartnerBenefit, PartnerApplication
from typing import List

router = APIRouter(prefix="/api/partners", tags=["Partners"])

@router.get("/", response_model=List[PartnerBenefit])
def get_benefits():
    response = supabase.table("partner_benefits").select("*").execute()
    return response.data

@router.post("/apply")
def submit_application(application: PartnerApplication):
    try:
        response = supabase.table("partner_applications").insert(application.model_dump()).execute()
        return {"status": "success", "data": response.data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
