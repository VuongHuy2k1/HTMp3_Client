import React from 'react'

import ListItem from './ListItem'

const List = ({ albums = [], type = [] }) => {
  const typeTags = type.map((type, index) => {
    return <ListItem albums={albums} typee={type} key={index} />
  })

  return <div>{typeTags}</div>
}

export default List
