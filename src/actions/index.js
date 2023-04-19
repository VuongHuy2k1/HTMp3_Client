//song

export const selectSong = (song) => {
  return {
    type: "SONG_SELECTED",
    payload: song,
  };
};
export const selectSongPlay = (song) => {
  return {
    type: "SONG_SELECTED_PLAY",
    payload: song,
  };
};

export const selectSongById = (_id) => {
  return {
    type: "SONG_SELECTED_BY_ID",
    payload: _id,
  };
};

export const setPlayerState = (val) => {
  return {
    type: "PLAYER_STATE_SELECTED",
    payload: val,
  };
};

export const setVolume = (val) => {
  return {
    type: "SET_VOLUME",
    payload: val,
  };
};

export const setDuration = (val) => {
  return {
    type: "SET_DURATION",
    payload: val,
  };
};

export const setCurrentTime = (val) => {
  return {
    type: "SET_CURRENT_TIME",
    payload: val,
  };
};

export const setTime = (val) => {
  return {
    type: "SET_CURRENT_TIME",
    payload: val,
  };
};
export const setCurrentLocation = (val) => {
  return {
    type: "SET_CURRENT_LOCATION",
    payload: val,
  };
};

//song for Album
export const selectSongByAlbum = (song) => {
  return {
    type: "SONG_SELECTED_BY_ALBUM",
    payload: song,
  };
};


export const chooseAlbum = (val) => {
  return {
    type: "CHOOSE_ALBUM",
    payload: val,
  };
};
export const selectListPlayer = (list) => {
  return {
    type: "LIST_SELECTED_PLAYER",
    payload: list,
  };
};
//albums
export const selectType = (type) => {
  return {
    type: "TYPE_SELECTED",
    payload: type,
  };
};

export const selectAlbum = (album) => {
  return {
    type: "ALBUM_SELECTED",
    payload: album,
  };
};
export const selectAlbumById = (_id) => {
  return {
    type: "ALBUM_SELECTED_BY_ID",
    payload: _id,
  };
};

export const getAlbum = (album) => {
  return {
    type: "GET_ALBUM",
    payload: album,
  };
};
export const getAlbumSongs = (songs) => {
  return {
    type: "GET_ALBUM_SONGS",
    payload: songs,
  };
};
//logout
export const logOut = (val) => {
  return {
    type: "LOG_OUT",
    payload: val,
  };
};
//setStatus
export const setStatus = (val) => {
  return {
    type: "SET_STATUS",
    payload: val,
  };
};
//focus
export const setFocus = (val) => {
  return {
    type: "ON_FOCUS",
    payload: val,
  };
};

export const setToken = (val) => {
  return {
    type: "SET_TOKEN",
    payload: val,
  };
};
//userPlaylist
export const changePlaylist = (val) => {
  return {
    type: "ADD_PLAYLIST",
    payload: val,
  };
};
export const addSong = (val) => {
  return {
    type: "ADD_SONG",
    payload: val,
  };
};
export const getPlayListId = (val) => {
  return {
    type: "GET_PLAYLIST_ID",
    payload: val,
  };
};
export const selectedUserPlayList = (val) => {
  return {
    type: "SELECTED_USER_PLAY_LIST",
    payload: val,
  };
};
//saveSong
export const selectedTypeSave = (type) => {
  return {
    type: "SELECTED_TYPE_SAVE",
    payload: type,
  };
};
