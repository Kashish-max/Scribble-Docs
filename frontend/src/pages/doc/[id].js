import { useState, useEffect, use } from "react";
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux";
import Header from "@/components/Header";

import { fetchData } from "@/components/helpers";
import Loading from "@/components/Loading";
import { selectAuthState, selectUser, selectIsNewDoc, setAuthState, setUser, setIsNewDoc } from "@/store/authSlice";

const Doc = () => {
    const router = useRouter();
    const { id } = router.query;

    const authState = useSelector(selectAuthState);
    const user = useSelector(selectUser);
    const isNewDoc = useSelector(selectIsNewDoc);
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(true);
    const loginURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/user`;
    const loginConfig = { withCredentials: true };
  
    useEffect(() => {
        fetchData(loginURL, loginConfig).then((data) => {
            setTimeout(async () => {
                if(data && data.email) {
                    dispatch(setAuthState(true));
                    dispatch(setUser(data));
                    // let docValid = await fetchData(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/doc/validate/${id}`, loginConfig);
                    // const err = docValid?.response?.status;
                    // if(( err != "404") && !isNewDoc) {
                    if(!isNewDoc) {
                        verifyUserAuthorization();
                        dispatch(setIsNewDoc(false));
                    } else {
                        setIsLoading(false);
                        // window.location.href = "/docs";
                    }    
                } else router.push("/login");
            }, 1000)
        }).catch(err => {
            router.push("/login");
            setIsLoading(false);
        });
    }, [authState]);

    const verifyUserAuthorization = async () => {
        fetchData(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/doc/users/${id}`, loginConfig).then((data) => {
            if(data && data.users) {
                const userAuthorized = data.users.find(
                    (docUser) => docUser.email === user.email
                );
                if(!userAuthorized) {
                    console.log("User not Authorised to access the document.");
                    window.location.href = "/docs";
                } else {
                    console.log("User Authorised to access the document.");
                    setIsLoading(false);
                }
            } 
        });
    }
  
    if(isLoading) return (
        <Loading />
    )    

    if (typeof window !== "undefined") {
        const Editor = require("@/components/Editor").default;
    
        return (
          <div>
            <Header search={false} />
            <div className="max-w-7xl h-screen mx-auto py-4 pt-24">
                <Editor />
            </div>
          </div>
        );
    }

    return null;
}
    
export default Doc;