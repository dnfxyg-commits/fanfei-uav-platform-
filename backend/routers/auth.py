from fastapi import APIRouter, HTTPException, Depends, status
from database import supabase
from models import LoginRequest, Token, AdminUserCreate
from auth_utils import verify_password, create_access_token, get_password_hash, ACCESS_TOKEN_EXPIRE_MINUTES, get_current_super_admin
from datetime import timedelta

router = APIRouter(prefix="/api/auth", tags=["Auth"])

@router.post("/login", response_model=Token)
def login(request: LoginRequest):
    try:
        # Query database for user
        response = supabase.table("admin_users").select("*").eq("username", request.username).execute()
        
        if not response.data or len(response.data) == 0:
            raise HTTPException(status_code=400, detail="用户名或密码错误")
        
        user = response.data[0]
        
        if not verify_password(request.password, user["password_hash"]):
            raise HTTPException(status_code=400, detail="用户名或密码错误")
        
        # Create Access Token
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={"sub": user["username"], "role": user["role"]},
            expires_delta=access_token_expires
        )
        
        return {
            "access_token": access_token, 
            "token_type": "bearer",
            "username": user["username"],
            "role": user["role"]
        }
    except HTTPException:
        raise
    except Exception as e:
        print(f"Login Error: {str(e)}")
        # Return detailed error for debugging (remove in production later)
        raise HTTPException(status_code=500, detail=f"Internal Error: {str(e)}")

@router.post("/register", status_code=201)
def register(user: AdminUserCreate):
    # Check if any users exist
    all_users = supabase.table("admin_users").select("id", count="exact").execute()
    count = all_users.count if all_users.count is not None else len(all_users.data)
    
    # If users exist, this endpoint should strictly be protected.
    # But since we can't easily conditionally apply Depends in the decorator based on runtime state,
    # we'll implement a logic check:
    # If count > 0, we require a valid token passed in header (manual check or simple logic).
    # Actually, standard way: keep this endpoint for initial setup ONLY if count == 0.
    # Otherwise, use a separate protected endpoint.
    
    if count > 0:
        # For simplicity in this context, we will BLOCK public registration if users exist.
        # User management should be done via a separate protected endpoint or we need to validate token here.
        # Since I can't easily access the request object to get header here without Depends,
        # I will just throw error saying "Please use Admin Dashboard to create users".
        raise HTTPException(status_code=403, detail="系统已初始化，请登录后台添加用户")

    # Check if user exists (redundant if count is 0 but good for safety)
    response = supabase.table("admin_users").select("*").eq("username", user.username).execute()
    if response.data and len(response.data) > 0:
        raise HTTPException(status_code=400, detail="用户名已存在")
        
    # Hash password
    hashed_password = get_password_hash(user.password)
    
    # Insert user
    try:
        data = {
            "username": user.username,
            "password_hash": hashed_password,
            "role": user.role
        }
        supabase.table("admin_users").insert(data).execute()
        return {"message": "初始管理员创建成功"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/users", status_code=201)
def create_user(user: AdminUserCreate, current_user: dict = Depends(get_current_super_admin)):
    # Check if user exists
    response = supabase.table("admin_users").select("*").eq("username", user.username).execute()
    if response.data and len(response.data) > 0:
        raise HTTPException(status_code=400, detail="用户名已存在")
        
    # Hash password
    hashed_password = get_password_hash(user.password)
    
    # Insert user
    try:
        data = {
            "username": user.username,
            "password_hash": hashed_password,
            "role": user.role
        }
        supabase.table("admin_users").insert(data).execute()
        return {"message": "用户创建成功"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/users")
def get_users(current_user: dict = Depends(get_current_super_admin)):
    response = supabase.table("admin_users").select("id, username, role, created_at").order("created_at", desc=True).execute()
    return response.data

