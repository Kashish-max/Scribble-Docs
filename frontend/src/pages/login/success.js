import { useEffect } from "react";


const Success = () => {
    useEffect(() => {
        setTimeout(() => {
            window.close();
        }, 1000);
    }, []); 
    
    return (
        <div className="h-screen w-screen flex justify-center items-center">
            <h1>Thanks for logging in.</h1>
        </div>
    )
}

export default Success;