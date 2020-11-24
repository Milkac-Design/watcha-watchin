import postgres from 'postgres';
import dotenv from 'dotenv';
import setPostgresOnHeroku from './setPostgressOnHeroku';

setPostgresOnHeroku();
dotenv.config();

const sql =
  process.env.NODE_ENV === 'production'
    ? // Heroku needs SSL connections but
      // has an "unauthorized" certificate
      // https://devcenter.heroku.com/changelog-items/852
      postgres({ ssl: { rejectUnauthorized: false } })
    : postgres({ idle_timeout: 2 });

export async function insertMovie(movie) {
  const requiredProperties = ['name', 'poster', 'review', 'creator', 'rating'];
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
      (name, poster, review, creator, rating)
    VALUES
      (${movie.name}, ${movie.poster}, ${movie.review}, ${movie.creator}, ${movie.rating})
    RETURNING *;
  `;

  return movies.map((film) => {
    return {
      id: film.id,
      name: film.name,
      poster: film.poster,
      rating: film.rating,
    };
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

export async function getMovies(id) {
  const movies = await sql`SELECT * from movies WHERE creator = ${id}`;
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

export async function getUsers() {
  const users = await sql`SELECT * FROM users`;
  return users.map((user) => {
    return { id: user.id, username: user.username };
  });
}

export async function deleteUser(id) {
  const user = await sql`
DELETE FROM users
WHERE id = ${id}
`;
  return user[0];
}

export async function getUserByUsername(username) {
  const user = await sql`
  SELECT * FROM users WHERE username = ${username}`;
  return user[0];
}

export async function getUserById(id) {
  const user = await sql`
  SELECT username FROM users WHERE id = ${id}`;
  return user[0];
}

export async function insertSession(token, userId) {
  const sessions = await sql`
    INSERT INTO sessions
      (token, userId)
    VALUES
      (${token}, ${userId})
    RETURNING *;
  `;

  return sessions[0];
}
export async function getSessionByToken(token) {
  const sessions = await sql`
    SELECT * FROM sessions WHERE token = ${token};
  `;

  return sessions[0];
}

export async function deleteSessionByToken(token) {
  if (token === 'undefined') return;
  await sql`
    DELETE FROM sessions WHERE token = ${token};
  `;
}

export async function deleteExpiredSessions() {
  await sql`
    DELETE FROM sessions WHERE expiry < NOW();
  `;
}

// Example of a database query with an Inner Join
export async function getUserBySessionToken(token) {
  if (token === 'undefined') return undefined;

  const users = await sql`
    SELECT
      users.id,
      users.username
    FROM
      users,
      sessions
    WHERE
      sessions.token = ${token} AND
      users.id = sessions.userId;
  `;

  return users[0];
}
