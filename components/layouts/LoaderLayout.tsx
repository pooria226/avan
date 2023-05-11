import { FC, ReactNode, useEffect } from "react";
import { useCookie } from "next-cookie";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "@/store/loaderSlice";
import { Spin } from "antd";
import Loader from "../shared/Loader";



interface Props {
    children: ReactNode
}


const LoaderLayout: FC<Props> = ({ children }) => {

    //***************************
    // import hooks
    //***************************

    const cookie = useCookie();
    const router = useRouter();
    const dispatch = useDispatch();
    //***************************
    // define useEffect
    //***************************
    const loader = useSelector((state: any) => state.loader);

    useEffect(() => {
        router.events.on("routeChangeStart", () => dispatch(setLoader(true)));
        router.events.on("routeChangeComplete", () => dispatch(setLoader(false)));
    }, [router.isReady]);

    return <>{loader ? <Loader /> : children}</>;
}

export default LoaderLayout






