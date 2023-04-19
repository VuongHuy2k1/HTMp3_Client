import { httpRequests } from "../utils";
import Cookies from "js-cookie";

export const saveAlbum = async (list) => {
  const userId = Cookies.get("userId");

  try {
    const res = await httpRequests.put(
      `api/media/post-last-album/${userId}`,
      list
    );
    return res;
  } catch (error) {
    if (error.code === "ERR_NETWORK") {
      return { message: error.message, isSuccess: false };
    }
    console.log(error);
    return { message: error.response.data, isSuccess: false };
  }
};
export const getLastPlay = async () => {
  const userId = Cookies.get("userId");
  try {
    const res = await httpRequests.get(`api/media/get-last-music/${userId}`);
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
};
