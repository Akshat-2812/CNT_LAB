Updated Frontend (Tailwind + React)

This frontend uses Tailwind via CDN for quick styling and a modern university/portal blue theme.

How to use:
1. Make sure backend is running at http://localhost:8080
2. In this folder run:
   npm install
   npm start

Notes:
- Tailwind is included using CDN (https://cdn.tailwindcss.com) in public/index.html so there's no build-time Tailwind setup required.
- The API endpoints remain:
  POST /api/students
  GET  /api/students/{roll}

