import Head from "next/head";
import React, { useEffect, useState } from "react";
import { ListImplants } from "../../components/ListImplants";
import { ConnectToDatabase } from "../../lib/ConnectToDatabase";

export default function ImplantsPage() {
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  async function handleConnectToDatabase() {
    const auth = await ConnectToDatabase();
    console.log(auth);
    setUser(auth);
  }

  useEffect(() => {
    user ? setLoading(false) : CheckLocalStorage();
    setLoading(false);
  }, []);

  function CheckLocalStorage() {
    if (user === null) {
      console.log("No Current User");
      console.log("Checking local storage...");
      const pb_localstorage =
        typeof window !== "undefined"
          ? localStorage.getItem("pocketbase_auth")
          : null;

      const authObject = pb_localstorage ? JSON.parse(pb_localstorage) : "null";
      console.log(authObject.token);
      authObject.token
        ? setUser(authObject.token)
        : console.log("No Object to set");
      return authObject.token ? authObject.token : null;
    }
  }

  if (loading) {
    return "Loading...";
  }

  if (!user) {
    return (
      <div>
        <h1>Unauthenticated</h1>
        <button
          onClick={() => {
            handleConnectToDatabase();
          }}
        >
          Authenticate
        </button>
      </div>
    );
  }

  if (user) {
    return (
      <>
        <Head>
          <title>Mercury</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="container text-center m-auto">
          <ListImplants />
        </div>
      </>
    );
  }
}
