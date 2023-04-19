import { httpRequests } from "../utils";
export const getSongsFromAlbum = async (name) => {
  try {
    const res = await httpRequests.get(`api/media/song-album/${name}/0`);

    return res.song;
  } catch (error) {
    console.log(error);
  }
};
export const getSongsFromSinger = async (name) => {
  try {
    const res = await httpRequests.get(`api/media/singer-song/${name}/0`);

    return res;
  } catch (error) {
    console.log(error);
  }
};
