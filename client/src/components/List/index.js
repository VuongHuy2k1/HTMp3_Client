import { Link } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom";
import { useEffect, useState } from "react";
import ListItem from "./ListItem";

import styles from "./ListItem.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

const List = ({ albums = [], type = [] }) => {
  const typeTags = type.map((type) => {
    return <ListItem albums={albums} typee={type} />;
  });

  return <div>{typeTags}</div>;
};

export default List;
