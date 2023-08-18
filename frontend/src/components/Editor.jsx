import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router"
import Quill from "quill";
import "quill/dist/quill.snow.css";

import { io } from "socket.io-client";
import { selectDocTitle, selectUser, setShowAutoSaving } from "@/store/authSlice";


const toolbarOptions = [
    ["bold", "italic", "underline", "strike"],        // toggled buttons
    ["blockquote", "code-block"],
  
    [{ "header": 1 }, { "header": 2 }],               // custom button values
    [{ "list": "ordered"}, { "list": "bullet" }],
    [{ "script": "sub"}, { "script": "super" }],      // superscript/subscript
    [{ "indent": "-1"}, { "indent": "+1" }],          // outdent/indent
    [{ "direction": "rtl" }],                         // text direction
  
    [{ "size": ["small", false, "large", "huge"] }],  // custom dropdown
    [{ "header": [1, 2, 3, 4, 5, 6, false] }],
  
    [{ "color": [] }, { "background": [] }],          // dropdown with defaults from theme
    [{ "font": [] }],
    [{ "align": [] }],
  
    ["clean"]                                         // remove formatting button
];
  

const Editor = () => {
    const dispatch = useDispatch();

    const [socket, setSocket] = useState();
    const [quill, setQuill] = useState();
    const router = useRouter();
    const { id } = router.query;

    const user = useSelector(selectUser);
    const docTitle = useSelector(selectDocTitle);

    // Initialize Quill instance and disable it as well as set the text to "Loading the document..."
    useEffect(() => {
        const quillServer = new Quill("#container", { theme: "snow", modules: { toolbar: toolbarOptions }});
        quillServer.disable();
        quillServer.setText("Loading the document...")
        setQuill(quillServer);
    }, []);

    // Setup Socket.io Connection
    useEffect(() => {
        const socketServer = io(process.env.NEXT_PUBLIC_BACKEND_URL);
        setSocket(socketServer);

        return () => {
            socketServer.disconnect();
        }
    }, [])

    // Setup Quill to send changes to the server when the user makes changes
    useEffect(() => {
        if (socket === null || quill === null) return;

        const handleChange = (delta, oldData, source) => {
            if (source !== "user") return;

            dispatch(setShowAutoSaving(true));
            socket.emit("send-changes", delta);
        }

        quill && quill.on("text-change", handleChange);

        return () => {
            quill && quill.off("text-change", handleChange);
        }
    }, [quill, socket])

    // Setup Quill to receive changes from the server when other users make changes
    useEffect(() => {
        if (socket === null || quill === null) return;

        const handleChange = (delta) => {
            quill.updateContents(delta);
        }

        socket && socket.on("receive-changes", handleChange);

        return () => {
            socket && socket.off("receive-changes", handleChange);
        }
    }, [quill, socket]);

    // Setups Quill with the document content from the server for the given id when the user opens the document
    useEffect(() => {
        if (quill === null || socket === null) return;

        const userId = user._id;
        socket && socket.once("load-document", document => {
            quill.setContents(document);
            quill.enable();
        })

        socket && socket.emit("get-document", id, userId, docTitle);
    },  [quill, socket, id]);

    useEffect(() => {
        if (socket === null || quill === null) return;

        const interval = setInterval(() => {
            socket.emit("save-document", quill.getContents())
        }, 2000);

        return () => {
            clearInterval(interval);
        }
    }, [socket, quill]);

    return (
        <div className="shadow-lg">
            <div id="container" className="h-full"></div>
        </div>
    )
}

export default Editor;