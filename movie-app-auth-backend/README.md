## Backend

> this back-end application communicates data to/from a postgres db.

## [Deployment](https://polar-waters-71760.herokuapp.com/)

## Technologies

* Node
* PG
* CORS
* Express 
* Dotenv
* JSONWebToken 
* Bcrypt

## Instructions

```
git clone https://github.com/adnjoo/movie-app-auth-backend
cd movie-app-auth-backend
npm run create-db
nodemon server
```

### Dev

turn off `require("dotenv").config();` in controller.js
change to local in db.js

### Prod

turn on above in controller.js
change to heroku/prod in db.js
push to heroku using

```
git add .
git commit -m "b"
git push heroku main
```

### Env variables

PORT=4001

DATABASE_URL=postgres:**_

jwtSecret = _**
