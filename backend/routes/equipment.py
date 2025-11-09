from fastapi import APIRouter, HTTPException
from typing import List
from models import Equipment

router = APIRouter(prefix="/api/equipment", tags=["equipment"])

# Database will be injected from main server
db = None

def set_db(database):
    global db
    db = database

@router.get("", response_model=dict)
async def get_equipment():
    """Get all equipment"""
    try:
        equipment = await db.equipment.find().sort("order", 1).to_list(100)
        return {"equipment": [Equipment(**item) for item in equipment]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching equipment: {str(e)}")