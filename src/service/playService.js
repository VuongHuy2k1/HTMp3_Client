import { httpRequests } from '../utils'
import Cookies from 'js-cookie'

export const saveAlbum = async (list) => {
  const userId = Cookies.get('userId')

  try {
    const res = await httpRequests.put(
      `api/media/put-current-song/${userId}`,
      list,
    )
    return res.item
  } catch (error) {
    if (error.code === 'ERR_NETWORK') {
      return { message: error.message, isSuccess: false }
    }
    console.log(error)
    return { message: error.response.data, isSuccess: false }
  }
}
export const getLastPlay = async () => {
  const userId = Cookies.get('userId')
  try {
    const res = await httpRequests.get(`api/media/get-last-music/${userId}`)

    return res.item
  } catch (error) {
    console.log(error)
  }
}
