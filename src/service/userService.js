import { httpRequests } from '../utils'
import Cookies from 'js-cookie'

export const register = (user) => {
  return httpRequests.post('api/user/signup', user).then((response) => {
    if (response.data.isSuccess === true) {
      return response.item.data
    } else {
      return response.data
    }
  })
}
export const login = (user) => {
  return httpRequests
    .post('api/user/login', user)
    .then((response) => {
      if (response.status !== 401) {
        console.log(response)
        return response.data
      } else {
        return {
          user: { username: '' },
          message: { msgBody: 'Error', msgError: true },
        }
      }
    })
    .catch((err) => {
      return {
        message: {
          msgBody: 'Sai tai khoan hoac mat khau',
          msgError: true,
        },
        err,
      }
    })
}
export const logOut = () => {
  Cookies.remove('access_token')
}

export const isAuthen = () => {
  const tokenUser = Cookies.get('access_token')

  return httpRequests.get(`api/user/authen/${tokenUser}`).then((res) => {
    if (res.status !== 401) {
      return res.item
    } else {
      return { user: { username: '' } }
    }
  })
}

export const isLog = () => {
  const tokenUser = Cookies.get('access_token')
  const userId = Cookies.get('userId')
  if (tokenUser === undefined || userId === undefined) {
    return false
  } else {
    return true
  }
}

export const updateInfo = async (params) => {
  const tokenUser = Cookies.get('access_token')
  try {
    const res = await httpRequests.put(
      `api/user/update-user/${tokenUser}`,
      params,
    )
    return res.item
  } catch (error) {
    console.log(error)
  }
}
export const changePass = async (params) => {
  const tokenUser = Cookies.get('access_token')
  try {
    const res = await httpRequests
      .put(`api/user/change-password/${tokenUser}`, params)
      .then((mess) => {
        return mess
      })

    return res.item
  } catch (error) {
    console.log(error)
  }
}
