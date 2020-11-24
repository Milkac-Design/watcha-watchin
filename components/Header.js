import Link from 'next/link';

export default function Header(props) {
  const loggedInPassed = typeof props.loggedIn !== 'undefined';

  return (
    <header className="headerStyle">
      <img className="logoStyle" src="./logo.png" alt="logo" />
      <nav>
        <Link href="/" data-cy="home">
          <a data-cy="home">Home</a>
        </Link>
        <Link data-cy="users" href="/users">
          <a data-cy="users">Users</a>
        </Link>
        <Link data-cy="mymovies" href="/mymovies">
          <a data-cy="mymovies">My Movies</a>
        </Link>
        {loggedInPassed === true ? (
          <Link href="/logout">
            <a>Log out</a>
          </Link>
        ) : (
          <Link href="/login">
            <a>Log in</a>
          </Link>
        )}
      </nav>
    </header>
  );
}
