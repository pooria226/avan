import React from "react";
import Styles from "/styles/scss/common/Error.module.scss";
import ErrorIcon from "/public/assets/images/svgs/error-icon.svg";


const Error = ({ text = '' }) => {
  return (
    <span className={Styles.wrapper}>
      <ErrorIcon />
      <span className="pl-2">{text}</span>
    </span>
  );
}


export default Error