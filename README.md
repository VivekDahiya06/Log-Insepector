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

## 🌱 Environment Variables

Set up environment variables to configure your backend and frontend without hardcoding sensitive or environment-specific data.

### 🗂️ How to Set Up

#### Backend (`backend/`)
- Create a `.env` file in the `backend/` directory (at the same level as `package.json`).
- Example:
  ```env
  PORT=3001
  # Add other backend environment variables here
  ```
- Access variables in code using `process.env.VARIABLE_NAME` (e.g., `process.env.PORT`).

#### Frontend (`frontend/`)
- Create a `.env` file in the `frontend/` directory(at the same level as package.json).
- **All frontend environment variables must start with `VITE_`** (required by Vite).
- Example:
  ```env
  VITE_REMOTE_URL=http://localhost:3001/logs
  # Add other frontend environment variables here
  ```
- Access variables in code using `import.meta.env.VITE_VARIABLE_NAME` (e.g., `import.meta.env.VITE_REMOTE_URL`).

### 🔒 Security
- **Never commit your `.env` files to Git!**
- Use a `.env.example` file to show required variables (without real secrets) for collaborators.

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
### 3️⃣ Set up environment variables as described in the [🌱 Environment Variables](#-environment-variables) section.

### 4️⃣ Start the backend server:
  ```bash
  npm run dev # for development
  npm start # for production
  ```
The backend will run at `http://localhost:3001` using the PORT from .env file. In case .env file is not read then backend will start at `http://localhost:3002` by default.

### 5️⃣ Setup the Frontend
```bash
cd ../frontend
npm install
```
### 6️⃣ Set up environment variables as described in the [🌱 Environment Variables](#-environment-variables) section.
### 7️⃣ Start the frontend server:
```bash
npm run dev # for development
```
The frontend will run at `http://localhost:5174` by default.

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
