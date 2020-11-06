import postgres from 'postgres';
import dotenv from 'dotenv';

dotenv.config();

const sql = postgres();

export async function insertMovie(movie) {
  const requiredProperties = ['name', 'poster', 'review'];
  const movieProperties = Object.keys(movie);

  if (movieProperties.length !== requiredProperties.length) {
    return undefined;
  }

  const difference = movieProperties.filter(
    (prop) => !requiredProperties.includes(prop),
  );

  if (difference.length > 0) {
    return undefined;
  }

  const movies = await sql`
    INSERT INTO movies
      (name, poster, review)
    VALUES
      (${movie.name}, ${movie.poster}, ${movie.review})
    RETURNING *;
  `;

  return movies.map((film) => {
    return { id: film.id, name: film.name, poster: film.poster };
  });
}

export async function deleteMovie(id) {
  const movies = await sql`
DELETE FROM movies
WHERE id = ${id}
RETURNING *;
`;
  return movies.map((film) => {
    return { id: film.id, name: film.name, poster: film.poster };
  });
}

export async function getMovies() {
  const movies = await sql`SELECT * from movies`;
  return movies;
}
export async function registerUser(username, password) {
  const user = await sql`
    INSERT INTO users
      (username, password)
    VALUES
      (${username}, ${password})
    RETURNING *;
  `;
  return user;
}
export async function getUserByUsername(username) {
  const user = await sql`
  SELECT * FROM users WHERE username = ${username}`;
  return user;
}
