import React, { FC, ReactNode } from "react";
import { Button } from "antd";

import Styles from '@/styles/scss/common/HeaderButton.module.scss'

interface Props {
    icon?: ReactNode;
    onClick(): void;
    theme: boolean
}

const HeaderButton: FC<Props> = ({ onClick, icon, theme = true }) => {
    return <Button onClick={onClick} className={theme ? Styles.lightButton : Styles.darkButton}>
        {icon}
    </Button>
}

export default HeaderButton