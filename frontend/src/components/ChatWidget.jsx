import React, { useState, useRef, useEffect } from "react";
import { X, Send, Rss } from "lucide-react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { nanoid } from 'nanoid'
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import axios from 'axios';
const ChatWidget = ({ toggleChatWidget }) => {
    const Apiurl = import.meta.env.VITE_SERVER_URL;
    console.log("Api", Apiurl);
    const AdminId = "admin_1";

    const bottomRef = useRef()
    const [userSms, setUserSms] = useState("");
    const [message, setMessage] = useState([]);
    const [openDotsId, setOpenDotsId] = useState(null)
    const [userId, setuserId] = useState('')

    useEffect(() => {
        let storedUserId = localStorage.getItem('user_id');
        if (!storedUserId || storedUserId === null || storedUserId === undefined) {
            storedUserId = `user_${nanoid(10)}`;
            localStorage.setItem("user_id", storedUserId);;
            console.log("new usr id create", storedUserId);
        }
        else {
            console.log("old user id", storedUserId);
        }
        setuserId(storedUserId);

    }, [])



    const handelSendSms = async () => {
        if (!userSms) {
            alert("this filled is required!")
            return
        }
        const newMessage = {
            text: userSms,
            sender: "user",
            senderId: userId,
            receiverId: AdminId,
            conversationId: `${userId}_${AdminId}`
        };
        try {
            const res = await axios.post(`${Apiurl}/api/message`, newMessage);
            console.log("res", res);
            setMessage((prev) => [...prev, newMessage])
        } catch (error) {
            console.log("error", error);
        }
        setUserSms('')
    }
    const handelkeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handelSendSms();
        }
    };

    const handelFetchMessage = async (conversationId) => {
        try {
            const res = await axios.get(`${Apiurl}/api/message/${conversationId}`);
            const finalRes = res.data.data
            console.log("finalRes", finalRes);
            setMessage(finalRes);
            console.log("Res", res);
        } catch (error) {
            console.log("error", error);
        }
    }

    useEffect(() => {
        if (!userId) return
        const conversationId = `${userId}_${AdminId}`;
        console.log("conversationId", conversationId);
        handelFetchMessage(conversationId)
    }, [userId])

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);

    return (
        <div className="fixed max-w-md w-full bottom-[73px] right-6  bg-white rounded-2xl shadow-md overflow-hidden font-sans">
            <div className="flex items-center justify-between px-4 py-3">
                <div>
                    <h3 className="font-semibold text-gray-800">Chat with us</h3>
                    <p className="text-xs text-gray-500">
                        We typically reply in a few minutes
                    </p>
                </div>
                <button onClick={toggleChatWidget} className="text-2xl text-gray-400 hover:text-gray-600 cursor-pointer">
                    <X size={18} />
                </button>
            </div>

            <div className="px-4 py-3 h-[360px] overflow-y-auto space-y-4 bg-gray-50">
                <p className="text-center text-xs text-gray-400">Today</p>
                {
                    message.map((val) => {
                        const { conversationId, createdAt, sender, text, _id } = val
                        return (
                            <div key={_id} className={` flex mb-3 ${sender === "admin" ? "justify-start" : "justify-end"}`}>
                                <div className={`rounded-2xl p-4 max-w-[70%] shadow-md text-sm ${sender === "admin" ? "bg-white text-black" : "bg-blue-500 text-white"}`}>
                                    {text}
                                </div>
                            </div>

                        )
                    })
                }
                <div ref={bottomRef}></div>
            </div>

            <div className="flex items-center gap-2 px-3 py-2 border-t bg-white">
                <input
                    type="text"
                    placeholder="Type your message..."
                    className="flex-1 px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={userSms}
                    onChange={(e) => setUserSms(e.target.value)}
                    onKeyDown={handelkeyDown}
                />
                <button onClick={handelSendSms} className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg">
                    <Send size={18} />
                </button>
            </div>
        </div>
    );
};

export default ChatWidget;
