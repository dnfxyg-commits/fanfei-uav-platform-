from fastapi import APIRouter, HTTPException
from database import supabase
from models import Solution
from typing import List

router = APIRouter(prefix="/api/solutions", tags=["Solutions"])

@router.get("/", response_model=List[Solution])
def get_solutions():
    response = supabase.table("solutions").select("*").execute()
    return response.data

@router.post("/", response_model=List[Solution])
def create_solution(solution: Solution):
    response = supabase.table("solutions").insert(solution.model_dump()).execute()
    return response.data

@router.put("/{solution_id}", response_model=List[Solution])
def update_solution(solution_id: str, solution: Solution):
    response = supabase.table("solutions").update(solution.model_dump()).eq("id", solution_id).execute()
    return response.data

@router.delete("/{solution_id}")
def delete_solution(solution_id: str):
    response = supabase.table("solutions").delete().eq("id", solution_id).execute()
    return {"message": "Solution deleted successfully"}
