from fastapi import APIRouter, HTTPException
from typing import List
from models import Testimonial, TestimonialCreate

router = APIRouter(prefix="/api/testimonials", tags=["testimonials"])

# Database will be injected from main server
db = None

def set_db(database):
    global db
    db = database

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