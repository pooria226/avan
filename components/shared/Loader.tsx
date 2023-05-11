import React from 'react'
import { Spin } from 'antd'

import Styles from '@/styles/scss/common/Loader.module.scss'

const Loader = () => {
    return <div className={Styles.loader}>
        <Spin size='large' />
    </div>
}



export default Loader