import React from 'react'
import { Breadcrumb } from 'antd'



import Styles from '@/styles/scss/common/BreadCrumbItem.module.scss'

const BreadCrumbItem = ({ theme = true, items = [] }) => {
    return <div className={theme ? Styles.lightWrapper : Styles.darkWrapper}>
        <Breadcrumb
            items={items}
        />
    </div>
}


export default BreadCrumbItem



