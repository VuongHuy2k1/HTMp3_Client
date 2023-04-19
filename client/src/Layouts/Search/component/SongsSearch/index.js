import classNames from "classnames/bind";
import styles from "./Style.module.scss";
import SongList from "../../../../SongList";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function SongsSearch({ data = [] }) {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("list-left")}>
        <SongList songs={data} />
      </div>
      <div className={cx("list-right")}>
        <SongList songs={data} />
      </div>
    </div>
  );
}

export default SongsSearch;
