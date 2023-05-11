import React, { FC } from 'react'
import HeaderButton from '../shared/HeaderButton'

import LightMoon from '@/public/assets/images/svgs/moon.svg'
import DarkMoon from '@/public/assets/images/svgs/dark/moon.svg'
import LightLogout from "@/public/assets/images/svgs/logout.svg"
import DarkLogout from "@/public/assets/images/svgs/dark/logout.svg"
import LightLang from "@/public/assets/images/svgs/language.svg"
import DarkLang from "@/public/assets/images/svgs/dark/language.svg"

import Styles from '@/styles/scss/common/Header.module.scss'

interface Props {
    handleChangeTheme(): void;
    handleLogOut(): void;
    theme: boolean;
    title: string
    router?: any
}

const Header: FC<Props> = ({ handleChangeTheme = () => { }, handleLogOut = () => { }, theme = true, title = '', router }) => {
    console.log(';router.locale', router.locale);

    return <div className='flex justify-between items-center'>
        <div>
            <h1 className={theme ? Styles.lightTitle : Styles.darkTitle}>{title}</h1>
        </div>
        <div className='flex'>
            <div>
                <HeaderButton theme={theme} onClick={handleChangeTheme} icon={theme ? <LightMoon /> : <DarkMoon />} />
            </div>
            <div className='ps-4'>
                <HeaderButton theme={theme} onClick={() => router?.push('/', '/', { locale: router.locale == 'en' ? "fa" : "en" })} icon={theme ? <LightLang /> : <DarkLang />} />
            </div>
            <div className='ps-4'>
                <HeaderButton theme={theme} onClick={handleLogOut} icon={theme ? <LightLogout /> : <DarkLogout />} />
            </div>
        </div>
    </div>
}


export default Header