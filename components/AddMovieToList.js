export default function AddMovieToList(movie) {
  const theMovie = movie.movie;

  if (theMovie.length === 1) {
    const name = theMovie[0].name;
    const poster = theMovie[0].poster;
    return (
      <div className="movieContainer">
        <div className="moviePosterStyle">
          <img src={poster} alt="movie poster" />
        </div>
        <div className="movieDataStyle">
          <div className="movieNameStyle">
            <h3>{name}</h3>
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
              Daahng dawg sapien velit, hizzle volutpizzle, suscipizzle fizzle,
              yo vizzle, break yo neck, yall. Pellentesque yo mamma tortor.
              Sizzle erizzle.
            </p>
          </div>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}
