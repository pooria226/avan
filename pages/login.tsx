import React, { useState } from 'react'
import { notification } from 'antd';
import { useSelector } from 'react-redux'
import Layout from '@/components/layouts/Layout'
import { useCookie } from "next-cookie";
import LoginContent from '@/components/shared/LoginContent'
import { useLoginMutation } from '@/store/apiSlice'
import { useRouter } from 'next/router'
import NotAuthenticated from '@/components/layouts/NotAuthenticated';
import useTranslation from 'next-translate/useTranslation';

const Login = () => {

    //***************************
    // Import Hooks
    //***************************
    const cookie = useCookie();
    const router = useRouter();
    const { t } = useTranslation("common");
    const [api, contextHolder] = notification.useNotification();
    const [login, { isLoading }] = useLoginMutation();

    //***************************
    // Store State
    //***************************

    const theme = useSelector((state: any) => state.theme);

    //***************************
    // Define State
    //***************************

    const [inputs, setInputs] = useState({
        email: "mohammadi.pooria.2000@gmail.com",
        password: "As!}87"
    });

    //***************************
    // Define Function
    //***************************

    const handleLogin = async () => {
        const result: any = await login(inputs).unwrap()
        cookie.set("user", result.login?.access_token, { path: "/" });
        api.success({
            message: t('login_s'),
            placement: "topRight",
        });
        setTimeout(() => {
            router.push('/');
        }, 1200);
    }

    return <Layout breadItems={[]} title={t('login')}>
        <NotAuthenticated>
            {contextHolder}
            <LoginContent isLoading={isLoading} handleLogin={handleLogin} inputs={inputs} setInputs={setInputs} theme={theme} />
        </NotAuthenticated>
    </Layout>
}



export default Login