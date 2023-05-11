import React, { FC } from "react";
import { Form } from "antd";

import Style from "/styles/scss/common/CheckboxItem.module.scss";

interface Props {
  label?: string;
  checked?: boolean
  onChange?(): void;
  name?: string
  theme?: boolean
}

const CheckBoxItem: FC<Props> = ({
  label,
  checked,
  onChange = () => { },
  name,
  theme,
}) => {
  return (
    <Form.Item className="mb-4">
      <label className={Style.container}>
        <span className={theme ? Style.lightLabel : Style.darkLabel}
        >
          {label}
        </span>
        <input
          checked={checked}
          name={name}
          onChange={onChange}
          type="checkbox"
        />
        <span
          className={theme ? Style.lightCheckmark : Style.darkCheckmark}
        ></span>
      </label>
    </Form.Item >
  );
}
export default CheckBoxItem