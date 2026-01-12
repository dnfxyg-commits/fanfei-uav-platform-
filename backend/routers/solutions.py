from fastapi import APIRouter, HTTPException
from database import supabase
from models import Solution
from typing import List

router = APIRouter(prefix="/api/solutions", tags=["Solutions"])

@router.get("/", response_model=List[Solution])
def get_solutions():
    response = supabase.table("solutions").select("*").execute()
    return response.data

@router.post("/", response_model=List[Solution]) # Supabase returns list on insert
def create_solution(solution: Solution):
    response = supabase.table("solutions").insert(solution.model_dump()).execute()
    return response.data
