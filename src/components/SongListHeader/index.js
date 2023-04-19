import classNames from "classnames/bind";
import styles from "./SongListHeader.module.scss";
import React from "react";
import ReactDOM from "react-dom";
const cx = classNames.bind(styles);
const SongListHeader = () => {
  return (
    <div className={cx("header")}>
      <div className={cx("index")}></div>
      <div className={cx("name")}>Bài hát</div>
      <div className={cx("author")}>Tác giả</div>
      <div className={cx("selector")}>
        <i className="fas fa-chevron-down"></i>
      </div>
    </div>
  );
};

export default SongListHeader;
