import { httpRequests } from "../utils";
export const search = async (name, page) => {
  try {
    const res = await httpRequests.get("api/media/searchSong", {
      params: {
        name,
        page,
      },
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};
