import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useDeleteUserMutation, useGetUsersQuery } from '@/store/apiSlice';
import Layout from '@/components/layouts/Layout'
import IndexContent from '@/components/shared/IndexContent'
import Authenticated from '@/components/layouts/Authenticated';
import { notification } from 'antd';
import useTranslation from "next-translate/useTranslation";

import LightHome from '@/public/assets/images/svgs/home.svg'
import DarkHome from '@/public/assets/images/svgs/dark/home.svg'

const Index = () => {

    //***************************
    // Import Hooks
    //***************************

    const router = useRouter();
    const [api, contextHolder] = notification.useNotification();
    const { data: users, isError, } = useGetUsersQuery();
    const [deleteUser] = useDeleteUserMutation();
    const { t } = useTranslation("common");

    //***************************
    // Store State
    //***************************

    const theme = useSelector((state: any) => state.theme);

    //***************************
    // Define Fucntion
    //***************************

    const handleDeleteUser = async (id: any) => {
        const result: any = await deleteUser({ id });
        if (result?.data.removeUser == 'Deleted Succesfully')
            api.success({
                message: t('delete_s'),
                placement: "topRight",
            });
    }

    return <Layout
        breadItems={[
            {
                title: <Link href='/'>
                    {theme ? <LightHome /> : <DarkHome />}
                </Link>,
            },
            { title: "" },
        ]}
        title={t('users')} >
        <Authenticated>
            {contextHolder}
            <IndexContent router={router} isError={isError} handleDeleteUser={handleDeleteUser} users={users?.users} theme={theme} />
        </Authenticated>
    </Layout >
}


export default Index