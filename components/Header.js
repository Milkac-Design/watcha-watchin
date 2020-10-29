import Link from 'next/link';

export default function Header() {
  return (
    <header className="headerStyle">
      <img className="logoStyle" src="./logo.png" alt="logo" />
      <nav>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/mymovies">
          <a>My Movies</a>
        </Link>
        <Link href="/">
          <a>Log Out</a>
        </Link>
      </nav>
    </header>
  );
}
