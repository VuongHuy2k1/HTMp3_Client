const config = {
  notFound: '*',
  home: '/',
  chart: '/chart',
  album: '/album/:id',
  allAlbum: '/album/:type/all',
  allSinger: '/singer',

  search: `/search/:name`,

  accoutInfor: '/account/infor',
  accoutEdit: '/account/edit',
  accoutChange: '/account/change',

  userLogin: '/user/login',
  userRegister: '/user/register',
  playList: '/playlist/:playlist_id/:playlist_name',
}
export default config
