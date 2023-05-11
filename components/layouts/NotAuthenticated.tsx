import { FC, ReactNode, useEffect } from "react";
import { useCookie } from "next-cookie";
import { useRouter } from "next/router";
import { setLoader } from "@/store/loaderSlice";
import { useDispatch } from "react-redux";
import LoaderLayout from "./LoaderLayout";

interface Props {
  children?: ReactNode
}

const NotAuthenticated: FC<Props> = ({
  children,
}) => {

  //***************************
  // import hooks
  //***************************

  const cookie = useCookie();
  const router = useRouter();
  const dispatch = useDispatch()
  //***************************
  // define useEffect
  //***************************


  useEffect(() => {
    dispatch(setLoader(true))
  }, [])


  useEffect(() => {
    if (router && cookie) {
      if (cookie.get("user")) {
        router.replace("/");
      } else {
        dispatch(setLoader(false))
      }
    }
  }, []);

  return <LoaderLayout>{children}</LoaderLayout>;
}
export default NotAuthenticated