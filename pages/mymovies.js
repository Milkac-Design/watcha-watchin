import Head from 'next/head';
import { useState } from 'react';
import AddMovie from '../components/AddMovie';
import Layout from '../components/Layout';
import nextCookies from 'next-cookies';
import { isSessionTokenValid } from '../utils/auth';
import { getSessionByToken } from '../utils/database';

export default function MyMovies(props) {
  const [movieData, setMovieData] = useState(props.movies);

  // console.log(props.id);

  return (
    <div className="paigeContainer">
      <Head>
        <title>My Movies</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Quintessential&display=swap"
          rel="stylesheet"
        ></link>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        ></link>
      </Head>
      <Layout loggedIn={props.loggedIn}>
        <h1 className="titleStyle">My Movies</h1>
        <div className="outsideMovieContainer">
          <>
            {movieData.map((movie) => {
              return (
                <div className="movieContainer">
                  <div className="moviePosterStyle">
                    <img src={movie.poster} alt="movie poster" />
                  </div>
                  <div className="movieDataStyle">
                    <div className="movieNameStyle">
                      <h3>{movie.name}</h3>
                    </div>
                    <div className="ratingStyle">
                      <input type="radio" name="rate" id="rate-5" />
                      <label for="rate-5" class="fa fa-star"></label>
                      <input type="radio" name="rate" id="rate-4" />
                      <label for="rate-4" class="fa fa-star"></label>
                      <input type="radio" name="rate" id="rate-3" />
                      <label for="rate-3" class="fa fa-star"></label>
                      <input type="radio" name="rate" id="rate-2" />
                      <label for="rate-2" class="fa fa-star"></label>
                      <input type="radio" name="rate" id="rate-1" />
                      <label for="rate-1" class="fa fa-star"></label>
                    </div>
                    <div className="reviewStyle">
                      <p>{movie.review}</p>
                    </div>
                  </div>
                  <button
                    onClick={async (e) => {
                      await fetch(`/api/movies`, {
                        method: 'DELETE',
                        body: JSON.stringify(movie.id),
                      });
                    }}
                  >
                    delete
                  </button>
                </div>
              );
            })}
          </>

          <AddMovie apiKey={props.apiKey} id={props.id} />
        </div>
        <div className="footerBuffer"></div>
      </Layout>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { getMovies } = await import('../utils/database');
  const token = nextCookies(context);
  const id = await getSessionByToken(token.session);
  const movies = await getMovies(id.userid);

  if (!(await isSessionTokenValid(token.session))) {
    return {
      redirect: {
        destination: '/login?returnTo=/mymovies',
        permanent: false,
      },
    };
  }

  const loggedIn = await isSessionTokenValid(token.session);
  const apiKey = process.env.apiKey;
  return {
    props: {
      movies,
      apiKey,
      loggedIn,
      id: id.userid,
    },
  };
}
