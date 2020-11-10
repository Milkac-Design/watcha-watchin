import Head from 'next/head';
import Layout from '../components/Layout';
import { isSessionTokenValid } from '../utils/auth';
import nextCookies from 'next-cookies';

export default function Home(props) {
  return (
    <div className="paigeContainer">
      <Head>
        <title>Watcha Watchin</title>
        <link rel="icon" href="/favicon.ico" />
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
                <li>User One</li>
                <li>User Two</li>
                <li>User Three</li>
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

  return { props: { loggedIn } };
}
