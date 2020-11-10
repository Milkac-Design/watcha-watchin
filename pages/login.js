import Head from 'next/head';
import { useState } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import { useRouter } from 'next/router';
import nextCookies from 'next-cookies';
import { isSessionTokenValid } from '../utils/auth';

export default function Login(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  return (
    <>
      <Head>
        <title>My Movies</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Quintessential&display=swap"
          rel="stylesheet"
        ></link>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        ></link>
      </Head>
      <Layout>
        <h1>Login</h1>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const response = await fetch('/api/login', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ username, password }),
            });
            const { success } = await response.json();

            if (!success) {
              setErrorMessage('Login failed!');
            } else {
              setErrorMessage('');
              router.push(props.redirectDestination);
            }
          }}
        >
          <input
            value={username}
            onChange={(e) => setUsername(e.currentTarget.value)}
          />
          <input
            value={password}
            type="password"
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
          <button>Login</button>
        </form>
        <p>{errorMessage}</p>
        <Link href="/register">
          <a>Register</a>
        </Link>
      </Layout>
      ;
    </>
  );
}

export async function getServerSideProps(context) {
  const token = nextCookies(context);
  const redirectDestination = context?.query?.returnTo ?? '/';

  if (await isSessionTokenValid(token.session)) {
    return {
      redirect: {
        destination: redirectDestination,
        permanent: false,
      },
    };
  }

  return {
    props: { loggedIn: false, redirectDestination: redirectDestination },
  };
}
