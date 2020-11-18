import Link from 'next/link';

export default function Header(props) {
  const loggedInPassed = typeof props.loggedIn !== 'undefined';
  return (
    <footer className="footerStyle">
      <img className="logoStyle" src="./logo.png" alt="logo" />
      <nav>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/users">
          <a>Users</a>
        </Link>
        <Link href="/">
          <a>My Movies</a>
        </Link>
        {!loggedInPassed === false ? (
          <Link href="/logout">
            <a>Log out</a>
          </Link>
        ) : (
            <Link href="/login">
              <a>Log in</a>
            </Link>
          )}
      </nav>
    </footer>
  );
}
