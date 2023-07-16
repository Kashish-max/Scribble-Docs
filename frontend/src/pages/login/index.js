import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@material-tailwind/react";
import { UserIcon } from "@heroicons/react/24/solid";

import Loading from '@/components/Loading';
import { fetchData } from '@/components/helpers';
import { selectAuthState, setAuthState, setUser } from "@/store/authSlice";;

export default function Login () {
    const authState = useSelector(selectAuthState);
    const dispatch = useDispatch();

    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true);
    const loginURL = "http://localhost:9000/api/v1/auth/user";
    const loginConfig = { withCredentials: true };

    useEffect(() => {
        if(!authState) {
            fetchData(loginURL, loginConfig).then((data) => {
                setTimeout(() => {
                    console.log("User: ", data);
        
                    if(data && data.email) {
                        dispatch(setAuthState(true));
                        dispatch(setUser(data));
                        router.push("/docs");
                        setIsLoading(false);
                    } else setIsLoading(false);            
                }, 2000);            
            }).catch((err) => {
                dispatch(setAuthState(false));
                setIsLoading(false);
            });
        } else {
            router.push("/docs");
        }   
    }, []);



    let newWindow = null;
    const redirectToGoogleSSO = async () => {
        let timer = null;
        let googleLoginURL = "http://localhost:9000/api/v1/login/google";

        if(!newWindow) {
            newWindow = window.open(
                googleLoginURL,
                "_blank",
                "width=500,height=600"
            )
        }

        if (newWindow) {
            timer = setInterval(async () => {
                try {
                    if (newWindow.closed) {
                      newWindow = null;
                      if (timer) clearInterval(timer);
                      const data = await fetchData(loginURL, loginConfig);
                      console.log("User: ", data);
                      if(data && data.email) {
                        router.push("/docs");                        
                      }
                    }
                } catch (error) {
                    // Handle error if accessing window.closed is blocked by COOP
                    console.log("Error accessing window.closed:", error);
                }
            }, 500);
        }
    }; 

    if(isLoading) return (
        <Loading />
    )

    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-screen bg-gradient-to-r from-[#f0fcff] via-[#faf9fa] to-[#f7f0f1]">
            <div className="-translate-y-12">
                <div className="py-4 pb-12 flex flex-col items-center">
                    <img src="/assets/logo.svg" alt="DocFlow Logo" className="w-36 sm:w-48" />
                    <p className="text-4xl sm:text-5xl text-gray-700 space-x-2 mt-4">
                        <span className="font-semibold">Scribble</span>
                        <span>Docs</span>
                    </p>
                </div>
                <div className="space-y-4 flex flex-col items-center">
                    <Button 
                        size="lg" 
                        color="white" 
                        className="flex items-center gap-3 px-12 py-3 normal-case tracking-wide shadow-md border border-gray-400 rounded-none"
                        onClick={redirectToGoogleSSO}
                    >
                        <img src="/assets/google.svg" alt="Google Logo" className="h-6 w-6" />
                        <span>Sign in with Google</span>
                    </Button>
                    <Button 
                        size="lg" 
                        color="white" 
                        className="flex items-center text-white bg-[#050708] hover:bg-[#050708]/90 gap-3 px-12 py-3 normal-case tracking-wider shadow-md border border-gray-400 rounded-none"
                    >
                        <UserIcon className="w-6" />
                        <span >Continue as Guest</span>
                    </Button>
                </div>
            </div>
        </div>
    )
}