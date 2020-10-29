import { useEffect, useState } from 'react';

export default function AddMovie() {
  const [movieData, setMovieData] = useState({});
  const [movieTitle, setMovieTitle] = useState({});

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await fetch(
      `http://www.omdbapi.com/?apikey={apikey}&t=${movieTitle}`,
    );
    const data = await response.json();
    setMovieData(data);
  }

  console.log(movieData);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={(e) => setMovieTitle(e.target.value)} />
        <button>search</button>
      </form>
      <div className="movieContainer">
        <div className="moviePosterStyle">
          <img src={movieData.Poster} alt="movie poster" />
        </div>
        <div className="movieDataStyle">
          <div className="movieNameStyle">
            <h3>{movieData.Title}</h3>
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
