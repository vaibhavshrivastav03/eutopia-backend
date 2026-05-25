# EUTOPIA ID Backend

Emergency identification & emergency response backend system built with:

- Node.js
- Express.js
- Supabase
- PostgreSQL
- JWT Authentication
- Role-Based Access
- Supabase Storage

---

# Features

## Authentication
- JWT Login/Register
- Role-based access
- Admin/Hospital/Firefighter/User roles

---

## User System
- User registration
- Medical records
- Blood group
- Allergies
- Occupancy
- Address

---

## Emergency Contacts
- Add emergency contacts
- Fetch emergency contacts

---

## Bracelet System
- Bracelet assignment
- Bracelet scanning
- Dynamic user switching

---

## Fire Emergency System
- Fire trigger
- Emergency logs
- SMS workflow
- Dashboard integration

---

## Ambulance Emergency System
- Ambulance trigger
- Blood group transfer
- Allergy transfer
- ETA simulation

---

## Voice Trigger System
- Voice emergency detection
- Confidence percentage
- Fire/Ambulance detection
- Voice approvals

---

## Hospital Flow
- Bracelet medical scan
- Medical summary
- Emergency contacts
- Passcode protected records

---

## Dashboard
- Firefighter dashboard
- Emergency overview
- Emergency status updates

---

# Tech Stack

## Backend
- Node.js
- Express.js

## Database
- PostgreSQL (Supabase)

## Storage
- Supabase Storage

## Authentication
- JWT

## Hosting
- Vercel / Render

---

# User Roles

| Role | Access |
|---|---|
| user | emergency triggers |
| admin | full system access |
| hospital | medical access |
| firefighter | fire dashboard |

---

# Installation

## Clone Repository

```bash
git clone YOUR_REPO_URL
```

---

## Install Dependencies

```bash
npm install
```

---

## Environment Variables

Create `.env`

```env
PORT=5000

SUPABASE_URL=YOUR_SUPABASE_URL

SUPABASE_ANON_KEY=YOUR_SUPABASE_KEY

JWT_SECRET=YOUR_SECRET_KEY
```

---

# Run Project

## Development

```bash
npm run dev
```

---

## Production

```bash
npm start
```

---

# API Base URL

```text
http://localhost:5000/api
```

---

# Main APIs

## Auth
- POST `/auth/register`
- POST `/auth/login`

## Fire
- POST `/fire/trigger`

## Ambulance
- POST `/ambulance/trigger`

## Voice
- POST `/voice/trigger`

## Dashboard
- GET `/dashboard/overview`

---

# Security

- JWT Authentication
- Role-Based Authorization
- Protected APIs
- Middleware Validation

---

# Architecture

Frontend:
- Next.js
- Tailwind CSS

Backend:
- Express.js
- Supabase

Database:
- PostgreSQL

Realtime:
- Socket.IO / Supabase Realtime

---

# Deployment

Recommended:
- Render
- Railway
- Vercel

---

# Project Status

Backend Progress:
- 97% Complete

Modules Completed:
- Authentication
- Emergency Workflows
- Dashboard APIs
- Hospital Flow
- Voice System
- Bracelet Logic

---

# Author

Vaibhav Shrivastav
