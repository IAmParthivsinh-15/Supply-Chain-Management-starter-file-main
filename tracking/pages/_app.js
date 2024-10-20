import "../styles/globals.css";
import { TrackingProvider } from "../Conetxt/Tracking";
import { NavBar, Footer } from "../Components";
import Head from "next/head"; // Import the Head component

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* Add the Tailwind CSS CDN link in the <Head> component */}
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
      </Head>
      <TrackingProvider>
        <NavBar>
          <Component {...pageProps} />
        </NavBar>
      </TrackingProvider>
      <Footer />
    </>
  );
}
