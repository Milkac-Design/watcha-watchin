import Head from 'next/head';
import Layout from '../components/Layout';
import { isSessionTokenValid } from '../utils/auth';
import nextCookies from 'next-cookies';
import { useState } from 'react';
import Link from 'next/link';

export default function Users(props) {
  const [users, setUsers] = useState(props.users);

  return (
    <div className="paigeContainer">
      <Head>
        <title>Users</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
        <link
          href="https://fonts.googleapis.com/css2?family=Quintessential&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <Layout loggedIn={props.loggedIn}>
        <h1 className="titleStyle">Watcha Watchin?</h1>
        <div className="outsideContainer">
          <div className="userListStyle">
            <h2>Users</h2>
            <div className="userListContainer">
              <ul className="listItemStyle">
                {users.map((user) => {
                  return (
                    <li>
                      <Link href={`/${user.id}`}>
                        <a>{user.username}</a>
                      </Link>
                    </li>
                  );
                })}
              </ul>
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
