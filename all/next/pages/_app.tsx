import "../styles/globals.css";
import type { AppProps } from "next/app";
import UserContext from "../lib/Context";
import { Navbar } from "../components/Navbar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserContext.Provider value="">
      <Navbar />
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}
