import { useState } from 'react';
import cookie from 'js-cookie';

//--------------
export function getMovieFromCookies() {
  const movie = cookie.getJSON('movie') || [];
  return movie;
}

// export function AddMovieToList(name, poster) {
//   return (
//     <div className="movieContainer">
//       <div className="moviePosterStyle">
//         <img src={poster} alt="movie poster" />
//       </div>
//       <div className="movieDataStyle">
//         <div className="movieNameStyle">
//           <h3>{name}</h3>
//         </div>
//         <div className="ratingStyle">
//           <span class="fa fa-star checked"></span>
//           <span className="fa fa-star checked"></span>
//           <span className="fa fa-star checked"></span>
//           <span className="fa fa-star checked"></span>
//           <span className="fa fa-star checked"></span>
//         </div>
//         <div className="reviewStyle">
//           <p>
//             Lorizzle ipsum dolor sit amet, consectetizzle adipiscing elit.
//             Daahng dawg sapien velit, hizzle volutpizzle, suscipizzle fizzle, yo
//             vizzle, break yo neck, yall. Pellentesque yo mamma tortor. Sizzle
//             erizzle.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

//--------------
export default function AddMovie() {
  const [addedMovie, setAddedMovie] = useState({});
  const [movieTitle, setMovieTitle] = useState({});

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=(apikey)a&t=${movieTitle}`,
    );
    const data = await response.json();
    setAddedMovie(data);
    return setAddedMovie;
  }

  function addMovieToCookie(name, poster) {
    // const movie = getMovieFromCookies();
    let newMovie;
    // if (movie.length !== 0) {
    //   newMovie = [...movie];
    //   newMovie.push({ name: name, poster: poster });
    // } else {
    newMovie = [{ name: name, poster: poster }];
    //}
    cookie.set('movie', newMovie);
    return newMovie;
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={(e) => setMovieTitle(e.target.value)} />
        <button>search</button>
      </form>
      <button
        onClick={(e) => addMovieToCookie(addedMovie.Title, addedMovie.Poster)}
      >
        add
      </button>
      <div className="movieContainer">
        <div className="moviePosterStyle">
          <img src={addedMovie.Poster} alt="movie poster" />
        </div>
        <div className="movieDataStyle">
          <div className="movieNameStyle">
            <h3>{addedMovie.Title}</h3>
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
            <form action="" method="post">
              <textarea
                className="commentBox"
                rows="3"
                name="comment"
              ></textarea>
              <br />
              <input type="submit" value="comment" />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
