const config = {
  notFound: "*",
  home: "/",
  album: "/album/:id",
  allAlbum: "/album/:type/all",
  allSinger: "/singer",

  searchAll: "/search/:name/all",
  searchAlbum: "/search/:name/album",
  searchSong: "/search/:name/song",
  searchSinger: "/search/:name/singer",

  accoutInfor: "/account/infor",
  accoutEdit: "/account/edit",
  accoutChange: "/account/change",

  userLogin: "/user/login",
  userRegister: "/user/register",
  playList: "/playlist/:playlist_id/:playlist_name",
};
export default config;
