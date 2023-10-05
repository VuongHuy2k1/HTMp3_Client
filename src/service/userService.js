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
  // nhớ bỏ en
  return httpRequests.get(`api/user/auth/${tokenUser}`).then((res) => {
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
  return httpRequests
    .put(`api/user/update-user/${tokenUser}`, params)
    .then((response) => {
      if (response.status !== 401) {
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
          msgBody: 'Sai thông tin',
          msgError: true,
        },
        err,
      }
    })
}
export const changePass = async (params) => {
  const tokenUser = Cookies.get('access_token')

  try {
    const res = await httpRequests
      .put(`api/user/change-password/${tokenUser}`, params)
      .then((res) => {
        return res.data
      })

    return res
  } catch (error) {
    console.log(error)
  }
}
export const sentMail = (user) => {
  return httpRequests
    .post('api/user/forgot-password', user)
    .then((response) => {
      if (response.status !== 401) {
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
          msgBody: 'Sai tai khoan hoac email',
          msgError: true,
        },
        err,
      }
    })
}
export const forgotPass = (user) => {
  return httpRequests
    .post('api/user/verify-reset-password', user)
    .then((response) => {
      if (response.status !== 401) {
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
          msgBody: 'Sai tai khoan hoac email',
          msgError: true,
        },
        err,
      }
    })
}
export const getBill = (id) => {
  return httpRequests.get(`api/bill/${id}`).then((res) => {
    if (res.status !== 401) {
      return res.item
    } else {
      return { user: { username: '' } }
    }
  })
}
