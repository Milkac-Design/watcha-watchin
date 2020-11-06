import { useState } from 'react';
// import cookie from 'js-cookie';

export default function AddMovie(apiKey) {
  const [addedMovie, setAddedMovie] = useState({});
  const [movieTitle, setMovieTitle] = useState({});
  const [review, setReview] = useState('');
  async function handleSubmit(e) {
    e.preventDefault();
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=${apiKey.apiKey}a&t=${movieTitle}`,
    );
    const data = await response.json();
    setAddedMovie(data);
    return setAddedMovie;
  }

  // function addMovieToCookie(name, poster) {

  //   let newMovie;

  //   newMovie = [{ name: name, poster: poster }];

  //   cookie.set('movie', newMovie);
  //   return newMovie;
  // }

  //----------

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={(e) => setMovieTitle(e.target.value)} />
        <button>search</button>
      </form>
      <button
        onClick={async (e) => {
          await fetch('/api/movies', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              movies: {
                name: addedMovie.Title,
                poster: addedMovie.Poster,
                review: review,
              },
            }),
          });

          window.location.href = `/mymovies`;
        }}
      >
        add to db
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
            <form>
              <textarea
                className="commentBox"
                rows="3"
                name="comment"
                onChange={(e) => setReview(e.target.value)}
              ></textarea>
              <br />
              <input type="text" value="comment" />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
