import {
  faCheckCircle,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import styles from "./SearchItem.module.scss";
import { Link } from "react-router-dom";
import { chooseAlbum } from "../../actions";
const cx = classNames.bind(styles);

function SearchSong({ songs }) {
  return (
    <>
      <Link to={`/search/${songs.name}/all`}>
        <div className={cx("wrapper")}>
          <div className={cx("name-search")}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <h4 className={cx("text-name")}>
              <span>{songs.name}</span>
            </h4>
          </div>
        </div>
      </Link>
    </>
  );
}

export default SearchSong;
