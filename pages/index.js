import Head from 'next/head';
import Layout from '../components/Layout';
import { isSessionTokenValid } from '../utils/auth';
import nextCookies from 'next-cookies';
import { useState } from 'react';

export default function Home(props) {
  const [users, setUsers] = useState(props.users);

  return (
    <div className="paigeContainer">
      <Head>
        <title>Welcome</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
        <link
          href="https://fonts.googleapis.com/css2?family=Quintessential&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <Layout loggedIn={props.loggedIn}>
        <h1 className="titleStyle">Welcome</h1>
        <div className="container">
          <div className="cardContainer">
            <div className="card">
              <div className="front">
                <h3>flip here</h3>
                <p>bla bla bla</p>
              </div>
              <div className="back">
                <h3>back side</h3>
                <p>dark side of thee mooon</p>
              </div>
            </div>
          </div>
        </div>
        <div className="footerBuffer"></div>
      </Layout>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { getUsers } = await import('../utils/database');
  const users = await getUsers();
  // console.log(users);

  const token = nextCookies(context);

  if (!(await isSessionTokenValid(token.session))) {
    return {
      redirect: {
        destination: '/login?returnTo=/.',
        permanent: false,
      },
    };
  }

  const loggedIn = await isSessionTokenValid(token.session);

  return { props: { loggedIn, users } };
}
