import React, { FC, useState } from "react";
import { Input, Form } from "antd";
import Error from "./Error";

import LightEmail from '@/public/assets/images/svgs/email.svg'
import DarkEmail from '@/public/assets/images/svgs/dark/email.svg'


import Styles from "/styles/scss/common/TextItem.module.scss";

interface Props {
  theme?: boolean;
  value?: string;
  label?: string;
  name?: string;
  isWrong?: boolean;
  help?: string;
  onChange?: any
}

const EmailItem: FC<Props> = ({
  theme,
  value,
  label,
  name,
  isWrong = false,
  help,
  onChange
}) => {

  //***************************
  // Define State
  //***************************
  const [active, setActive] = useState(false);

  //***************************
  // Define Custome Styles
  //***************************

  const labelStyle = {
    zIndex: 1,
    pointerEvents: "none",
    transition: "0.2s ease all",
    transform: "translate(0, 2.1rem) scale(1)",
    marginLeft: 10,
  };
  const floatingLabel = {
    transform: "translate(0, -0.3rem) scale(1)",
    marginLeft: 0,
  };

  //***************************
  // Define function
  //***************************

  const onBlur = () => {
    setActive(false);
  };
  const onFocus = () => {
    setActive(true);
  };

  return (
    <Form.Item
      validateStatus={isWrong ? "error" : ""}
      help={isWrong ? <Error text={help} /> : null}
      colon={false}
      className="mb-4"
    >
      <div style={{ display: "flex", flexFlow: "column-reverse" }}>
        <Input
          onBlur={onBlur}
          onFocus={onFocus}
          type="email"
          name={name}
          className={theme ? Styles.lightInput : Styles.darkInput}
          value={value}
          onChange={(e) => {
            onChange((prev: any) => {
              return {
                ...prev,
                [e.target.name]: e.target.value,
              };
            });
          }}
          suffix={theme ? <LightEmail /> : <DarkEmail />}
        />
        <span
          className={theme ? Styles.lightLabel : Styles.darkLabel}
          style={active || value ? floatingLabel : labelStyle}
        >
          {label}
        </span>
      </div>
    </Form.Item>
  );
}


export default EmailItem  