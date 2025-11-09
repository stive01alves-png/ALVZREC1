from fastapi import APIRouter, HTTPException
from models import ContactMessage, ContactMessageCreate
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/contact", tags=["contact"])

# Database connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

@router.post("", response_model=dict)
async def submit_contact(message_data: ContactMessageCreate):
    """Submit contact form"""
    try:
        contact_message = ContactMessage(**message_data.dict())
        await db.contact_messages.insert_one(contact_message.dict())
        
        logger.info(f"New contact message from {message_data.name}")
        
        return {
            "success": True,
            "message": "Message enregistré avec succès. Nous vous répondrons sous 24h."
        }
    except Exception as e:
        logger.error(f"Error saving contact message: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error saving message: {str(e)}")

@router.get("", response_model=dict)
async def get_contact_messages():
    """Get all contact messages (Admin only in future)"""
    try:
        messages = await db.contact_messages.find().sort("createdAt", -1).to_list(100)
        return {"messages": [ContactMessage(**msg) for msg in messages]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching messages: {str(e)}")