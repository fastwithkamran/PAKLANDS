# PakLands - MERN Real-Estate Project

## About

**PakLands** is a full-stack real estate listing platform built for Pakistanis to buy, sell, and explore properties online. Users can create an account, upload property listings with images, filter properties by province/city/area, and manage their profile.

---

## Live Demo

| Service | URL |
|---------|-----|
| Frontend (Vercel) | [paklands-realestate-project.vercel.app](https://paklands-realestate-project.vercel.app) |
| Backend API (Vercel) 

---

## Structure

```
PAKLANDS/
├── backend/                  # Node.js + Express
│   ├── controllers/          # Route handler logic
│   ├── middlewares/          # JWT auth middleware
│   ├── models/               # Mongoose schemas (User, Property, Location)
│   ├── routers/              # Express route definitions
│   ├── services/             # JWT helpers, Cloudinary config, DB seeder
│   ├── index.js              # App entry point
│   ├── package.json
│   └── vercel.json           # Vercel serverless config
│
├── frontend/                 # React + Vite
│   ├── api/                  # Vercel serverless proxy (hides backend URL)
│   ├── public/               # assests
│   ├── src/
│   │   ├── components/       # Navbar, Footer, Property cards, Auth UI
│   │   ├── pages/            # All route pages
│   │   ├── redux/            # Redux Toolkit slices & store
│   │   ├── App.jsx           # Route definitions
│   │   └── main.jsx          # React entry point
│   ├── package.json
│   ├── vite.config.js
│   └── vercel.json
│
└── README.md
```

---

## Features

### Authentication

- Email/password signup & login
- Google Sign-In via Firebase Auth
- JWT stored in HTTP-only cookies

### Properties

- Create listings with multiple image uploads
- Browse all properties on the homepage
- View full property detail page
- View and manage your own listings

### User Profile

- Update name, phone number & avatar
- Change password
- Delete account

### UI / UX

- Image carousel with **Swiper.js**
- Toast notifications via **React Hot Toast**
- Form validation via **React Hook Form**
- Persistent auth state via **Redux Persist**

---
