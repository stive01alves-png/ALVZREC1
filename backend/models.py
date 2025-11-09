from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
import uuid

# Portfolio Project Model
class Project(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    videoUrl: str
    category: str
    artist: str
    order: int = 0
    isActive: bool = True
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

class ProjectCreate(BaseModel):
    title: str
    description: str
    videoUrl: str
    category: str
    artist: str
    order: int = 0

# Testimonial Model
class Testimonial(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    role: str
    text: str
    rating: int = Field(ge=1, le=5)
    isActive: bool = True
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

class TestimonialCreate(BaseModel):
    name: str
    role: str
    text: str
    rating: int = Field(ge=1, le=5)

# Equipment Model
class Equipment(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    category: str
    items: List[str]
    order: int = 0
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

class EquipmentCreate(BaseModel):
    category: str
    items: List[str]
    order: int = 0

# Contact Message Model
class ContactMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    contact: str
    projectType: str
    budget: str
    message: str
    status: str = "new"
    createdAt: datetime = Field(default_factory=datetime.utcnow)

class ContactMessageCreate(BaseModel):
    name: str
    contact: str
    projectType: str
    budget: str
    message: str

# Settings Model
class Setting(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    key: str
    value: dict
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

class SettingCreate(BaseModel):
    key: str
    value: dict