import { Router } from 'express';

import {
  getAllMovies,
  getUserMovies,
  addMovie,
  deleteMovie,
} from '../controllers/MovieController';

const router = Router();

router.get('/', getAllMovies);
router.get('/user', getUserMovies);
router.post('/add', addMovie);
router.delete('/delete', deleteMovie);

module.exports = router;
