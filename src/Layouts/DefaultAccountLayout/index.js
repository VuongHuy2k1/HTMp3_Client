import classNames from "classnames/bind";

import styles from "./DefaultAccountLayout.module.scss";
import UserSlider from "./Slider";
import UserFooter from "./Footer";
import UserHeader from "./Header";
const cx = classNames.bind(styles);
function DefaultAccountLayout({ children }) {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <UserHeader />
      </div>
      <div className={cx("container")}>
        <div className={cx("slider")}>
          <UserSlider />
        </div>

        <div className={cx("content")}>{children}</div>
      </div>
      <div className={cx("footer")}>
        <UserFooter />
      </div>
    </div>
  );
}

export default DefaultAccountLayout;
