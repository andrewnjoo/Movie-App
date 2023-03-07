# Movie App

This application allows users to search for movies and TV shows, view details about each title, and watch trailers.

The code is held in a mono-repo, which contains two directories:

1. client - a web application built with React and Redux
1. server - an Express server that provides an API for the client

## Deployment

Movie App's frontend was deployed on Vercel for simple React deployment and the backend on Railway for deployment management.

## Technologies Used

### Client

- Vite 4.x
- React 18.x
- Redux 4.x
- Tailwind 3.x
- Vitest 0.2.x

### Server

- Express 4.x
- Prisma 4.x
- MySQL 8.x
- JsonWebToken 9.x
- Jest 29.x

## Getting Started

To get started, clone this repository and navigate to the client directory. Then, run the following command to install dependencies:

```
npm install
npm run dev
```

To start the development server you must follow these steps:

1. Create a MySQL database called `express_db`
1. Configure the database connection in the `generate-env.sh` script located in `/scripts`
1. Then run the following command:

```
npm run setup
```

4. Then run `npm run server` to start the server

## License

This project is licensed under the MIT License - see `docs/LICENSE.md` file for details
