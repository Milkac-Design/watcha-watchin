import Head from 'next/head';
import { useState } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';

export default function Register(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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
        <h1>Register</h1>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const response = await fetch('/api/register', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                username: username,
                password: password,
                token: props.token,
              }),
            });
            const { success } = await response.json();
            if (success) {
              // redirect
            } else {
              if (response.status === 403) {
                setErrorMessage('Username already taken');
              } else {
                setErrorMessage('Failed');
              }
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
          <button>Register</button>
        </form>
        <p>{errorMessage}</p>
        <Link href="/login">
          <a>Login</a>
        </Link>
      </Layout>
      ;
    </>
  );
}

export async function getServerSideProps() {
  const Tokens = (await import('csrf')).default;
  const tokens = new Tokens();
  const token = tokens.create(process.env.CSRF_TOKEN_SECRET);

  return { props: { token } };
}
