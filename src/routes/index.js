import config from '../config'

import Home from '../pages/Home'
import Chart from '../pages/Chart'

import Album from '../pages/Album'
import AllAlbum from '../pages/AllAlbum'
import AllSinger from '../pages/AllSinger'

import SearchFull from '../pages/SearchFull'

import PlayList from '../pages/PlayList'

import Infor from '../pages/Infor'
import Edit from '../pages/Edit'
import ChangePass from '../pages/Change'

import Login from '../pages/Login'
import Register from '../pages/Register'

import DefaultUserLayout from '../Layouts/DefaultUserLayout'
import DefaultAccountLayout from '../Layouts/DefaultAccountLayout'

const PublicRoutes = [
  { path: config.home, component: Home },
  { path: config.chart, component: Chart },
]

const PrivateRoutes = [
  { path: config.album, component: Album },
  { path: config.allAlbum, component: AllAlbum },
  { path: config.allSinger, component: AllSinger },
  { path: config.playList, component: PlayList },

  { path: config.search, component: SearchFull },

  { path: config.accoutInfor, component: Infor, layout: DefaultAccountLayout },
  { path: config.accoutEdit, component: Edit, layout: DefaultAccountLayout },
  {
    path: config.accoutChange,
    component: ChangePass,
    layout: DefaultAccountLayout,
  },
]

const AuthRoutes = [
  { path: config.userLogin, component: Login, layout: DefaultUserLayout },
  { path: config.userRegister, component: Register, layout: DefaultUserLayout },
]
export { PublicRoutes, PrivateRoutes, AuthRoutes }
