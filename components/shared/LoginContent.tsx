import React, { FC } from "react";
import EmailItem from "./EmailItem";
import PasswordItem from "./PasswordItem";
import LoginButton from "./LoginButton";


import Styles from '@/styles/scss/common/LoginContent.module.scss'
import useTranslation from "next-translate/useTranslation";

interface Props {
    inputs?: any
    setInputs?: any
    theme?: boolean
    handleLogin(): void
    isLoading: boolean
}

const LoginContent: FC<Props> = ({ theme = true, inputs, setInputs, handleLogin = () => { }, isLoading = false }) => {

    //***************************
    // Import Hooks
    //***************************

    const { t } = useTranslation("common");

    return <div className={theme ? Styles.lightWrapper : Styles.darkWrapper}>
        <div className="grid grid-cols-12">
            <div className="col-span-12">
                <EmailItem name="email" onChange={setInputs} value={inputs.email} label={t('email')} theme={theme} />
            </div>
            <div className="col-span-12">
                <PasswordItem name="password" onChange={setInputs} value={inputs.password} label={t('password')} theme={theme} />
            </div>
            <div className="col-span-12">
                <LoginButton disabled={isLoading} onClick={handleLogin} />
            </div>
        </div>
    </div>
}

export default LoginContent