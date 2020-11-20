import Link from 'next/link';

export default function Header(props) {
  const loggedInPassed = typeof props.loggedIn !== 'undefined';
  return (
    <footer className="footerStyle">
      <img className="logoStyle" src="./logo.png" alt="logo" />
      <div className='getInTouch'>
        <p>Get in touch: </p>
        <Link href="https://github.com/Milkac-Design">
          <a target="_blank">
            <img className="footerLogo" src="/GitHub_logo.png" />
          </a>
        </Link>
        <Link href="https://www.linkedin.com/in/mario-milkovic-5a904aa1/">
          <a target="_blank">
            <img className="footerLogo" src="/linkedIn_logo.png" />
          </a>
        </Link>
      </div>
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
