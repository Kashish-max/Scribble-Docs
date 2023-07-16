import { DocumentTextIcon } from "@heroicons/react/24/solid";
import {Button} from "@material-tailwind/react";
import { useRouter } from "next/router";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

const DocumentRow = ({id, fileName, date}) => {
    const router = useRouter();
    const formattedDate = formatDate(date);

    return (
        <button 
          onClick={() => router.push(`/doc/${id}`)} 
          className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-100 cursor-pointer text-gray-700 text-sm w-full"
        >
          <div className="flex">
            <DocumentTextIcon className="h-8 w-8 text-blue-500"/>
            <p className="flex items-center text-md text-gray-900 ps-5 pe-5 truncate">{fileName}</p>
          </div>
          <div className="flex">
            <p className="pr-5 text-sm flex items-center">{formattedDate}</p>
            <Button variant="text" color="white" className="p-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="#5f6368" viewBox="0 0 24 24" strokeWidth={2.5} stroke="#5f6368" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
              </svg>
            </Button>
          </div>
        </button>
    )
}

export default DocumentRow;