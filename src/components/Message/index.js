import React from "react";
// import classNames from "classnames/bind";
// import styles from "./User.module.scss";
// const cx = classNames.bind(styles);

const getStyles = (props) => {
  let baseClass = "alert ";
  if (props.message.msgError) baseClass = baseClass + "alert-danger";
  else baseClass = baseClass + "alert-success";
  return baseClass + " text-center";
};
function Message(props) {
  return (
    <div className={getStyles(props)} role="alert">
      {props.message.msgBody}
    </div>
  );
}

export default Message;
