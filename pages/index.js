import Head from 'next/head';
import Layout from '../components/Layout';
import { isSessionTokenValid } from '../utils/auth';
import nextCookies from 'next-cookies';
import Clock from '../components/clock';

export default function Home(props) {
  return (
    <div className="paigeContainer">
      <Head>
        <title>Welcome</title>
        <link rel="icon" href="/logo.png" />
        <link
          href="https://fonts.googleapis.com/css2?family=Quintessential&display=swap"
          rel="stylesheet"
        ></link>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        />
      </Head>
      <Layout loggedIn={props.loggedIn}>
        <div className="background"></div>
        <Clock />
        <h1 className="titleStyle">Welcome</h1>
        <div className="container">
          <div className="cardContainer">
            <div className="card">
              <div className="front">
                <h3>You love movies?</h3>
                <br />
                <p>
                  So does everyone else here
                  <br /> And they are sharing their love and passion
                </p>
              </div>
              <hr></hr>
              <div className="back">
                <h3>Share with the community</h3>
                <br />
                <p>
                  Group of movie lovers sharing their thoughts and experiences
                </p>
              </div>
            </div>
          </div>
          <hr className="hr" />
          <div className="cardContainer">
            <div className="card">
              <div className="front">
                <h3>Join Us</h3>
                <br />
                <p>
                  Share your favourite movies and inspire somebody to watch them
                </p>
              </div>
              <hr />
              <div className="back">
                <h3>Get inspired</h3>
                <br />
                <p>
                  Check out other users lists and find hidden gems they have
                  been watching
                </p>
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
  const token = nextCookies(context);

  // if (!(await isSessionTokenValid(token.session))) {
  //   return {
  //     redirect: {
  //       destination: '/login?returnTo=/.',
  //       permanent: false,
  //     },
  //   };
  // }

  if (!(await isSessionTokenValid(token.session))) {
    return {
      props: {},
    };
  }

  const loggedIn = await isSessionTokenValid(token.session);

  return { props: { loggedIn } };
}
