import { atom } from "recoil";

export const playlistState = atom({
  key: "playlistState",
  default: null,
});
export const playlistIdState = atom({
  // has to be unique
  key: "playlistIdState",
  default: "5ECXvu4g6LgZojf7Ztts9J",
});
