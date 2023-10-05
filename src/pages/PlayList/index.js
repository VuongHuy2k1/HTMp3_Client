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
import { RiPlayListLine } from 'react-icons/ri'
const cx = classNames.bind(styles)

function PlayListLayout({
  selectedUserPlayList,
  getPlayListId,
  selectedUserList,
  loadingState,
}) {
  // eslint-disable-next-line no-unused-vars
  const [songsList, setSongsList] = useState([])
  const [playList, setPlayList] = useState([])
  const { playlist_id } = useParams()
  const [loading, setLoading] = useState(false)
  const [loadingMusic, setLoadingMusic] = useState(false)
  const debouncedValue = useDebounce(playlist_id, 30)

  useEffect(() => {
    setLoading(true)
    setLoadingMusic(true)
    if (!debouncedValue.trim()) {
      setSongsList([])
      return
    }
    const fetchApi = async () => {
      const response = await PlayListService.getSongPlayList(debouncedValue)

      getPlayListId(debouncedValue)

      getPlayListId(debouncedValue)

      selectedUserPlayList(response)

      setTimeout(function () {
        setLoading(false)
        setLoadingMusic(false)
      }, 1000)
    }
    fetchApi()
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  useEffect(() => {
    const fetchApi = async () => {
      setLoadingMusic(loadingState)
    }
    fetchApi()
  }, [loadingState])

  return (
    <React.Fragment>
      <div className={cx('main-view-container', 'scroll')}>
        <div className={cx('header-container')}>
          <div className={cx('left-top')}>
            {loading ? (
              <Skeleton width={220} height={200} padding={8} />
            ) : (
              <>
                {selectedUserList[0] !== undefined ? (
                  <img
                    alt=""
                    src={
                      selectedUserList[0].links === undefined
                        ? selectedUserList[0].img
                        : selectedUserList[0].links.images[1].url
                    }
                  ></img>
                ) : (
                  <img
                    alt=""
                    src="https://media.proprofs.com/images/QM/user_images/2734691/1589295044.gif"
                  ></img>
                )}
              </>
            )}
          </div>
          <div className={cx('right-top')}>
            <div className={cx('right-top-content')}>
              <RiPlayListLine className={cx('icon-turn')} />
              <h4>PLAYLIST</h4>
            </div>

            {loading ? (
              <Skeleton width={380} height={30} />
            ) : (
              <span>{playList.name} </span>
            )}

            <span> </span>
          </div>
        </div>
        <div className={cx('container')}>
          {selectedUserList.length <= 0 ? (
            <div className={cx('container-none')}>
              <i> </i>
              <span>Không có bài hát trong playlist của bạn</span>
            </div>
          ) : (
            <>
              <SongListHeader />
              {loadingMusic ? (
                <SkeletonSong
                  num={selectedUserList.length}
                  className={cx('skeleton')}
                />
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
  return {
    selectedUserList: state.selectedUserList,
    loadingState: state.selectedLoad,
  }
}

export default connect(mapStateToProps, {
  selectedUserPlayList,
  getPlayListId,
})(PlayListLayout)
