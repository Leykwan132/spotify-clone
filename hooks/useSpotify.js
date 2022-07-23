import { useSession, signIn } from "next-auth/react";
import React, { useEffect } from "react";
import spotifyApi from "../lib/spotify";
const useSpotify = () => {
  const { data: session, status } = useSession();
  useEffect(() => {
    if (session) {
      // if the refresh access token attempt failed, direct the user to signIn()
      if (session.error === "RefreshAccessTokenError") {
        signIn();
      }
      spotifyApi.setAccessToken(session.user.accessToken);
    }
  }, [session]);
  return spotifyApi;
};

export default useSpotify;
