from fastapi import APIRouter, HTTPException
from typing import List
from models import Testimonial, TestimonialCreate
from motor.motor_asyncio import AsyncIOMotorClient
import os

router = APIRouter(prefix="/api/testimonials", tags=["testimonials"])

# Database connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

@router.get("", response_model=dict)
async def get_testimonials():
    """Get all active testimonials"""
    try:
        testimonials = await db.testimonials.find({"isActive": True}).to_list(100)
        return {"testimonials": [Testimonial(**testimonial) for testimonial in testimonials]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching testimonials: {str(e)}")

@router.post("", response_model=dict)
async def create_testimonial(testimonial_data: TestimonialCreate):
    """Create new testimonial"""
    try:
        testimonial = Testimonial(**testimonial_data.dict())
        await db.testimonials.insert_one(testimonial.dict())
        return {"testimonial": testimonial}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating testimonial: {str(e)}")