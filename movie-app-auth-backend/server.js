//import dependencies
const express = require("express");
const cors = require("cors");
const controller = require("./controller.js");
// const port = 4001; // use either the host env var port (PORT) provided by Heroku or the local port (4001) on your machine
const port = process.env.PORT || 4001; // use either the host env var port (PORT) provided by Heroku or the local port (4001) on your machine

const app = express(); //let app = a new express instance, and use CORS and JSON

app.use(cors()); // Enable CORS
app.use(express.json()); // Recognize Request Objects as JSON objects

//add a movie
// app.post("/", controller.addMovie);

//get the movie
app.get("/", controller.getMovies);

//edit the movie name
app.put("/", controller.editMovie);

//delete a movie
app.delete("/", controller.deleteMovie);

//listening on port
app.listen(port, () => {
  console.log(`Serving on port ${port}`);
});

//register and login routes
app.use("/auth", require("./auth-routes/jwtAuth"));

//dashboard route
app.use("/dashboard", require("./auth-routes/dashboard"));

//new routes
app.use("/", require("./controller2"));

//help
//https://medium.com/dataseries/add-timeout-capability-to-express-apps-with-connect-timeout-fce06d76e07a
//https://github.com/Codecademy/deploying-fullstack-with-heroku-sample
