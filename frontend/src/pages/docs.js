import Head from "next/head"
import Link from 'next/link'
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-tailwind/react";

import Loading from "@/components/Loading";
import { selectAuthState, setAuthState, setUser, setDocTitle, setIsNewDoc } from "../store/authSlice";
import Header from "@/components/Header"
import { fetchData } from "@/components/helpers";
import CreateDocumentModal from "@/components/modals/CreateDoc";
import DocumentRow from "@/components/DocumentRow";
import { v4 as uuid } from 'uuid';


export default function Documents() {
  const router = useRouter();

  const authState = useSelector(selectAuthState);
  const dispatch = useDispatch();

  const [openCreateDocModal, setOpenCreateDocModal] = useState(false);
  const [errorFetchingDocs, setErrorFetchingDocs] = useState(false);
  const [userDocs, setUserDocs] = useState();

  const [isLoading, setIsLoading] = useState(true);
  const loginURL = "http://localhost:9000/api/v1/auth/user";
  const loginConfig = { withCredentials: true };

  useEffect(() => {
    if(!authState) {
      fetchData(loginURL, loginConfig).then((data) => {
        setTimeout(() => {
          if(data && data.email) {
              dispatch(setAuthState(true));
              dispatch(setUser(data));
              console.log("User: ", data);
              fetchUserDocs();
          } else router.push("/login");
        }, 2000)
      }).catch(err => {
        router.push("/login");
        setIsLoading(false);
      });
    } else {
      fetchUserDocs()
    }   
  }, [authState]);

  const handleCreateDocument = (doc) => {
    dispatch(setDocTitle(doc));
    dispatch(setIsNewDoc(true));
    router.push(`/doc/${uuid()}`);
  }

  const fetchUserDocs = async () => {
    const userDocsURL = "http://localhost:9000/api/v1/user/docs";
    const userDocsConfig = { withCredentials: true };

    try {
      const data = await fetchData(userDocsURL, userDocsConfig);
      if(data && data?.documents?.length > 0) {
        console.log(data.documents);
        setUserDocs(data.documents);
        setIsLoading(false);
      }  else {
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setErrorFetchingDocs(true);
      setIsLoading(false);
    }
  }

  if(isLoading) return (
    <Loading />
  )

  return (
    <main>
      <Head>
        <title>Scribble Docs</title>
      </Head>
      <div>
        <Header search={true}/>

        {/* New and Recent Documents */}
        <section className="bg-[#F8F9FA] pt-20 pb-10 px-10">
          {/* Create Document Modal */}
          <CreateDocumentModal open={openCreateDocModal} setOpen={setOpenCreateDocModal} redirectTo={handleCreateDocument} />

          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between py-6">
              <Link href="/test"><h2 className="text-gray-900 text-md ms-1">Start a new document</h2></Link>
              <Button variant="text" color="white" className="p-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="#5f6368" viewBox="0 0 24 24" strokeWidth={2.5} stroke="#5f6368" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                </svg>
              </Button>
            </div>

            {/* Create new document Icon */}
            <div>
              <button 
                className="relative h-52 w-40 border border-gray-300 cursor-pointer hover:border-blue-600"
                onClick={() => setOpenCreateDocModal(true)}
              >
                <img src="https://ssl.gstatic.com/docs/templates/thumbnails/docs-blank-googlecolors.png" alt=""></img>
              </button>
              <p className="ms-1 mt-2 text-sm text-graay-700 tracking-wide">Blank</p>
            </div>
          </div>
        </section>

        {/* List documents */}
        <section className="bg-white px-10 md:px-10">
          <div className="max-w-5xl mx-auto py-8 text-sm text-gray-700">
            <div className="flex items-center justify-between pb-5">
              <h2 className="font-medium flex-grow">My Documents</h2>
              <p className="mr-12">Date Created</p>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#5f6368" className="w-6 h-6">
                <path d="M19.5 21a3 3 0 003-3v-4.5a3 3 0 00-3-3h-15a3 3 0 00-3 3V18a3 3 0 003 3h15zM1.5 10.146V6a3 3 0 013-3h5.379a2.25 2.25 0 011.59.659l2.122 2.121c.14.141.331.22.53.22H19.5a3 3 0 013 3v1.146A4.483 4.483 0 0019.5 9h-15a4.483 4.483 0 00-3 1.146z" />
              </svg>
            </div>
            {userDocs && userDocs.map((doc) => {
              return (
                <DocumentRow 
                  key={doc._id} 
                  id={doc._id}
                  fileName={doc.title}
                  date={doc.timestamp} 
                />
              )
            })}
          </div>
        </section>
      </div>
    </main>
  )
}

