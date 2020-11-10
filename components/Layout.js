import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

export default function Layout(props) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <Header loggedIn={props.loggedIn} />

      <main className="mainStyle">{props.children}</main>

      <Footer />
    </>
  );
}
