import { Link } from 'react-router-dom'
import React from 'react'
import ReactDOM from 'react-dom'
import { useEffect, useState } from 'react'
import ListItem from './ListItem'

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

import styles from './ListItem.module.scss'
import classNames from 'classnames/bind'
const cx = classNames.bind(styles)

const List = ({ albums = [], type = [] }) => {
  const typeTags = type.map((type, index) => {
    return <ListItem albums={albums} typee={type} key={index} />
  })

  return <div>{typeTags}</div>
}

export default List
