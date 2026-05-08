# Mini CRM

A simple yet fully functional Mini CRM (Customer Relationship Management) web application built with React.js frontend, Node.js Express backend, and MongoDB database.

## Features

- **Authentication System**: JWT-based admin login with secure password hashing
- **Lead Management**: Full CRUD operations for managing client leads
- **Dashboard**: Professional UI with lead statistics, filtering, and search
- **Responsive Design**: Modern, beautiful UI with glassmorphism effects

## Tech Stack

- **Frontend**: React.js, HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT with bcrypt password hashing
- **Styling**: Custom CSS with modern design principles

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies:
   ```bash
   npm run install-all
   ```

4. Set up environment variables in `.env` file:
   ```
   MONGO_URI=mongodb://localhost:27017/mini-crm
   JWT_SECRET=your_jwt_secret_key_here
   PORT=5000
   ```

5. Start MongoDB service

6. Start the development server:
   ```bash
   npm run dev
   ```

The application will run on:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

### Default Admin Credentials

- Email: admin@example.com
- Password: admin123

## API Endpoints

- `POST /api/auth/login` - Admin login
- `GET /api/leads` - Get all leads
- `POST /api/leads` - Create new lead
- `PUT /api/leads/:id` - Update lead
- `DELETE /api/leads/:id` - Delete lead

## Project Structure

```
mini-crm/
├── client/                 # React frontend
│   ├── components/         # Reusable components
│   ├── pages/             # Page components
│   ├── context/           # React context for auth
│   ├── App.js
│   └── index.js
├── server/                 # Node.js backend
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── middleware/        # Authentication middleware
│   ├── server.js          # Main server file
│   └── config/            # Database config
├── .env                    # Environment variables
└── package.json           # Root package.json
```

## Usage

1. Login with admin credentials
2. View dashboard with lead statistics
3. Manage leads: view, update status, add notes, delete
4. Use filters and search to find specific leads

## Contributing

Feel free to submit issues and enhancement requests.