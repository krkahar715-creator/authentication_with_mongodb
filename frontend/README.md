# KAHAR Authentication App

A responsive authentication app with a React frontend and an Express/MongoDB backend. Users can create an account, sign in, and arrive at a personalized home page.

## Features

- Responsive signup and login pages.
- Account creation and sign-in through the backend API.
- Password hashing with `bcryptjs` and JWT authentication cookies.
- MongoDB persistence through Mongoose.
- Personalized home page after successful signup or login.
- Duplicate email and username checks.

## Project structure

```text
authentication/
├── backend/
│   ├── config/db.js
│   ├── controllers/auth.controller.js
│   ├── models/user.js
│   ├── routes/createUser.js
│   └── index.js
└── frontend/
    ├── src/components/
    │   ├── Home.jsx
    │   ├── Signup.jsx
    │   └── login.jsx
    ├── src/context/
    └── package.json
```

## Requirements

- Node.js and npm.
- A MongoDB database, local or hosted.

## Configuration

Create `backend/.env` (do not commit this file) and configure:

```dotenv
MONGOURL=mongodb+srv://<username>:<password>@<cluster>/<database>
JWT_SECRET=<a-random-secret-at-least-32-characters-long>
PORT=8000
NODE_ENV=development
```

Use a URL-encoded password if it contains reserved MongoDB URI characters. `PORT` and `NODE_ENV` are optional; the backend defaults to port `8000`. The frontend currently uses `http://localhost:8000` as its API URL, and the backend allows the Vite origin `http://localhost:5173`.

## Run locally

Open two terminals from the project root.

Start the backend:

```powershell
cd backend
npm install
npm run dev
```

Start the frontend in another terminal:

```powershell
cd frontend
npm install
npm run dev
```

Open the Vite URL shown in the terminal, usually `http://localhost:5173`. Go to `/signup` to create an account or `/login` to sign in. A successful signup or login navigates to `/home`.

## API

The backend listens on port `8000` by default:

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/` | Basic backend response |
| `POST` | `/api/signup` | Create an account |
| `POST` | `/api/login` | Sign in |
| `POST` | `/api/logout` | Clear the auth cookie |
| `GET` | `/api/user` | List user records |
| `POST` | `/api/user` | Create a user record directly |

Signup expects JSON fields `firstName`, `lastName`, `email`, `password`, and `userName`. Passwords must be at least six characters. Signup and login return a user object and set an HTTP-only JWT cookie; the frontend sends requests with credentials enabled.

## Frontend scripts

Run these from `frontend/`:

```powershell
npm run dev
npm run build
npm run lint
npm run preview
```

The backend development command is `npm run dev` from `backend/`.

## Security notes

- Keep `backend/.env` private and never add production credentials to source control.
- Use a strong, unique `JWT_SECRET` of at least 32 characters.
- Use HTTPS and set `NODE_ENV=production` in production so auth cookies use the `secure` option.
- The `/api/user` endpoints are not protected by authentication middleware. In addition, `POST /api/user` writes the submitted password directly rather than hashing it. Do not expose or use these endpoints with real user data; use the `/api/signup` flow instead, or remove/protect the endpoints before production.
- The frontend keeps the returned user in React context only. Refreshing the page clears this client-side user state, and `/home` is not currently protected by server-verified authentication.
