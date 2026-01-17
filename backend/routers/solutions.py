from fastapi import APIRouter, HTTPException
from database import supabase
from models import Solution
from typing import List

router = APIRouter(prefix="/api/solutions", tags=["Solutions"])

@router.get("/", response_model=List[Solution])
def get_solutions():
    try:
        response = supabase.table("solutions").select("*").execute()
        if getattr(response, "error", None):
            raise HTTPException(status_code=500, detail=str(response.error))
        return response.data
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/", response_model=List[Solution])
def create_solution(solution: Solution):
    try:
        response = supabase.table("solutions").insert(solution.model_dump()).execute()
        if getattr(response, "error", None):
            raise HTTPException(status_code=500, detail=str(response.error))
        return response.data
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/{solution_id}", response_model=List[Solution])
def update_solution(solution_id: str, solution: Solution):
    try:
        response = supabase.table("solutions").update(solution.model_dump()).eq("id", solution_id).execute()
        if getattr(response, "error", None):
            raise HTTPException(status_code=500, detail=str(response.error))
        return response.data
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{solution_id}")
def delete_solution(solution_id: str):
    try:
        response = supabase.table("solutions").delete().eq("id", solution_id).execute()
        if getattr(response, "error", None):
            raise HTTPException(status_code=500, detail=str(response.error))
        return {"message": "Solution deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
