# ALVZ.REC - Backend Implementation Contracts

## Overview
This document outlines the API contracts, mock data structure, and backend implementation requirements for seamless frontend-backend integration.

## Current Mock Data Structure (mock.js)

### 1. Portfolio Projects
```javascript
portfolioProjects = [
  {
    id: number,
    title: string,
    description: string,
    videoUrl: string (YouTube embed),
    category: string,
    artist: string
  }
]
```

### 2. Services
```javascript
services = [
  {
    id: number,
    title: string,
    description: string,
    icon: string (lucide-react icon name)
  }
]
```

### 3. Testimonials
```javascript
testimonials = [
  {
    id: number,
    name: string,
    role: string,
    text: string,
    rating: number (1-5)
  }
]
```

### 4. Equipment
```javascript
equipment = [
  {
    category: string,
    items: string[]
  }
]
```

### 5. Social Links
```javascript
socialLinks = {
  instagram: string,
  youtube: string,
  whatsapp: string,
  whatsappLink: string
}
```

## Backend API Endpoints to Implement

### Portfolio Projects API

#### GET /api/projects
- Returns all portfolio projects
- Response: `{ projects: Project[] }`

#### GET /api/projects/:id
- Returns single project by ID
- Response: `{ project: Project }`

#### POST /api/projects (Admin only - future)
- Create new project
- Body: `{ title, description, videoUrl, category, artist }`
- Response: `{ project: Project }`

#### PUT /api/projects/:id (Admin only - future)
- Update project
- Body: `{ title?, description?, videoUrl?, category?, artist? }`
- Response: `{ project: Project }`

#### DELETE /api/projects/:id (Admin only - future)
- Delete project
- Response: `{ success: boolean }`

### Testimonials API

#### GET /api/testimonials
- Returns all testimonials
- Response: `{ testimonials: Testimonial[] }`

#### POST /api/testimonials (Admin only - future)
- Create testimonial
- Body: `{ name, role, text, rating }`
- Response: `{ testimonial: Testimonial }`

### Equipment API

#### GET /api/equipment
- Returns all equipment categories and items
- Response: `{ equipment: Equipment[] }`

#### PUT /api/equipment (Admin only - future)
- Update equipment list
- Body: `{ equipment: Equipment[] }`
- Response: `{ equipment: Equipment[] }`

### Contact Messages API

#### POST /api/contact
- Submit contact form
- Body: `{ name, contact, projectType, budget, message }`
- Response: `{ success: boolean, message: string }`
- Note: Frontend currently uses WhatsApp redirect, but this endpoint stores messages in DB

#### GET /api/contact (Admin only - future)
- Get all contact messages
- Response: `{ messages: ContactMessage[] }`

### Settings API

#### GET /api/settings
- Returns site settings (social links, etc.)
- Response: `{ settings: Settings }`

## MongoDB Collections

### 1. projects
```
{
  _id: ObjectId,
  title: String (required),
  description: String (required),
  videoUrl: String (required),
  category: String (required),
  artist: String (required),
  order: Number (for sorting),
  isActive: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

### 2. testimonials
```
{
  _id: ObjectId,
  name: String (required),
  role: String (required),
  text: String (required),
  rating: Number (1-5, required),
  isActive: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

### 3. equipment
```
{
  _id: ObjectId,
  category: String (required),
  items: [String] (required),
  order: Number (for sorting),
  updatedAt: Date
}
```

### 4. contact_messages
```
{
  _id: ObjectId,
  name: String (required),
  contact: String (required),
  projectType: String (required),
  budget: String (required),
  message: String (required),
  status: String (enum: ['new', 'read', 'replied'], default: 'new'),
  createdAt: Date
}
```

### 5. settings
```
{
  _id: ObjectId,
  key: String (unique),
  value: Mixed,
  updatedAt: Date
}
```

## Frontend Integration Steps

### 1. Create API Service Layer
- Create `/app/frontend/src/services/api.js`
- Implement fetch functions for all endpoints
- Use REACT_APP_BACKEND_URL environment variable

### 2. Update Components
- Replace mock data imports with API calls
- Add loading states
- Add error handling
- Implement data refresh mechanisms

### 3. Components to Update
- `Portfolio.jsx` - fetch projects from API
- `Testimonials.jsx` - fetch testimonials from API
- `About.jsx` - fetch equipment from API
- `Contact.jsx` - submit to backend API
- `Footer.jsx` - potentially fetch settings from API

## Implementation Priority

1. **Phase 1: Core Data (Implement First)**
   - Projects API (GET /api/projects)
   - Testimonials API (GET /api/testimonials)
   - Equipment API (GET /api/equipment)
   - Seed database with mock data

2. **Phase 2: Contact Form**
   - Contact Messages API (POST /api/contact)
   - Store contact submissions in database

3. **Phase 3: Settings**
   - Settings API (GET /api/settings)
   - Social links management

4. **Phase 4: Admin (Future Enhancement)**
   - Authentication
   - CRUD operations for all resources
   - Dashboard

## Data Seeding

Create a seed script to populate MongoDB with current mock data for initial deployment.

## Error Handling

All API endpoints should return consistent error format:
```json
{
  "success": false,
  "error": "Error message here"
}
```

## CORS Configuration

Backend already configured for CORS with wildcard origin. No changes needed.

## Testing Checklist

- [ ] All GET endpoints return correct data
- [ ] Contact form submission works
- [ ] Frontend displays backend data correctly
- [ ] Loading states work properly
- [ ] Error states handled gracefully
- [ ] Database connections stable
