import React, { FC, ReactNode, useEffect } from "react";
import { useCookie } from "next-cookie";
import { useRouter } from 'next/router';
import Head from "next/head";
import Header from "../includes/Header";
import BreadCrumbItem from "../shared/BreadCrumbItem";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "@/store/themeSlice";
import { notification } from "antd";
import { isEmpty } from "lodash";
import useTranslation from "next-translate/useTranslation";

interface Props {
  title: string;
  children: ReactNode;
  sideBarItems?: ReactNode;
  breadItems?: any;
  hasSidebar?: boolean;
}

const Layout: FC<Props> = ({
  title = "",
  children,
  breadItems
}) => {
  //***************************
  // Import Hooks
  //***************************

  const { t } = useTranslation("common");
  const dispath = useDispatch();
  const router = useRouter()
  const cookie = useCookie();
  const [api, contextHolder] = notification.useNotification();

  //***************************
  // Store State
  //***************************

  const theme = useSelector((state: any) => state.theme);

  //***************************
  // Define State
  //***************************

  const AppName = process.env.NEXT_PUBLIC_APPNAME;

  //***************************
  // Define Function
  //***************************

  const handleChangeTheme = () => {
    if (theme) dispath(setTheme(false))
    else dispath(setTheme(true))
  };

  const handleLogOut = () => {
    cookie.remove('user');
    api.success({
      message: t('logout_s'),
      placement: "topRight",
    });
    setTimeout(() => {
      router.push("/login")
    }, 1200);
  }

  //***************************
  // Define useEffect
  //***************************

  useEffect(() => {

    if (theme) {
      document?.body.classList.add('light-mode');
      document?.body.classList.remove('dark-mode');
    } else {
      document?.body.classList.add('dark-mode');
      document?.body.classList.remove('light-mode');
    }

  }, [theme]);

  return (
    <div>
      <Head>
        <title>
          {AppName} | {title}
        </title>
      </Head>
      <div className="container-custom">
        <div className="mt-10 pt-10">
          <Header router={router} handleLogOut={handleLogOut} title={title} theme={theme} handleChangeTheme={handleChangeTheme} />
        </div>
        {!isEmpty(breadItems) ? <div>
          <BreadCrumbItem items={breadItems} theme={theme} />
        </div> : null}
        <div>{children}</div>
      </div>
      {contextHolder}
    </div>
  );
};
export default Layout;
