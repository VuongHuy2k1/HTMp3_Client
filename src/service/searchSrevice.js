import { httpRequests } from '../utils'
export const search = async (name, page) => {
  try {
    const res = await httpRequests.get('api/media/search-song', {
      params: {
        name,
        page,
      },
    })

    return res.item
  } catch (error) {
    console.log(error)
  }
}
