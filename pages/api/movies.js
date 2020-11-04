import { deleteMovie, getMovies, insertMovie } from '../../utils/database';

let movies;
let movie;

export default async function handler(req, res) {
  if (req.method === 'GET') {
    movies = await getMovies();
  } else if (req.method === 'POST') {
    const newMovie = req.body.movies;
    movie = await insertMovie(newMovie);
  } else if (req.method === 'DELETE') {
    movie = await deleteMovie('1');
  }

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ movies: movies }));
}
