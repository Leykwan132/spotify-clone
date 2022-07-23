import type { NextPage } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Center from "../components/Center";
import Sidebar from "../components/Sidebar";
import Player from "../components/Player";
const Home: NextPage = () => (
  <div className="bg-black h-screen overflow-hidden">
    <Head>
      <title>Spotify 2.0</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <main className="flex">
      <Sidebar />
      <Center />
    </main>
    <div className="sticky bottom-0">
      <Player />
    </div>
  </div>
);

export default Home;

// server render the username before.
export const getServerSideProps = async (context: any) => {
  // pre-fetch the session
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  };
};
