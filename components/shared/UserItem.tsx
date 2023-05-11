import React, { FC } from 'react'
import { Button, Popconfirm } from 'antd'
import Link from 'next/link';
import LightPen from '@/public/assets/images/svgs/pen.svg'
import LightTrash from '@/public/assets/images/svgs/trash.svg'
import DarkPen from '@/public/assets/images/svgs/dark/pen.svg'
import DarkTrash from '@/public/assets/images/svgs/dark/trash.svg'
import useTranslation from 'next-translate/useTranslation';

import Styles from '@/styles/scss/common/UserItem.module.scss'

interface Props {
    data: { email: string, id: string }
    theme: boolean
    onClick(): void
}

const UserItem: FC<Props> = ({ theme = true, data, onClick }) => {
    //***************************
    // Import Hooks
    //***************************

    const { t } = useTranslation("common");

    return <div className={theme ? Styles.lightWrapper : Styles.darkWrapper}>
        <div className='flex justify-between items-center'>
            <div>
                <p>
                    {data?.email}
                </p>
            </div>
            <div className='flex gap-5'>
                <Link href={`/${data?.id}`}>
                    <Button>
                        {theme ? <LightPen /> : <DarkPen />}
                    </Button>
                </Link>

                <Popconfirm
                    title={t('delete_user')}
                    description={t('sure')}
                    onConfirm={onClick}
                    okText={t('yes')}
                    cancelText={t('no')}
                >
                    <Button >
                        {theme ? <LightTrash /> : <DarkTrash />}
                    </Button>
                </Popconfirm>

            </div>
        </div>
    </div>
}


export default UserItem