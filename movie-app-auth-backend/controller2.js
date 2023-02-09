const jwt = require("jsonwebtoken");
require("dotenv").config();
const router = require("express").Router();
const pool = require("./db");

//already authorized with my jwt
router.post("/", async (req, res) => {
  try {
    const jwtToken = req.header("token");
    const payload = jwt.verify(jwtToken, process.env.jwtSecret);
    req.user = payload.user;
    // console.log('req.user is', req.user)
    // console.log(req.body);
    const user = await pool
      .query("INSERT INTO movies (name, user_id) VALUES ($1, $2);", [
        req.body.movie,
        req.user,
      ])
      .then((results) => {
        res.status(200).send(results);
      });
  } catch (e) {
    console.log(e.message);
  }
});

//get movies with user_id
router.post("/getmovies", async (req, res) => {
  try {
    const jwtToken = req.header("token");
    const payload = jwt.verify(jwtToken, process.env.jwtSecret);
    req.user = payload.user;
    // console.log(req.user)
    const user = await pool
      .query("SELECT * FROM movies WHERE user_id = $1;", [req.user])
      .then((results) => {
        res.status(200).send(results);
      });
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;

// pool
// .query("select * from movies where user_id = $1;")
// .then((results) => {
//   movies = results.rows;
//   res.status(200).send(movies);
// })
// .catch((err) => console.log(err));
