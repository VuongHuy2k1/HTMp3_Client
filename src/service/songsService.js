import { httpRequests } from '../utils'
export const getSongsFromAlbum = async (name) => {
  try {
    const res = await httpRequests.get(`api/media/song-album/${name}/0`)

    return res.item.songs
  } catch (error) {
    console.log(error)
  }
}
export const getSongsFromSinger = async (name) => {
  try {
    const res = await httpRequests.get(`api/media/singer-song/${name}/0`)

    return res.item.songs
  } catch (error) {
    console.log(error)
  }
}
export const getSongsFromLegion = async (name) => {
  try {
    const res = await httpRequests.get(`api/media/song-legion/${name}/0`)

    return res.item
  } catch (error) {
    console.log(error)
  }
}
export const getSongsFromChart = async (type) => {
  try {
    const res = await httpRequests.get(`api/media/get-chart/${type}`)

    return res.item
  } catch (error) {
    console.log(error)
  }
}
