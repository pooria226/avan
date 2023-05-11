import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { notification } from 'antd';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useAddUserRoleMutation, useGetUserQuery, useGetUserRoleQuery, useRemoveUserRoleMutation } from '@/store/apiSlice';
import Layout from '@/components/layouts/Layout'
import DetailContent from '@/components/shared/DetailContent';
import Authenticated from '@/components/layouts/Authenticated';
import useTranslation from 'next-translate/useTranslation';

import LightHome from '@/public/assets/images/svgs/home.svg'
import DarkHome from '@/public/assets/images/svgs/dark/home.svg'

const Index = () => {

    //***************************
    // Import Hooks
    //***************************

    const router = useRouter();
    const { t } = useTranslation("common");
    const id: string | string[] | undefined = router.query.id
    const [api, contextHolder] = notification.useNotification();
    const { data: user } = useGetUserQuery({ id });
    const { data: roles } = useGetUserRoleQuery({ id });
    const [addUserRole, { isLoading: addLoader, isSuccess: addSuccess }] = useAddUserRoleMutation()
    const [removeUserRole, { isLoading: removeLoader, isSuccess: removeSuccess }] = useRemoveUserRoleMutation()
    //***************************
    // Store State
    //***************************

    const theme = useSelector((state: any) => state.theme);

    //***************************
    // Define State
    //***************************

    const [inputs, setInputs] = useState({
        "ADMIN": { value: "ADMIN", checked: false, defaulted: false },
        "CONTENT_EXPERT": { value: "CONTENT_EXPERT", checked: false, defaulted: false },
        "CONTENT_MANAGER": { value: "CONTENT_MANAGER", checked: false, defaulted: false },
        "COURIER": { value: "COURIER", checked: false, defaulted: false },
        "CUSTOMER": { value: "CUSTOMER", checked: false, defaulted: false },
        "MAINTAINER": { value: "MAINTAINER", checked: false, defaulted: false },
        "SALES_EXPERT": { value: "SALES_EXPERT", checked: false, defaulted: false },
        "SALES_MANAGER": { value: "SALES_MANAGER", checked: false, defaulted: false },
    });

    //***************************
    // Define Function
    //***************************

    const handleChangeRole = (key: string) => {
        setInputs((prev: any) => {
            return { ...prev, [key]: { value: key, checked: !prev[key].checked, defaulted: prev[key].defaulted } }
        });
    }

    const handleFillRole = () => {

        setInputs((prev: any) => {
            const obj = { ...prev };
            Object.keys(obj).map((key) => {
                obj[key] = { value: obj[key].value, checked: false, defaulted: false };
            });
            return obj;
        });

        roles?.userRoles?.roles.map((item: string) => {
            setInputs((prev: any) => {
                const obj = { ...prev };
                obj[item] = { value: item, checked: obj[item].value == item, defaulted: obj[item].value == item };
                return obj;
            })
        });

    }

    const handleAddRole = () => {
        const roles: any = { ...inputs };
        const added: string[] = []
        const removed: string[] = []

        Object.keys(roles).map((key: string) => {
            if (roles[key].checked == true && roles[key].defaulted == false) {
                added.push(roles[key].value)
            }
            if (roles[key].checked == false && roles[key].defaulted == true) {
                removed.push(roles[key].value)
            }
        });

        if (added.length > 0) {
            added.map(async (item) => {
                await addUserRole({ id, role: item })
            })
        }

        if (removed.length > 0) {
            removed.map(async (item) => {
                await removeUserRole({ id, role: item })
            })
        }
    }

    //***************************
    // Define useEffect
    //***************************

    useEffect(() => {
        handleFillRole();
    }, [roles]);
    useEffect(() => {

        if (addSuccess || removeSuccess) {
            router.replace('/')
        }

    }, [addSuccess, removeSuccess])

    return <Layout
        breadItems={[
            {
                title: <Link href='/'>
                    {theme ? <LightHome /> : <DarkHome />}
                </Link>,
            },
            { title: user?.user?.email },
        ]}
        title={t('detail_user')} >
        <Authenticated>
            {contextHolder}
            <DetailContent loader={addLoader || removeLoader} handleAddRole={handleAddRole} handleFillRole={handleFillRole} handleChangeRole={handleChangeRole} inputs={inputs} theme={theme} />
        </Authenticated>
    </Layout >
}


export default Index