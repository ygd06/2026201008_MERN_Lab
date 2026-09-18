# Student Notes CRUD Micro-App — MERN Stack

Name: Gnanadeepak Yerra
RollNo: 2026201008
GitHub Repo : https://github.com/ygd06/2026201008_MERN_Lab

## Tech Stack

| Layer    | Technology              |
| -------- | ----------------------- |
| Frontend | React 18 + Vite + Axios |
| Backend  | Node.js + Express.js    |
| Database | MongoDB + Mongoose ODM  |
| Styling  | Vanilla CSS             |

## Project Structure

notes-app/
├── .gitignore
├── README.md
├── screenshots/
│ ├── ui-preview.png
│ └── delete-action.png
├── server/
│ ├── config/
│ │ └── db.js # Mongoose connection logic
│ ├── models/
│ │ └── Note.js # Mongoose schema & model
│ ├── routes/
│ │ └── noteRoutes.js # REST API route handlers
│ ├── package.json
│ └── server.js # Express entry point & middleware
└── client/
├── index.html
├── vite.config.js
├── package.json
└── src/
├── App.jsx # State orchestration, Form & Note List
├── main.jsx # React DOM root mounting
└── index.css # Styling

## Prerequisites

- Node.js ≥ 18
- MongoDB running locally (`mongod`)

## Setup & Run

### 1. Start MongoDB

mongod

### 2. Start the Express Server

cd server
npm install
npm start

# → http://localhost:5000

### 3. Start the React Client

cd client
npm install
npm run dev

# → http://localhost:5173

Open **http://localhost:5173** in your browser.

## REST API Reference

| Method | Endpoint         | Body                 | Status  | Description          |
| ------ | ---------------- | -------------------- | ------- | -------------------- |
| POST   | `/api/notes`     | `{ title, content }` | 201     | Create a new note    |
| GET    | `/api/notes`     | —                    | 200     | Get all notes (desc) |
| DELETE | `/api/notes/:id` | —                    | 200/404 | Delete note by `_id` |

### Smoke-test with curl

# Create

curl -X POST http://localhost:5000/api/notes \
 -H "Content-Type: application/json" \
 -d '{"title":"Lecture 1","content":"Intro to MERN"}'

# Read

curl http://localhost:5000/api/notes

# Delete (replace <id> with actual \_id)

curl -X DELETE http://localhost:5000/api/notes/<id>

## Mongoose Schema

{
title: { type: String, required: true },
content: { type: String, required: true },
createdAt: { type: Date, default: Date.now }
}
