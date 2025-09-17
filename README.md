# Water Intake Tracker (Docker Compose)

A fullstack water intake tracker with React frontend, Node.js/Express backend, and PostgreSQL database. All services run with Docker Compose.

## Features
- Set and persist your daily water target
- Add water portions with one click (cup, bottle, or custom amount)
- Responsive and mobile-friendly UI
- Data is stored in PostgreSQL via the backend API

## Getting Started

1. Make sure you have Docker and Docker Compose installed.
2. Run:
   ```sh
   docker-compose up --build
   ```
3. Open [http://localhost:5173](http://localhost:5173) in your browser.

- Frontend: http://localhost:5173
- Backend API: http://localhost:4000
- Database: PostgreSQL on port 5432

## Customization
- You can change the default daily target in `src/App.jsx` (`DEFAULT_WATER_TARGET`).
- Environment variables can be set in `docker-compose.yml`.

## License
MIT
