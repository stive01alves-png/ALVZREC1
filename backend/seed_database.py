import asyncio
import sys
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from pathlib import Path
from models import Project, Testimonial, Equipment, Setting
from seed_data import projects_seed, testimonials_seed, equipment_seed, settings_seed

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

async def seed_database():
    """Seed the database with initial data"""
    
    # Connect to MongoDB
    mongo_url = os.environ['MONGO_URL']
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ['DB_NAME']]
    
    print("🌱 Starting database seeding...")
    
    try:
        # Clear existing data
        print("\n🗑️  Clearing existing data...")
        await db.projects.delete_many({})
        await db.testimonials.delete_many({})
        await db.equipment.delete_many({})
        await db.settings.delete_many({})
        print("✓ Existing data cleared")
        
        # Seed Projects
        print("\n📽️  Seeding projects...")
        projects = [Project(**project).dict() for project in projects_seed]
        result = await db.projects.insert_many(projects)
        print(f"✓ Inserted {len(result.inserted_ids)} projects")
        
        # Seed Testimonials
        print("\n💬 Seeding testimonials...")
        testimonials = [Testimonial(**testimonial).dict() for testimonial in testimonials_seed]
        result = await db.testimonials.insert_many(testimonials)
        print(f"✓ Inserted {len(result.inserted_ids)} testimonials")
        
        # Seed Equipment
        print("\n🎥 Seeding equipment...")
        equipment_items = [Equipment(**item).dict() for item in equipment_seed]
        result = await db.equipment.insert_many(equipment_items)
        print(f"✓ Inserted {len(result.inserted_ids)} equipment items")
        
        # Seed Settings
        print("\n⚙️  Seeding settings...")
        setting = Setting(**settings_seed).dict()
        await db.settings.insert_one(setting)
        print("✓ Inserted settings")
        
        print("\n✅ Database seeding completed successfully!")
        
    except Exception as e:
        print(f"\n❌ Error seeding database: {str(e)}")
        sys.exit(1)
    finally:
        client.close()

if __name__ == "__main__":
    asyncio.run(seed_database())