import Link from 'next/link';

export default function Header(props) {
  const loggedInPassed = typeof props.loggedIn !== 'undefined';

  return (
    <header className="headerStyle">
      <img className="logoStyle" src="./logo.png" alt="logo" />
      <nav>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/users">
          <a>Users</a>
        </Link>
        <Link href="/mymovies">
          <a>My Movies</a>
        </Link>
        {!loggedInPassed ? null : props.loggedIn ? (
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
