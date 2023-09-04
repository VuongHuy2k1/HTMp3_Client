import React, { useEffect, useState } from 'react'
import * as songsService from '../../service/songsService'
import * as UserServices from '../../service/userService'
import classNames from 'classnames/bind'
import styles from './Chart.module.scss'
import SongListHeader from '../../components/SongListHeader'
import SongList from '../../components/SongList'
import SkeletonSong from '../../components/Skeleton/skeletonSong'
import { connect } from 'react-redux'
import { selectSong, selectSongByAlbum } from '../../actions'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import ScaleLoader from 'react-spinners/ScaleLoader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPlayCircle } from '@fortawesome/free-solid-svg-icons'

const cx = classNames.bind(styles)

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
)

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      display: true,
      min: 0,
      max: 100,
      ticks: {
        stepSize: 25,
        display: false,
      },
    },
    x: {
      display: true,
      min: 0,
      max: 24,
      ticks: {
        stepSize: 12,
        callback: function (val, index) {
          // Hide every 2nd tick label
          return index % 2 === 0 ? this.getLabelForValue(val) : ''
        },
        color: 'inherit',
      },
      tick: {
        display: false,
      },
    },
  },
  plugins: {
    legend: {
      position: 'none',
      display: false,
    },
    title: {
      display: false,
    },
  },
  stacked: false,
  interaction: {
    mode: 'index',
    intersect: true,
  },
}

const ChartLayout = () => {
  const [loading, setLoading] = useState(false)

  const [songsList, setSongsList] = useState([])
  const [songsListWeek, setSongsListWeek] = useState([])
  const [songsListMoth, setSongsListMoth] = useState([])
  const [labels, setLablels] = useState([])
  const [point1, setPoint1] = useState([])
  const [point2, setPoint2] = useState([])
  const [point3, setPoint3] = useState([])
  const [top1, setTop1] = useState('')
  const [top2, setTop2] = useState('')
  const [top3, setTop3] = useState()
  const [currentHour, setCurrentHour] = useState('')

  //---- label----
  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date()

      const reducedHours = (date, hours) => {
        const newDate = new Date(date)
        newDate.setTime(newDate.getTime() - hours * 60 * 60 * 1000)
        return newDate
      }
      const pastHours = (nowTime) => {
        return nowTime.getHours().toString().padStart(2, '0')
      }

      const newLabels = []
      for (let i = 24; i > 0; i--) {
        newLabels.push(`${pastHours(reducedHours(currentTime, i))}:00`)
      }
      setLablels(newLabels)

      setCurrentHour(pastHours(reducedHours(currentTime, 23)))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  //---- data----
  useEffect(() => {
    const fetchApi = async () => {
      setLoading(true)
      const songs = await songsService.getSongsFromChart('day')
      const songsWeek = await songsService.getSongsFromChart('week')

      const songsMoth = await songsService.getSongsFromChart('month')
      console.log(songsMoth, 1245)
      setPoint1(songs[0].viewsLast24Hours)
      setPoint2(songs[1].viewsLast24Hours)
      setPoint3(songs[2].viewsLast24Hours)
      setTop1(songs[0].name)
      setTop2(songs[1].name)
      setTop3(songs[2].name)
      setSongsList(songs)
      setSongsListWeek(songsWeek)
      setSongsListMoth(songsMoth)
      setLoading(false)
    }
    fetchApi()
  }, [])

  const sumPoint = []
  for (let i = 0; i <= 23; i++) {
    const sum = point1[i] + point2[i] + point3[i]
    sumPoint.push(sum)
  }
  const line1 = []
  for (let i = 0; i <= 23; i++) {
    if (sumPoint[i] !== 0 && point1[i]) {
      const medium = (point1[i] / sumPoint[i]) * 100
      line1.push(Math.round(medium))
    } else {
      line1.push(0)
    }
  }
  const line2 = []
  for (let i = 0; i <= 23; i++) {
    if (sumPoint[i] !== 0 && point2[i]) {
      const medium = (point2[i] / sumPoint[i]) * 100
      line2.push(Math.round(medium))
    } else {
      line2.push(0)
    }
  }
  const line3 = []
  for (let i = 0; i <= 23; i++) {
    if (sumPoint[i] !== 0 && point3[i]) {
      const medium = 100 - line1[i] - line2[i]
      line3.push(Math.round(medium))
    } else {
      line3.push(0)
    }
  }
  //-------------------
  const reverseArray = (arr, startIndex, endIndex) => {
    while (startIndex < endIndex) {
      const temp = arr[startIndex]
      arr[startIndex] = arr[endIndex]
      arr[endIndex] = temp
      startIndex++
      endIndex--
    }
  }

  const customSort = (arr, pivotIndex) => {
    const n = arr.length
    reverseArray(arr, 0, pivotIndex - 1)
    reverseArray(arr, pivotIndex, n - 1)
    reverseArray(arr, 0, n - 1)
    return arr
  }

  const data = {
    labels,
    datasets: [
      {
        label: top1,
        data: customSort([...line1], currentHour),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: top2,
        data: customSort([...line2], currentHour),
        borderColor: '#27BB9A',
        backgroundColor: '#27BB9A',
      },

      {
        label: top3,
        data: customSort([...line3], currentHour),
        borderColor: '#D74D4D',
        backgroundColor: '#D74D4D',
      },
    ],
  }

  return (
    <div className={cx('main-view-container', 'scroll')}>
      <div className={cx('chart-container')}>
        <div className={cx('chart-content')}>
          <h3>#HUTAchart</h3>
          <FontAwesomeIcon
            icon={faPlayCircle}
            className={cx('icon-play')}
          ></FontAwesomeIcon>
        </div>
        <div className={cx('chart')}>
          {loading ? (
            <ScaleLoader loading={true} color={'#8D22C3'} size={300} />
          ) : (
            <Line
              options={options}
              data={data}
              redraw={false}
              updateMode={'active'}
              className={cx('loading-chart')}
            />
          )}
        </div>

        <div className={cx('chart-songs')}>
          {loading ? (
            <SkeletonSong num={16} />
          ) : (
            <SongList
              songs={songsList}
              typeSave={'album'}
              loading={loading}
              charts={true}
            />
          )}
        </div>
      </div>

      <div className={cx('chart-all')}>
        <div className={cx('bg-blur')}></div>
        <div className={cx('bg-alpha')}></div>
        <div className={cx('content-chart-all')}>
          <p>BẢNG XẾP HẠNG</p>
        </div>
        <div className={cx('container-chart-all')}>
          <div className={cx('chart-mini')}>
            <div className={cx('content-chart-mini')}>
              <p>Tuần</p>
              <span>
                <FontAwesomeIcon icon={faPlayCircle}></FontAwesomeIcon>
              </span>
            </div>
            {loading ? (
              <SkeletonSong num={16} />
            ) : (
              <SongList
                songs={songsListMoth}
                typeSave={'album'}
                loading={loading}
                charts={true}
                mini={true}
              />
            )}
          </div>
          <div className={cx('chart-mini')}>
            <div className={cx('content-chart-mini')}>
              <p>Tháng</p>
              <span>
                <FontAwesomeIcon icon={faPlayCircle}></FontAwesomeIcon>
              </span>
            </div>
            {loading ? (
              <SkeletonSong num={16} />
            ) : (
              <SongList
                songs={songsList}
                typeSave={'album'}
                loading={loading}
                charts={true}
                mini={true}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    selectedSongPlay: state.selectedSongPlay,
    selectList: state.selectedSongList,
  }
}

export default connect(mapStateToProps, { selectSong, selectSongByAlbum })(
  ChartLayout,
)
