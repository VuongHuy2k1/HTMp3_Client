import { httpRequests } from "../utils";
import Cookies from "js-cookie";

export const createPlayList = (playlist) => {
  const userId = Cookies.get("userId");
  return httpRequests
    .post(`api/playlist/create-playlist/${userId}`, playlist)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.code === "ERR_NETWORK") {
        return { message: error.message, isSuccess: false };
      }
      console.log(error);
      return { message: error.response.data, isSuccess: false };
    });
};
export const getPlayList = async () => {
  const userId = Cookies.get("userId");
  try {
    const res = await httpRequests.get(`api/playlist/get-playlist/${userId}`);

    return res;
  } catch (error) {
    console.log(error);
  }
};
export const removePlayList = async (name) => {
  try {
    const res = await httpRequests.remove(
      `api/playlist/delete-playlist/${name}`
    );
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const getSongPlayList = async (playlistId) => {
  try {
    const res = await httpRequests.get(
      `api/playlist/get-song-playlist/${playlistId}`
    );

    return res;
  } catch (error) {
    console.log(error);
  }
};
export const addSong = async (playlistId, songId) => {
  try {
    const res = await httpRequests.put(
      `api/playlist/add-song-playlist/${playlistId}/${songId}`
    );

    return res;
  } catch (error) {
    console.log(error);
  }
};
export const removeSong = async (playlistId, songId) => {
  try {
    const res = await httpRequests.put(
      `api/playlist/delete-song-playlist/${playlistId}/${songId}`
    );

    return res;
  } catch (error) {
    console.log(error);
  }
};
export const changePlayList = (playlistId, playlist) => {
  return httpRequests
    .put(`api/playlist/update-playlist-img/${playlistId}`, playlist)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.code === "ERR_NETWORK") {
        return { message: error.message, isSuccess: false };
      }
      console.log(error);
      return { message: error.response.data, isSuccess: false };
    });
};
