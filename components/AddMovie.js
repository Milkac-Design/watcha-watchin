import { useState } from 'react';
// import cookie from 'js-cookie';

export default function AddMovie({ apiKey, id }) {
  const [addedMovie, setAddedMovie] = useState({});
  const [movieTitle, setMovieTitle] = useState({});
  const [review, setReview] = useState('');
  const [rating, setRating] = useState();

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${apiKey}a&t=${movieTitle}`,
    );
    const data = await response.json();
    setAddedMovie(data);
    return setAddedMovie;
  }

  return (
    <>
      <form className="searchFormStyle" onSubmit={handleSubmit}>
        <input
          className="searchInputStyle"
          type="text"
          onChange={(e) => setMovieTitle(e.target.value)}
        />
        <button className="searchButtonStyle">search</button>
      </form>
      <div className="movieContainer">
        <div className="moviePosterStyle">
          <img src={addedMovie.Poster} alt="movie poster" />
        </div>
        <div className="movieDataStyle">
          <div className="movieNameStyle">
            <h3>{addedMovie.Title}</h3>
          </div>
          <div className="ratingStyle">
            <input
              type="radio"
              name="rate"
              id="rate-5"
              onClick={(e) => setRating(5)}
            />
            <label for="rate-5" className="fa fa-star"></label>
            <input
              type="radio"
              name="rate"
              id="rate-4"
              onClick={(e) => setRating(4)}
            />
            <label for="rate-4" className="fa fa-star"></label>
            <input
              type="radio"
              name="rate"
              id="rate-3"
              onClick={(e) => setRating(3)}
            />
            <label for="rate-3" className="fa fa-star"></label>
            <input
              type="radio"
              name="rate"
              id="rate-2"
              onClick={(e) => setRating(2)}
            />
            <label for="rate-2" className="fa fa-star"></label>
            <input
              type="radio"
              name="rate"
              id="rate-1"
              onClick={(e) => setRating(1)}
            />
            <label for="rate-1" className="fa fa-star"></label>
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
            </form>
          </div>
        </div>
        <button
          className="addButtonStyle"
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
                  creator: id,
                  rating: rating,
                },
              }),
            });

            window.location.href = `/mymovies`;
          }}
        >
          add movie
        </button>
      </div>
    </>
  );
}
