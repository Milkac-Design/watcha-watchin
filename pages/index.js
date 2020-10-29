import Head from 'next/head';
import Layout from '../components/Layout';

export default function Home() {
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
      <Layout>
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
