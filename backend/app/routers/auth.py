"""
Authentication routes - GitHub OAuth and JWT
"""
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.config import settings
from app.core.security import create_access_token
from app.models.user import User
from datetime import datetime
import httpx

router = APIRouter()


@router.get("/github")
async def github_login():
    """Redirect to GitHub OAuth"""
    github_auth_url = (
        f"https://github.com/login/oauth/authorize"
        f"?client_id={settings.GITHUB_CLIENT_ID}"
        f"&redirect_uri={settings.GITHUB_REDIRECT_URI}"
        f"&scope=read:user,user:email,repo"
    )
    return RedirectResponse(github_auth_url)


@router.get("/github/callback")
async def github_callback(code: str, db: Session = Depends(get_db)):
    """Handle GitHub OAuth callback"""
    
    # Exchange code for access token
    async with httpx.AsyncClient() as client:
        token_response = await client.post(
            "https://github.com/login/oauth/access_token",
            json={
                "client_id": settings.GITHUB_CLIENT_ID,
                "client_secret": settings.GITHUB_CLIENT_SECRET,
                "code": code,
                "redirect_uri": settings.GITHUB_REDIRECT_URI,
            },
            headers={"Accept": "application/json"},
        )
    
    token_data = token_response.json()
    access_token = token_data.get("access_token")
    
    if not access_token:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Failed to get access token from GitHub"
        )
    
    # Get user info from GitHub
    async with httpx.AsyncClient() as client:
        user_response = await client.get(
            "https://api.github.com/user",
            headers={"Authorization": f"Bearer {access_token}"},
        )
    
    github_user = user_response.json()
    
    # Check if user exists
    user = db.query(User).filter(User.github_id == github_user["id"]).first()
    
    if not user:
        # Create new user
        user = User(
            github_id=github_user["id"],
            username=github_user["login"],
            email=github_user.get("email"),
            avatar_url=github_user.get("avatar_url"),
            last_login=datetime.utcnow(),
        )
        db.add(user)
        db.commit()
        db.refresh(user)
    else:
        # Update last login
        user.last_login = datetime.utcnow()
        db.commit()
    
    # Create JWT token
    jwt_token = create_access_token(data={"sub": str(user.id), "username": user.username})
    
    # Redirect to frontend with token
    redirect_url = f"{settings.FRONTEND_URL}/dashboard?token={jwt_token}"
    return RedirectResponse(redirect_url)


@router.get("/me")
async def get_current_user(db: Session = Depends(get_db)):
    """Get current user info"""
    # TODO: Implement JWT token validation and user retrieval
    return {"message": "Not implemented yet"}
