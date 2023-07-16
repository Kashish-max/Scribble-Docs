import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectAuthState, setAuthState } from "../store/authSlice";
import { wrapper } from "@/store/store";

import useGetData from "@/components/helpers";
import { useRouter } from "next/router";
import axios from "axios";

export default function Home() {
  const authState = useSelector(selectAuthState);
  const dispatch = useDispatch();

  const router = useRouter();

  const { data, isLoading, error } = useGetData("http://localhost:9000/api/v1/auth/user",  { withCredentials: true });

  useEffect(() => {
    console.log("State on client: ", authState);

    if(!isLoading) console.log("Data: ", data);
  }, [isLoading]);

  const fetchAuthUser = async () => {
        const response = await axios
            .get("http://localhost:9000/api/v1/auth/user", { withCredentials: true })
            .catch((err) => {
                console.log("Failed to fetch user: ", err);
            });

        if (response && response.data) {
            console.log("User: ", response.data);
        }
    };

  return (
    <main>


      {/* Testing */}
      <div>
        <div>{authState ? "Logged in" : "Not Logged In"}</div>
        <button
          onClick={() => {
            authState
              ? dispatch(setAuthState(false))
              : dispatch(setAuthState(true))
              
              fetchAuthUser();
            }
          }
        >
          {authState ? "Logout" : "LogIn"}
        </button>
      </div>

    </main>
  )
}


export const getServerSideProps = wrapper.getServerSideProps(
    (store) =>
      async ({ params }) => {
        // we can set the initial state from here
        // we are setting to false but you can run your custom logic here
        await store.dispatch(setAuthState(true)); 
        console.log("State on server", store.getState());
        return {
          props: {
            authState: true,
          },
        };
      }
  )