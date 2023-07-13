import React, { useEffect, useState } from 'react'
import * as songsService from '../../service/songsService'
import * as albumsSrevice from '../../service/albumsSevrice'
import * as LastPlay from '../../service/playService'
import * as UserServices from '../../service/userService'
import classNames from 'classnames/bind'
import styles from './Chart.module.scss'
import List from '../../components/List'
import ListSinger from '../../components/ListSinger'
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
import faker from 'faker'
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
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
}

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
}

const ChartLayout = ({ selectSong, selectSongByAlbum, selectList }) => {
  const value = UserServices.isLog()
  const [loading, setLoading] = useState(false)

  const [albumsList, setAlbumsList] = useState([])
  const [singerList, setSingerList] = useState([])
  const [typeAlbum, setTypeAlbum] = useState([])

  return (
    <div className={cx('main-view-container', 'scroll')}>
      <Line options={options} data={data} />
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
