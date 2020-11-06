import Head from 'next/head';
import { useState } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
          onSubmit={(e) => {
            e.preventDefault();
            fetch('/api/login', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ username, password }),
            });
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
        <Link href="/register">
          <a>Register</a>
        </Link>
      </Layout>
      ;
    </>
  );
}
