import { useEffect } from "react";
import { useRouter } from "next/router";


const Success = () => {
    // const router = useRouter();
    useEffect(() => {
        setTimeout(() => {
            window.close();
        }, 1000);
        
        // router.push("/docs");
    }, []); 
    
    return (
        <div className="h-screen w-screen flex justify-center items-center">
            <h1>Thanks for logging in.</h1>
        </div>
    )
}

export default Success;