import React, { FC } from 'react'
import UserItem from './UserItem'
import { Empty } from 'antd'
import { isEmpty } from 'lodash'
import Styles from '@/styles/scss/common/LoginContent.module.scss'

interface Props {
    users: { results: string[], total: number }
    theme: boolean
    handleDeleteUser(id: string): void
    isError: boolean;
    router?: any
}

const IndexContent: FC<Props> = ({ theme = true, router, users = { results: [], total: 0 }, handleDeleteUser, isError }) => {
    return <div className={theme ? Styles.lightWrapper : Styles.darkWrapper}>
        <div className='grid grid-cols-12 gap-5'>
            {!isEmpty(users) && !isError ? users?.results.map((item: any, index: number) => {
                return <div key={index} className='col-span-12'>
                    <UserItem onClick={() => handleDeleteUser(item.id)} data={item} theme={theme} />
                </div>
            }) : <div className='col-span-12'>
                <Empty />
            </div>}
        </div>
    </div>
}



export default IndexContent