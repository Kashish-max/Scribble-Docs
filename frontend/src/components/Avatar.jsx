import {
  Avatar,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Typography,
} from "@material-tailwind/react";
import {
  Cog6ToothIcon,
  PowerIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setAuthState, setUser } from "@/store/authSlice";;


export const AvatarMenu = ({ Logout, user }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <Menu placement="bottom-end">
      <MenuHandler>
          <Button variant="text" color="white" className="p-0 ms-2">
              <img
              loading="lazy" 
              className="w-11 h-11 rounded-full p-1 cursor-pointer" 
              src={ user?.picture } 
              alt="Profile" 
              /> 
          </Button>
      </MenuHandler>
      <MenuList>
        <MenuItem className="flex items-center gap-4 py-2 pr-8 pl-2" onClick={() => router.push("/")}>
          <Avatar
              variant="circular"
              alt="tania andrew"
              src={ user?.picture }
          />
          <div className="flex flex-col gap-1">
              <Typography variant="small" color="gray" className="font-normal">
                  <span className="font-medium text-gray-900">{ user?.fullName }</span>
              </Typography>
              <Typography
                  variant="small"
                  className="flex items-center gap-1 text-xs text-gray-600"
                  >
                  { user?.email }
              </Typography>
          </div>
        </MenuItem>            
        {/* <MenuItem className="flex items-center gap-2">
          <UserCircleIcon strokeWidth={2} className="h-4 w-4" />
          <Typography variant="small" className="font-normal">
            My Profile
          </Typography>
        </MenuItem>
        <MenuItem className="flex items-center gap-2">
          <Cog6ToothIcon strokeWidth={2} className="h-4 w-4" />
          <Typography variant="small" className="font-normal">
            Edit Profile
          </Typography>
        </MenuItem> */}
        <hr className="my-2 border-blue-gray-50" />
        <MenuItem className="flex items-center gap-2 " onClick={() => {
          Logout();
          dispatch(setAuthState(false));
          dispatch(setUser(null));
          window.location.href = "/login";
        }}>
          <PowerIcon strokeWidth={2} className="h-4 w-4" />
          <Typography variant="small" className="font-normal">
            Sign Out
          </Typography>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

export default AvatarMenu;