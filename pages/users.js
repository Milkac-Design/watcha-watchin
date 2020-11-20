import Head from 'next/head';
import Layout from '../components/Layout';
import { isSessionTokenValid } from '../utils/auth';
// import {deleteUser} from '../utils/database';
import nextCookies from 'next-cookies';
import { useState } from 'react';
import Link from 'next/link';
import { followUser, getFollowers } from '../components/AddFollowers';

export default function Users(props) {
  const [users, setUsers] = useState(props.users);
  const [followers, setFollowers] = useState(getFollowers());
  const followed = followers.map((follow) => follow.id);

  return (
    <div className="paigeContainer">
      <Head>
        <title>Users</title>
        <link rel="icon" href="/logo.png" />
        <link
          href="https://fonts.googleapis.com/css2?family=Quintessential&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <Layout loggedIn={props.loggedIn}>
        <div className="background"></div>
        <h1 className="titleStyle">Watcha Watchin?</h1>
        <div className="outsideContainer">
          <div className="userListStyle">
            <h2>Users</h2>
            {props.id === 1 ? (
              <div className="userListContainer">
                <ul className="listItemStyle">
                  {users.map((user) => {
                    if (user.id !== 1) {
                      return (
                        <li>
                          <Link href={`/${user.id}`}>
                            <a>{user.username}</a>
                          </Link>
                          <button
                            className="removeUserButtonStyle"
                            onClick={async (e) => {
                              await fetch(`/api/users`, {
                                method: 'DELETE',
                                body: JSON.stringify(user.id),
                              });
                              window.location.href = `/users`;
                            }}
                          >
                            remove user
                          </button>
                        </li>
                      );
                    } else {
                      return (
                        <li>
                          <Link href={`/${user.id}`}>
                            <a>{user.username}</a>
                          </Link>
                        </li>
                      );
                    }
                  })}
                </ul>
              </div>
            ) : (
              <div className="userListContainer">
                <ul className="listItemStyle">
                  {users.map((user) => {
                    return (
                      <li>
                        <Link href={`/${user.id}`}>
                          <a>{user.username}</a>
                        </Link>
                        {followed.includes(user.id) ? (
                          <button
                            className="removeUserButtonStyle"
                            onClick={(e) => {
                              followUser(user.id);
                              window.location.reload();
                            }}
                          >
                            unfollow
                          </button>
                        ) : (
                          <button
                            className="followUserButtonStyle"
                            onClick={(e) => {
                              followUser(user.id);
                              window.location.reload();
                            }}
                          >
                            follow
                          </button>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="footerBuffer"></div>
      </Layout>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { getUsers } = await import('../utils/database');
  const { getSessionByToken } = await import('../utils/database');
  const users = await getUsers();

  const token = nextCookies(context);
  const id = await getSessionByToken(token.session);

  if (!(await isSessionTokenValid(token.session))) {
    return {
      redirect: {
        destination: '/login?returnTo=/.',
        permanent: false,
      },
    };
  }

  const loggedIn = await isSessionTokenValid(token.session);

  return { props: { loggedIn, users, id: id.userid } };
}
