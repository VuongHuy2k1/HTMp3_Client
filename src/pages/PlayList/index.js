import React from 'react'
import SongList from '../../components/SongList'
import SongListHeader from '../../components/SongListHeader'
import { useDebounce } from '../../hooks'
import { connect } from 'react-redux'
import * as PlayListService from '../../service/playListService'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import classNames from 'classnames/bind'
import styles from './PlayList.module.scss'
import { selectedUserPlayList, getPlayListId } from '../../actions'
import SkeletonSong from '../../components/Skeleton/skeletonSong'
import Skeleton from 'react-loading-skeleton'
const cx = classNames.bind(styles)

function PlayListLayout({
  selectedUserPlayList,
  getPlayListId,
  selectedUserList,
}) {
  const url = 'http://localhost:8989/img/'
  const [songsList, setSongsList] = useState([])
  const [playList, setPlayList] = useState([])
  const { playlist_id } = useParams()
  const [loading, setLoading] = useState(false)
  const debouncedValue = useDebounce(playlist_id, 30)

  useEffect(() => {
    setLoading(true)
    if (!debouncedValue.trim()) {
      setSongsList([])
      return
    }
    const fetchApi = async () => {
      const response = await PlayListService.getSongPlayList(debouncedValue)

      getPlayListId(debouncedValue)

      selectedUserPlayList(response)
      setLoading(false)
    }
    fetchApi()
  }, [debouncedValue])

  useEffect(() => {
    if (!debouncedValue.trim()) {
      setPlayList([])
      return
    }
    const fetchApi = async () => {
      const response = await PlayListService.getPlayList()

      for (let i = 0; i <= response.length; i++) {
        if (debouncedValue === response[i]._id) {
          return setPlayList(response[i])
        }
      }
    }
    fetchApi()
  }, [debouncedValue])

  return (
    <React.Fragment>
      <div className={cx('main-view-container', 'scroll')}>
        <div className={cx('header-container')}>
          <div className={cx('left-top')}>
            {playList.img === undefined ? (
              <>
                <img
                  alt=""
                  src="https://media.proprofs.com/images/QM/user_images/2734691/1589295044.gif"
                ></img>
              </>
            ) : (
              <>
                <img src={url + playList.img} alt=""></img>
              </>
            )}
          </div>
          <div className={cx('right-top')}>
            <h4>PLAYLIST</h4>
            {loading ? <Skeleton width={420} /> : <span>{playList.name} </span>}

            <span> </span>
          </div>
        </div>
        <div className={cx('container')}>
          {songsList === undefined ? (
            <>
              <span>Danh sách trống</span>
            </>
          ) : (
            <>
              <SongListHeader />
              {loading ? (
                <SkeletonSong num={10} />
              ) : (
                <SongList
                  songs={selectedUserList}
                  typee={true}
                  typeSave="playlist"
                  playlistId={debouncedValue}
                />
              )}
            </>
          )}
        </div>
      </div>
    </React.Fragment>
  )
}

const mapStateToProps = (state) => {
  return { selectedUserList: state.selectedUserList }
}

export default connect(mapStateToProps, {
  selectedUserPlayList,
  getPlayListId,
})(PlayListLayout)
