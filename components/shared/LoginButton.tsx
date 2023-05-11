import React from 'react'
import { Button, Spin } from 'antd'

import Styles from '@/styles/scss/common/LoginButton.module.scss'
import useTranslation from 'next-translate/useTranslation';

const LoginButton = ({ onClick = () => { }, disabled = false }) => {

    //***************************
    // Import Hooks
    //***************************

    const { t } = useTranslation("common");

    return <Button disabled={disabled} onClick={onClick} className={Styles.btn}>
        {disabled ? <Spin className='button-spin' /> : t('login')}
    </Button>
}



export default LoginButton