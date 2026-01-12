from fastapi import APIRouter, HTTPException
from database import supabase
from models import PartnerBenefit
from typing import List

router = APIRouter(prefix="/api/partners", tags=["Partners"])

@router.get("/", response_model=List[PartnerBenefit])
def get_benefits():
    response = supabase.table("partner_benefits").select("*").execute()
    return response.data
