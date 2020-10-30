import Head from 'next/head';
import { useEffect, useState } from 'react';
import AddMovie from '../components/AddMovie';
import Layout from '../components/Layout';
import nextCookies from 'next-cookies';
import AddMovieToList from '../components/AddMovieToList';

export default function MyMovies(props) {
  const [movieData, setMovieData] = useState({});

  //playing around with fake database
  //-------------------------------
  const [addedMovie, setAddedMovie] = useState(props.movieFromCookies);
  //Make a cookie!!!
  //-------------------------------
  //Start of the good code

  useEffect(() => {
    async function apiCall() {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=(apikey)&t=batman`,
      );
      const data = await response.json();
      setMovieData(data);
    }
    apiCall();
  }, []);

  console.log(addedMovie);

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
      <Layout>
        <h1 className="titleStyle">My Movies</h1>
        <div className="outsideMovieContainer">
          <div className="movieContainer">
            <div className="moviePosterStyle">
              <img src={movieData.Poster} alt="movie poster" />
            </div>
            <div className="movieDataStyle">
              <div className="movieNameStyle">
                <h3>{movieData.Title}</h3>
              </div>
              <div className="ratingStyle">
                <span class="fa fa-star "></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
              </div>
              <div className="reviewStyle">
                <p>
                  Lorizzle ipsum dolor sit amet, consectetizzle adipiscing elit.
                  Daahng dawg sapien velit, hizzle volutpizzle, suscipizzle
                  fizzle, yo vizzle, break yo neck, yall. Pellentesque yo mamma
                  tortor. Sizzle erizzle. Lorizzle ipsum dolor sit amet,
                  consectetizzle adipiscing elit. Daahng dawg sapien velit,
                  hizzle volutpizzle, suscipizzle fizzle, yo vizzle, break yo
                  neck, yall. Pellentesque yo mamma tortor. Sizzle erizzle.
                </p>
              </div>
            </div>
          </div>
          <div className="movieContainer">
            <div className="moviePosterStyle">
              {/* <img src={addedMovie[0].poster} alt="movie poster" /> */}
            </div>
            <div className="movieDataStyle">
              <div className="movieNameStyle">
                {/* <h3>{addedMovie[0].name}</h3> */}
              </div>
              <div className="ratingStyle">
                <span class="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
              </div>
              <div className="reviewStyle">
                <p>
                  Lorizzle ipsum dolor sit amet, consectetizzle adipiscing elit.
                  Daahng dawg sapien velit, hizzle volutpizzle, suscipizzle
                  fizzle, yo vizzle, break yo neck, yall. Pellentesque yo mamma
                  tortor. Sizzle erizzle.
                </p>
              </div>
            </div>
          </div>
          <div className="movieContainer">
            <div className="moviePosterStyle"></div>
            <div className="movieDataStyle">
              <div className="movieNameStyle">
                <h3>Movie The Third</h3>
              </div>
              <div className="ratingStyle">
                <span class="fa fa-star "></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
              </div>
              <div className="reviewStyle">
                <p>
                  Lorizzle ipsum dolor sit amet, consectetizzle adipiscing elit.
                  Daahng dawg sapien velit, hizzle volutpizzle, suscipizzle
                  fizzle, yo vizzle, break yo neck, yall. Pellentesque yo mamma
                  tortor. Sizzle erizzle.
                </p>
              </div>
            </div>
          </div>

          <AddMovie />
          <AddMovieToList movie={props.movieFromCookies} />
        </div>
        <div className="footerBuffer"></div>
      </Layout>
    </div>
  );
}

export async function getServerSideProps(context) {
  const allCookies = nextCookies(context);
  const movieFromCookies = allCookies.movie || [];
  console.log(movieFromCookies);
  return {
    props: {
      movieFromCookies,
    },
  };
}
