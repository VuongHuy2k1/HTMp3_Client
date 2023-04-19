import SongItem from '../SongItem'
import classNames from 'classnames/bind'
import React from 'react'

import styles from './SongList.module.scss'

const cx = classNames.bind(styles)

const SongList = ({ songs = [], typee, typeSave, playlistId }) => {
  const songTags = songs.map((song, index) => {
    return (
      <SongItem
        song={song}
        key={index}
        index={index}
        type={typee}
        typeSave={typeSave}
        playlistId={playlistId}
      />
    )
  })
  return <div className={cx('warrper')}>{songTags}</div>
}

export default SongList
