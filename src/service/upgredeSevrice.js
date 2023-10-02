import { httpRequests } from '../utils'
export const getUpgredePackage = async () => {
  try {
    const res = await httpRequests.get(`api/package`)

    return res.item.packages
  } catch (error) {
    console.log(error)
  }
}

export const completedUpgrede = async (bill) => {
  try {
    const response = await httpRequests.post(`api/bill/new`, bill)

    return response
  } catch (error) {
    if (error.code === 'ERR_NETWORK') {
      return { message: error.message, isSuccess: false }
    }
    console.log(error)
    return { message: error, isSuccess: false }
  }
}
