/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import * as songsService from '../../service/songsService'

import classNames from 'classnames/bind'
import styles from './Chart.module.scss'
import ReactApexChart from 'react-apexcharts'
import SongList from '../../components/SongList'
import SkeletonSong from '../../components/Skeleton/skeletonSong'
import { connect } from 'react-redux'
import { selectSong } from '../../actions'
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

import { HashLoader } from 'react-spinners'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons'

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

const ChartLayout = () => {
  const [loading, setLoading] = useState(false)

  const [songsList, setSongsList] = useState([])
  // eslint-disable-next-line no-unused-vars
  const [songsListWeek, setSongsListWeek] = useState([])
  const [songsListMoth, setSongsListMoth] = useState([])
  const [labels, setLabels] = useState([])

  const [currentHour, setCurrentHour] = useState('')

  //---- label----

  useEffect(() => {
    const interval = () => {
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
      for (let i = 0; i < 24; i++) {
        newLabels.push(`${pastHours(reducedHours(currentTime, i))}:00`)
      }

      newLabels.reverse()
      setLabels(newLabels)

      setCurrentHour(pastHours(reducedHours(currentTime, 23)))
    }
    interval()
    // const update = setInterval(interval, 60 * 60 * 1000)
    // return () => clearInterval(update)
  }, [])

  //---- data----
  const [point1, setPoint1] = useState([])
  const [point2, setPoint2] = useState([])
  const [point3, setPoint3] = useState([])
  const [top1, setTop1] = useState('')
  const [top2, setTop2] = useState('')
  const [top3, setTop3] = useState('')
  useEffect(() => {
    const fetchApi = async () => {
      setLoading(true)
      const songs = await songsService.getSongsFromChart('day')
      const songsWeek = await songsService.getSongsFromChart('week')

      const songsMoth = await songsService.getSongsFromChart('month')

      setPoint1(songs[0].viewsLast24Hours)
      setPoint2(songs[1].viewsLast24Hours)
      setPoint3(songs[2].viewsLast24Hours)
      setTop1(songs[0].name)
      setTop2(songs[1].name)
      setTop3(songs[2].name)
      setSongsList(songs)
      setSongsListWeek(songsWeek)
      setSongsListMoth(songsMoth)
      setTimeout(function () {
        setLoading(false)
      }, 1000)
    }
    fetchApi()
  }, [])

  //-------------------

  const [optionss, setOptions] = useState({})
  const [series, setSeries] = useState([])

  useEffect(() => {
    const fetchApi = async () => {
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
      const sumPoint = Array.from(
        { length: 24 },
        (_, i) => point1[i] + point2[i] + point3[i],
      )

      const calculateLine = (pointArray, sumArray) =>
        sumArray.map((sum, i) =>
          sum !== 0 && pointArray[i]
            ? Math.round((pointArray[i] / sum) * 100)
            : 0,
        )

      const line1 = calculateLine(point1, sumPoint)
      const line2 = calculateLine(point2, sumPoint)
      const line3 = calculateLine(point3, sumPoint)
      if (
        line1.length > 0 &&
        line2.length > 0 &&
        line3.length > 0 &&
        labels.length > 0
      ) {
        // Dữ liệu hợp lệ, thiết lập cấu hình biểu đồ

        const optionss = {
          chart: {
            type: 'line',
          },
          xaxis: {
            categories: labels,
            tickAmount: 10,
          },
          legend: {
            show: false, // Hiển thị hộp chú thích
          },
          yaxis: {
            show: false, // Hiển thị đánh dấu trục y
          },
          stroke: {
            curve: 'smooth',
          },
          // eslint-disable-next-line no-dupe-keys
          chart: {
            zoom: {
              enabled: false,
            },
          },
          grid: {
            row: {
              colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
              opacity: 0.5,
            },
          },
        }
        const series = [
          {
            name: top1,
            data: customSort([...line1], currentHour),

            color: 'rgba(53, 162, 235, 0.5)',
          },
          {
            name: top2,
            data: customSort([...line2], currentHour),

            color: '#27BB9A',
          },

          {
            name: top3,
            data: customSort([...line3], currentHour),

            color: '#D74D4D',
          },
        ]

        setOptions(optionss)
        setSeries(series)
      } else {
        // Dữ liệu không hợp lệ, hiển thị thông báo lỗi hoặc xử lý theo cách khác

        console.error('Dữ liệu không đủ để hiển thị biểu đồ.')
      }
    }
    fetchApi()
  }, [labels, currentHour, point1, point2, point3])

  console.log(labels)
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
            <div className={cx('flex')}>
              <HashLoader loading={true} color={'#8D22C3'} size={50} />
            </div>
          ) : (
            <>
              {/* <div className={cx('flex')}>
                <HashLoader loading={true} color={'#8D22C3'} size={50} />
              </div> */}
              <ReactApexChart
                options={optionss}
                series={series}
                width={'100%'}
                height={'300px'}
              />
            </>
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

export default connect(mapStateToProps, { selectSong })(ChartLayout)
