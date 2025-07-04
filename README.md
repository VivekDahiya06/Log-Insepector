# 🚀 Log Inspector

A full-stack log management application built with React (frontend) and Express (backend). Easily view, filter, and add logs with a modern, responsive UI.

---

## ✨ Features
- 📋 **Log Viewing:** See all logs in a card-based, responsive UI.
- 🔍 **Filtering:** Powerful, multi-field filter bar (message, level, resourceId, date range, etc.)
- ➕ **Add Logs:** User-friendly form to add new logs.
- 📄 **Pagination:** Browse logs page by page.
- 📱 **Mobile Friendly:** Fully responsive design.
- 🛠️ **API:** Simple REST API for log management.

---

## 📁 Folder Structure & Purpose

### Backend (`backend/`)

```
backend/
├── src/
│   ├── app/
│   │   ├── index.js      # Main Express server entry point
│   │   ├── router/
│   │   │   └── route.js  # API route definitions
│   │   │   └── controller/
│   │   │       └── logController.js # Route logic/controllers
│   │   └── Schema/
│   │       └── logSchema.js # Zod schema for log validation
│   └── ...
├── package.json          # Backend dependencies & scripts
├── .env                  # Environment variables (not committed)
└── ...
```
- **src/app/index.js**: Starts the Express server and sets up middleware/routes.
- **src/app/router/route.js**: Defines API endpoints (e.g., `/logs`).
- **src/app/router/controller/logController.js**: Handles the logic for each API endpoint.
- **src/app/Schema/logSchema.js**: Zod schema for validating log data.
- **package.json**: Backend dependencies and scripts.
- **.env**: Environment variables (e.g., PORT).

### Frontend (`frontend/`)

```
frontend/
├── src/
│   ├── components/
│   │   ├── card/         # Log card UI components
│   │   ├── form/         # Forms (e.g., Add Log)
│   │   ├── header/       # App header
│   │   ├── footer/       # App footer
│   │   └── ...
│   ├── hooks/
│   │   └── useStore.ts   # Custom React hooks (e.g., global state)
│   ├── api/
│   │   └── logsAPI.ts    # API calls to backend
│   ├── types/
│   │   └── log.types.ts  # TypeScript types for logs
│   ├── App.tsx           # Main app component (UI, routing, filter logic)
│   └── ...
├── package.json          # Frontend dependencies & scripts
├── tailwind.config.js    # Tailwind CSS configuration
└── ...
```
- **src/components/**: All UI components (cards, forms, header, footer, etc.).
- **src/hooks/**: Custom React hooks for state management and logic reuse.
- **src/api/**: Functions for making API requests to the backend.
- **src/types/**: TypeScript type definitions for log data and more.
- **src/App.tsx**: Main React component, contains the app layout and logic.
- **package.json**: Frontend dependencies and scripts.
- **tailwind.config.js**: Tailwind CSS configuration.

---

## 🏁 Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/VivekDahiya06/Log-Insepector.git
cd Log-Inspector
```

### 2️⃣ Setup the Backend
```bash
cd backend
npm install
```

- 📝 Create a `.env` file in `backend/` (see `.env.example` if present):
  ```env
  PORT=3001
  # Add other environment variables as needed
  ```

- ▶️ Start the backend server:
  ```bash
  npm run dev
  # or for production
  npm start
  ```
- 🌐 The backend will run at `http://localhost:3002` by default.

### 3️⃣ Setup the Frontend
```bash
cd ../frontend
npm install
npm run dev
# or for production
npm start
```
- 🌐 The frontend will run at `http://localhost:5174` by default.

---

## 📡 API Endpoints (Backend)
- `GET /logs` - Get all logs
- `POST /logs` - Add a new log

---

## 🚀 Deployment

### 🟦 Render (Backend)
- The backend is ready for Render deployment. Render will use the `start` script in `backend/package.json`.
- Render will use `npm install` as a build command before running the `start` script.

### ▲ Vercel (Frontend)
- The frontend is a standard React app and can be deployed to Vercel.
---

## 🛠️ Technologies Used
- **Frontend:** React, Material UI, Tailwind CSS, TypeScript
- **Backend:** Express.js, Zod, node-json-db, dotenv

---

## 🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.
