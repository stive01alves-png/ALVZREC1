from fastapi import APIRouter, HTTPException
from typing import List
from models import Project, ProjectCreate

router = APIRouter(prefix="/api/projects", tags=["projects"])

# Database will be injected from main server
db = None

def set_db(database):
    global db
    db = database

@router.get("", response_model=dict)
async def get_projects():
    """Get all active projects"""
    try:
        projects = await db.projects.find({"isActive": True}).sort("order", 1).to_list(100)
        return {"projects": [Project(**project) for project in projects]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching projects: {str(e)}")

@router.get("/{project_id}", response_model=dict)
async def get_project(project_id: str):
    """Get single project by ID"""
    try:
        project = await db.projects.find_one({"id": project_id})
        if not project:
            raise HTTPException(status_code=404, detail="Project not found")
        return {"project": Project(**project)}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching project: {str(e)}")

@router.post("", response_model=dict)
async def create_project(project_data: ProjectCreate):
    """Create new project"""
    try:
        project = Project(**project_data.dict())
        await db.projects.insert_one(project.dict())
        return {"project": project}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating project: {str(e)}")