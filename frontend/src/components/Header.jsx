import { useEffect } from "react";
import { useRouter } from "next/router";
import { Button } from "@material-tailwind/react";
import { useSelector, useDispatch } from "react-redux";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";

import AvatarMenu from "./Avatar";
import { selectUser, selectShowAutoSaving, setShowAutoSaving } from "@/store/authSlice";
import { Logout } from "./helpers";

const Header = ({search}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const showAutoSaving = useSelector(selectShowAutoSaving);

  useEffect(() => {
    if(showAutoSaving) {
      setTimeout(() => {
        dispatch(setShowAutoSaving(false));
      }, 2000);
    }
  }, [showAutoSaving]);

  return (
    <header className="fixed w-full top-0 z-50 flex items-center px-4 py-2 shadow-md bg-white">

      {/* Hamburger */}
      <Button variant="text" color="white" className="p-0">
        <div className="space-y-1 px-2 py-2">
          <span className="block w-5 h-0.5 bg-gray-600 rounded-lg"></span>
          <span className="block w-5 h-0.5 bg-gray-600 rounded-lg"></span>
          <span className="block w-3 h-0.5 bg-gray-600 rounded-lg"></span>
        </div>
      </Button>
      {/* Logo */}
      <button className="flex items-center ms-4 py-1.5" onClick={() => router.push('/')}>
        <img className="w-7" src="/assets/logo.svg" alt="Logo" />
        <h1 className="hidden md:inline-flex ml-2 text-gray-700 text-xl">
            <span className="font-semibold pe-1">Scribble</span> Docs
        </h1>
      </button>

      {!search && showAutoSaving && (
        <div className="flex items-center ms-8">
          <CloudArrowUpIcon className="w-4 h-4 text-gray-700" />
          <span className="ms-1 text-xs text-gray-700 font-semibold">Saving...</span>
        </div>
      )}

      {/* Search */}
      {search && (
        <div className="hidden sm:flex flex-grow justify-center mx-4">
          <div className="max-w-2xl w-full flex items-center px-5 py-1.5 bg-gray-100 text-gray-600 rounded-lg transition-all focus-within:text-gray-600 focus-within:shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 172 172">
              <g fill="#757575">
                <path d="M64.5,14.33333c-27.6214,0 -50.16667,22.54527 -50.16667,50.16667c0,27.6214 22.54527,50.16667 50.16667,50.16667c12.52732,0 23.97256,-4.67249 32.7819,-12.31771l3.05143,3.05143v9.26628l40.03256,40.03256c3.95599,3.95599 10.37733,3.956 14.33333,0c3.956,-3.956 3.956,-10.37733 0,-14.33333l-40.03256,-40.03256h-9.26628l-3.05143,-3.05143c7.64521,-8.80934 12.31771,-20.25458 12.31771,-32.7819c0,-27.6214 -22.54527,-50.16667 -50.16667,-50.16667zM64.5,28.66667c19.87509,0 35.83333,15.95824 35.83333,35.83333c0,19.87509 -15.95825,35.83333 -35.83333,35.83333c-19.87509,0 -35.83333,-15.95825 -35.83333,-35.83333c0,-19.87509 15.95824,-35.83333 35.83333,-35.83333z"></path>
              </g>
            </svg>
            <input 
              type="text"
              placeholder="Search"
              className="flex-grow px-5 py-1 text-base text-gray-700 bg-transparent outline-none"
            />
          </div>
        </div>
      )}
      {/* Menu Icon */}
      <div className="ms-auto flex">
        <Button variant="text" color="white" className="p-0">
          <div className="w-11 h-11 p-2.5">
            <svg focusable="false" viewBox="0 0 24 24" style={{"fill": "#5f6368"}}>
              <path d="M6,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM16,6c0,1.1 0.9,2 2,2s2,-0.9 2,-2 -0.9,-2 -2,-2 -2,0.9 -2,2zM12,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2z"></path>
            </svg>
          </div>
        </Button>
        {/* Profile Icon */}
        <div className="">
          <AvatarMenu Logout={Logout} user={user}/>
        </div>
      </div>

    </header>
  );
}

export default Header;