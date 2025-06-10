# Lead Management Tool – Backend (Node.js + Express + MongoDB)

This is the backend API for the Lead Management Tool, built with **Node.js**, **Express**, **MongoDB**, and **JWT**.

## 📁 Features
- JWT-based Authentication
- Role-based Access Control (admin/user)
- CRUD APIs for Leads
- Filtering, Searching, Sorting, Pagination
- Follow-up Reminder API
- CSV Import/Export for leads
- Admin-only User List for assignments

## 🚀 Tech Stack
- Node.js
- Express.js
- MongoDB + Mongoose
- JSON Web Tokens (JWT)
- Multer, CSV-Parser
- CORS, dotenv

## 🧩 Folder Structure
controllers/
middlewares/
models/
routes/
config/


## ⚙️ Environment Variables

Create a `.env` file:
```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

🚀 Getting Started
git clone https://github.com/your-username/lead-management-backend.git
cd lead-management-backend
npm install
npm run dev
