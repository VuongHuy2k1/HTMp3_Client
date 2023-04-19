import { combineReducers } from "redux";

//songsReducer

const selectedSongPlayReducer = (selectedSongPlay = 0, action) => {
  if (action.type === "SONG_SELECTED") {
    return action.payload;

  }
  if (action.type === "SONG_SELECTED_BY_ID") {
    return action.payload;

  }
  return selectedSongPlay;

};


const playerStateReducer = (playerState = 0, action) => {
  if (action.type === "PLAYER_STATE_SELECTED" && !action.payload) {
    return (playerState + 1) % 2;
  } else if (action.type === "PLAYER_STATE_SELECTED" && action.payload) {
    return action.payload;
  }
  return playerState;
};

const volumeReducer = (volume = 100, action) => {
  if (action.type === "SET_VOLUME") {
    return action.payload;
  }
  return volume;
};

const durationReducer = (duration = 0, action) => {
  if (action.type === "SET_DURATION") {
    return action.payload;
  }
  return duration;
};

const currentLocationReducer = (loc = 0, action) => {
  if (action.type === "SET_CURRENT_LOCATION") {
    return action.payload;
  }
  return loc;
};
const timeReducer = (time = 0, action) => {
  if (action.type === "SET_TIME") {
    return action.payload;
  }
  return time;
};
//songlistReducer
const selectedSongListReducer = (selectedSongList = [], action) => {
  if (action.type === "SONG_SELECTED_BY_ALBUM") {
    return action.payload;
  }

  return selectedSongList;
};

const typeAlbumReducer = (type = [], action) => {
  if (action.type === "TYPE_SELECTED") {
    return action.payload;
  }

  return type;
};

//albumReducer

const selectedAlbumIdReducer = (selectedAlbumId = [], action) => {
  if (action.type === "ALBUM_SELECTED") {
    return action.payload;
  }
  return selectedAlbumId;
};

//logOutReducer
const logOutReducer = (val = 0, action) => {
  if (action.type === "ALBUM_SELECTED") {
    return action.payload;
  }
  return val;
};

//getStatus
const getStatusReducer = (status = 0, action) => {
  if (action.type === "SET_STATUS") {
    return action.payload;
  }
  return status;
};

//getFocus
const getFocus = (focus = 0, action) => {
  if (action.type === "ON_FOCUS") {
    return action.payload;
  }
  return focus;
};
const setToken = (token = 0, action) => {
  if (action.type === "SET_TOKEN") {
    return action.payload;
  }
  return token;
};

//userPlayList

const getUserPlaylist = (userPlaylist = [], action) => {
  if (action.type === "ADD_PLAYLIST") {
    return action.payload;
  }
  return userPlaylist;
};
const addSong = (songAdd = [], action) => {
  if (action.type === "ADD_SONG") {
    return action.payload;
  }
  return songAdd;
};
const getPlaylistId = (playlistId = 0, action) => {
  if (action.type === "GET_PLAYLIST_ID") {
    return action.payload;
  }
  return playlistId;
};
const selectedUserPlayListReduct = (selectedUserList = [], action) => {
  if (action.type === "SELECTED_USER_PLAY_LIST") {
    return action.payload;
  }
  return selectedUserList;
};


//saveSong
const selectedTypeSaveReducer = (selectedType = 0, action) => {
  if (action.type === "SELECTED_TYPE_SAVE") {
    return action.payload;
  }
  return selectedType;
};



export default combineReducers({
  selectedSongList: selectedSongListReducer,
  selectedAlbumId: selectedAlbumIdReducer,
  selectedSongPlay: selectedSongPlayReducer,
  playerState: playerStateReducer,
  volume: volumeReducer,
  time: timeReducer,
  type: typeAlbumReducer,
  duration: durationReducer,
  token: setToken,
  currentLocation: currentLocationReducer,
  val: logOutReducer,
  focus: getFocus,
  status: getStatusReducer,
  userPlaylist: getUserPlaylist,
  songAdd: addSong,
  playlistId: getPlaylistId,
  selectedUserList: selectedUserPlayListReduct,
  selectedType: selectedTypeSaveReducer,
});
