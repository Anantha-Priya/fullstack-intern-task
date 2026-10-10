# Tempo - Mini SaaS Template Store

A small full-stack web app where users can register, log in, browse website templates,
mark templates as favorites, and view them in a "My Favorites" section.

## Live Demo

- **Frontend:** https://fullstack-intern-task-wheat.vercel.app
- **Backend API:** https://fullstack-intern-task-7joa.onrender.com/api

> The backend runs on Render's free tier and sleeps after about 15 minutes of inactivity.
> The first request can take 30-60 seconds to wake it up. Please wait a moment, then refresh.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19 (Vite), React Router, Axios, Tailwind CSS 4 |
| Backend | Node.js, Express 5 |
| Database | SQLite |
| Query builder | Knex.js (migrations and seeds) |
| Auth | JSON Web Tokens (`jsonwebtoken`), `bcrypt` |
| Version control | Git / GitHub |


## Setup Instructions

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or newer
- npm (comes with Node.js)

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/fullstack-intern-task.git
cd fullstack-intern-task
```

### 2. Run the backend (server)

```bash
cd server
npm install
```

Create a file named `.env` inside the `server/` folder:

```env
PORT=5000
JWT_SECRET=replace_this_with_a_long_random_string
```

Create the database tables and add the sample templates, then start the server:

```bash
npx knex migrate:latest
npx knex seed:run
npm run dev
```

The API is now running at **http://localhost:5000**.

> `npm run dev` uses nodemon (auto-restart). Use `npm start` to run without it.
> Running `npx knex seed:run` again resets the templates and clears all favorites.

### 3. Run the frontend (client)

Open a second terminal:

```bash
cd client
npm install
npm run dev
```

The app opens at **http://localhost:3000**.

By default the frontend calls `http://localhost:5000/api`. To point it at a different
backend, create `client/.env` with:

```env
VITE_API_URL=https://your-backend-url/api
```

### Quick check

1. Open http://localhost:3000 and browse the templates.
2. Click **Register** and create an account.
3. Click the heart on a few templates, then open **My Favorites**.

## Author

- **Name:** Anantha Priya S
- **Email:** priyasolairaj133@gmail.com
- **LinkedIn:** https://linkedin.com/in/ananthapriya
