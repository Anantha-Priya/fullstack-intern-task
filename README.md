# Tempo - Mini SaaS Template Store

A small full-stack web app where users can register, log in, browse website templates,
mark templates as favorites, and view them in a "My Favorites" section.

Built for the **Gnxtace Technologies - Full Stack Web Developer Intern** technical task.

## Features

- Register and login with JWT authentication (passwords hashed with bcrypt)
- Browse all templates (public) with image, category, description and a Favorite button
- Template details page with a larger image, price, features and a "Use this template" button
- Favorite and un-favorite templates; already-favorited templates are marked
- "My Favorites" page, visible only to logged-in users
- Search templates and filter by category
- Logout button and protected routes (`/favorites` redirects to `/login` when logged out)
- Responsive UI built with Tailwind CSS

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19 (Vite), React Router, Axios, Tailwind CSS 4 |
| Backend | Node.js, Express 5 |
| Database | SQLite |
| Query builder | Knex.js (migrations and seeds) |
| Auth | JSON Web Tokens (`jsonwebtoken`), `bcrypt` |
| Version control | Git / GitHub |

## Project Structure

```
fullstack-intern-task/
├── client/                 # React frontend
│   └── src/
│       ├── api/            # Axios instance (adds the JWT to every request)
│       ├── components/     # Navbar, TemplateCard, PageHeader, AuthLayout, ...
│       ├── context/        # AuthContext (login state, token in localStorage)
│       └── pages/          # Login, Register, Templates, TemplateDetails, Favorites
└── server/                 # Express backend
    ├── controllers/        # auth, templates, favorites logic
    ├── db/                 # Knex connection
    ├── middleware/         # JWT auth middleware
    ├── migrations/         # users, templates, favorites tables
    ├── routes/             # API route definitions
    ├── seeds/              # sample templates
    └── utils/              # formatTemplate helper
```

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

## API Reference

Base URL: `http://localhost:5000/api`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/auth/register` | No | Create an account. Body: `name`, `email`, `password` (min 6 chars). Returns a JWT. |
| POST | `/auth/login` | No | Log in. Body: `email`, `password`. Returns a JWT. |
| GET | `/templates` | No | List all templates |
| GET | `/templates/:id` | No | Get one template with its details |
| GET | `/favorites` | Yes | List the logged-in user's favorite templates |
| POST | `/favorites/:templateId` | Yes | Add a template to favorites |
| DELETE | `/favorites/:templateId` | Yes | Remove a template from favorites |

Protected routes expect the header `Authorization: Bearer <token>`.

Errors are returned as JSON, e.g. `{ "message": "Invalid email or password" }`, with
appropriate status codes (`400` validation, `401` unauthorized, `404` not found,
`409` conflict, `500` server error).

### Template fields

`id`, `name`, `description`, `thumbnail_url`, `category`, plus `price` and `features`
(a list) used by the details page.

## Author

- **Name:** Anantha Priya S
- **Email:** priyasolairaj133@gmail.com
- **LinkedIn:** https://linkedin.com/in/ananthapriya
