# Mini CRM

A full-stack Customer Relationship Management (CRM) application built with React.js frontend, Node.js/Express backend, and MySQL via Sequelize.

## 🚀 Project Overview

This repository contains a `mini-crm` folder with a complete CRM system:

- `mini-crm/client/` — React frontend app
- `mini-crm/server/` — Express backend API with MySQL database
- `mini-crm/package.json` — root scripts for running both client and server together

## 🔧 Key Features

- JWT-based admin authentication
- Secure password hashing for admin accounts
- Lead management: add, view, update, delete leads
- Lead status workflow: `new`, `contacted`, `converted`
- MySQL data persistence through Sequelize
- Frontend and backend development setup with one command

## 📦 Requirements

- Node.js v14 or higher
- npm
- MySQL database server
- Optional: VS Code or another editor

## 📥 Installation

1. Open the project root:

```bash
cd mini-crm
```

2. Install dependencies:

```bash
npm install
```

3. Install both frontend and backend dependencies:

```bash
npm run install-all
```

## ⚙️ Environment Configuration

Create a `.env` file inside `mini-crm/server/` with the following variables:

```env
DB_NAME=mini_crm_db
DB_USER=root
DB_PASSWORD=your_password
DB_HOST=localhost
DB_DIALECT=mysql
JWT_SECRET=your_jwt_secret
PORT=5000
```

## 🚀 Running the App

From `mini-crm/`, start both backend and frontend together:

```bash
npm run dev
```

- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000`

### Run only backend

```bash
npm run server
```

### Run only frontend

```bash
npm run client
```

## 🔐 Default Admin Credentials

The application creates a default admin user automatically if one does not exist.

- Email: `admin@example.com`
- Password: `admin123`

## 🧩 API Endpoints

- `POST /api/auth/login` — admin login
- `GET /api/leads` — get all leads (protected)
- `POST /api/leads` — create a new lead
- `PUT /api/leads/:id` — update lead details/status (protected)
- `DELETE /api/leads/:id` — delete a lead (protected)

## 📁 Project Structure

```
mini-crm/
  client/                  # React frontend
  server/                  # Backend API
    config/
    middleware/
    models/
    routes/
  package.json            # root package scripts
```

## 📝 Notes

- The backend uses Sequelize to sync models and create tables automatically.
- The frontend proxy is configured to forward API requests to `http://localhost:5000`.
- Make sure MySQL is running before starting the backend.
