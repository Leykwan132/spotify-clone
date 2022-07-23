import { signOut, useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { shuffle } from "lodash";
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistIdState, playlistState } from "../atoms/playlistAtom";
import Songs from "../components/Songs";
import useSpotify from "../hooks/useSpotify";
const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-red-500",
  "from-yellow-500",
  "from-purple-500",
];

const Center = () => {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const [color, setColor] = useState(null);
  // read only version
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);
  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [playlistId]);

  useEffect(() => {
    // call spotify API and fetch the data returned.
    spotifyApi
      .getPlaylist(playlistId)
      .then((data) => {
        setPlaylist(data.body);
      })
      .catch((err) => console.log("Something went wrong!", err));
  }, [spotifyApi, playlistId]);
  console.log(playlist);
  return (
    <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide ">
      {session && (
        <header className="absolute top-5 right-8">
          <div
            className="flex items-center bg-black text-white space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2"
            onClick={signOut}
          >
            <Image
              className="rounded-full h-5 w-5"
              src={session?.user?.image}
              width="50px"
              height="50px"
              alt=""
            />
            <h2>{session?.user.name}</h2>
            <ChevronDownIcon className="h-5 w-5" />
          </div>
        </header>
      )}

      {playlist && (
        <section
          className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}
        >
          <Image
            src={playlist?.images?.[0]?.url}
            alt=""
            width="176px"
            height="176px"
          />
          <div>
            <p>PLAYLIST</p>
            <h1 className="text-2xl md:text-3xl lg:text-5xl">
              {playlist.name}
            </h1>
          </div>
        </section>
      )}
      <div>
        <Songs />
      </div>
    </div>
  );
};

export default Center;
