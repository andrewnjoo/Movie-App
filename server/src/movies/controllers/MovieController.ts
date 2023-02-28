import { Request, Response } from 'express';
import { PrismaClient, Movie } from '@prisma/client';

import authorization from '../../authentication/middleware/authorization';

const prisma = new PrismaClient();

const getAllMovies = async (req: Request, res: Response) => {
  try {
    const movies: Movie[] = await prisma.movie.findMany();
    const moviesMap = movies.reduce((moviesMap: any, movie) => {
      const { tmdb_id } = movie;
      moviesMap[tmdb_id] = tmdb_id in moviesMap ? moviesMap[tmdb_id] + 1 : 1;
      return moviesMap;
    }, {});
    const moviesArray = Object.keys(moviesMap).map((tmdb_id) => ({
      tmdb_id: parseInt(tmdb_id),
      likes: moviesMap[tmdb_id],
    }));
    moviesArray.sort((a, b) => b.likes - a.likes);
    res.json(moviesArray);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const getUserMovies = async (req: any, res: Response) => {
  try {
    await authorization(req, res, async () => {
      const userId = req.user;

      const movies = await prisma.movie.findMany({
        where: {
          liked_by: userId,
        },
      });

      res.json(movies);
    });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
};

const addMovie = async (req: any, res: Response) => {
  try {
    await authorization(req, res, async () => {
      const userId = req.user;

      let { tmdb_id } = req.body;
      tmdb_id = parseInt(tmdb_id);

      const existingLike = await prisma.movie.findFirst({
        where: {
          tmdb_id,
          liked_by: {
            equals: userId,
          },
        },
      });

      if (existingLike) {
        return res.status(400).json({ message: 'Movie already liked by user' });
      }

      const newLike = await prisma.movie.create({
        data: {
          tmdb_id,
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });

      res.json(newLike);
    });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const deleteMovie = async (req: any, res: Response) => {
  try {
    await authorization(req, res, async () => {
      const userId = req.user;

      let { tmdb_id } = req.body;
      tmdb_id = parseInt(tmdb_id);

      const existingLike = await prisma.movie.findFirst({
        where: {
          tmdb_id,
          liked_by: {
            equals: userId,
          },
        },
      });

      if (!existingLike) {
        return res.status(400).json({ message: 'Movie not liked by user' });
      }

      const deletedLike = await prisma.movie.delete({
        where: {
          id: existingLike.id,
        },
      });

      res.json(deletedLike);
    });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

export { getAllMovies, getUserMovies, addMovie, deleteMovie };
