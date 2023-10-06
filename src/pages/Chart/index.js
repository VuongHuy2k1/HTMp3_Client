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
import { setHours } from 'date-fns'

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
  const [hour, setHour] = useState(0)

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
      const pastHourss = (nowTime) => {
        return nowTime.getHours().toString().padStart(2)
      }
      const newLabels = []
      for (let i = 0; i < 24; i++) {
        newLabels.push(`${pastHours(reducedHours(currentTime, i))}:00`)
      }

      newLabels.reverse()
      setLabels(newLabels)

      setCurrentHour(pastHours(reducedHours(currentTime, 23)))

      setHour(pastHourss(reducedHours(currentTime, 23)))
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
  const [top1Img, setTop1Img] = useState('')
  const [top2Img, setTop2Img] = useState('')
  const [top3Img, setTop3Img] = useState('')
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
      setTop1Img(
        songs[0].links === undefined
          ? songs[0].img
          : songs[0].links.images[1].url,
      )
      setTop2Img(
        songs[1].links === undefined
          ? songs[1].img
          : songs[1].links.images[1].url,
      )
      setTop3Img(
        songs[2].links === undefined
          ? songs[2].img
          : songs[2].links.images[1].url,
      )

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

      const customSort = (arr) => {
        const num = hour

        if (num === 0) {
          console.log('yes')
          return arr
        } else {
          const n = arr.length
          reverseArray(arr, 0, num - 1)
          reverseArray(arr, num, n - 1)
          reverseArray(arr, 0, n - 1)

          return arr
        }
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
      console.log(customSort([...line1]))
      if (
        line1.length > 0 &&
        line2.length > 0 &&
        line3.length > 0 &&
        labels.length > 0
      ) {
        // Dữ liệu hợp lệ, thiết lập cấu hình biểu đồ
        const series = [
          {
            name: top1,
            data: customSort([...line1]),
            color: 'rgb(74, 144, 226)',
            image:
              'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/icon-playing.gif',
          },
          {
            name: top2,
            data: customSort([...line2]),
            color: '#27BB9A',
            image:
              'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/icon-playing.gif',
          },

          {
            name: top3,
            data: customSort([...line3]),
            color: '#D74D4D',
            image:
              'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/icon-playing.gif',
          },
        ]
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
          plotOptions: {
            line: {
              strokeWidth: 0.5, // Điều chỉnh độ dày của đường
            },
            markers: {
              size: 6, // Kích thước của markers (đặt giá trị mong muốn)
              colors: ['#FF5733'], // Màu sắc của markers
              strokeColors: '#fff', // Màu sắc viền của markers
              strokeWidth: 2, // Độ dày viền của markers
              hover: {
                size: 8, // Kích thước markers khi di chuột qua (tùy chọn)
              },
            },
          },
          tooltip: {
            custom: function ({ series, seriesIndex, dataPointIndex, w }) {
              // Lấy tên của dãy dữ liệu dựa trên seriesIndex
              const seriesName = w.globals.seriesNames[seriesIndex]
              const color = w.globals.seriesColors[seriesIndex]
              const imageUrl = () => {
                if (
                  w.globals.seriesColors[seriesIndex] === 'rgb(74, 144, 226)'
                ) {
                  return top1Img
                }
                if (w.globals.seriesColors[seriesIndex] === '#27BB9A') {
                  return top2Img
                }
                if (w.globals.seriesColors[seriesIndex] === '#D74D4D') {
                  return top3Img
                }
              }

              // const seriesImg = series[seriesIndex].data[dataPointIndex].image
              // Lấy giá trị dữ liệu từ dãy dữ liệu tương ứng
              // const imageUrl =
              //   'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/icon-playing.gif'
              const dataValue = series[seriesIndex][dataPointIndex]
              const tooltipStyle = `
             
              background-color:${color} ;
              left: 0px;
              top: 99px;
              opacity: 1;
              color: #fff;
              display: flex;
              align-items: center;
              overflow: hidden;
              width: 100%;
              padding:6px
            `

              return `<div  style="${tooltipStyle}">   <img src="${imageUrl()}" alt="Image" width="40" height="40" style="    object-fit: cover;
              border-radius: 4px;
              margin-right: 5px;
              flex-shrink: 0;"> ${seriesName} ${dataValue}%</div>`
            },
          },
        }

        setOptions(optionss)
        setSeries(series)
      } else {
        // Dữ liệu không hợp lệ, hiển thị thông báo lỗi hoặc xử lý theo cách khác
        console.error('Dữ liệu không đủ để hiển thị biểu đồ.')
      }
    }
    fetchApi()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [labels, currentHour, point1, point2, point3])

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
