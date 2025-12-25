import React, { useState, useRef, useEffect } from "react";
import { X, Send } from "lucide-react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import ChatMessage from "./ChatMessage";
import axios from "axios";

const Dashboard = () => {
    const Apiurl = import.meta.env.VITE_SERVER_URL;
    const AdminId = "admin_1";
    const bottomRef = useRef()
    const [adminSms, setadminSms] = useState("");
    const [conversations, setConversations] = useState([]);
    const [activeConversation, setActiveConversation] = useState(null);
    const [messages, setMessages] = useState([]);

    const handelFetchUserList = async () => {
        try {
            const res = await axios.get(`${Apiurl}/api/message/conversations`);
            setConversations(res.data.data);
            console.log("conversations", res.data.data);
        } catch (error) {
            console.log("error fetching user", error);
        }
    }

    const handelFetchMessage = async (conversationId) => {
        try {
            const res = await axios.get(`${Apiurl}/api/message/${conversationId}`);
            setMessages(res.data.data)
        } catch (error) {
            console.log("error fetching messages", error)
        }
    }

    const handleUserClick = (conv) => {
        setActiveConversation(conv);
        handelFetchMessage(conv._id);
    };
    const handleSendSms = async () => {
        if (!adminSms) {
            alert("this filled is required!")
            return
        }
        const newMessage = {
            text: adminSms,
            sender: "admin",
            senderId: AdminId,
            receiverId: activeConversation.userId,
            conversationId: activeConversation._id
        };
        try {
            const res = await axios.post(`${Apiurl}/api/message`, newMessage);
            console.log("res", res);
            setadminSms('')
            setMessages((prev) => [...prev, newMessage])
        } catch (error) {
            console.log("error", error);
        }

    }
    const handlekeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSendSms();
        }
    };


    useEffect(() => {
        handelFetchUserList()
    }, [])

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <>
            <section className="flex items-center justify-center">
                <div className="w-[30%] bg-white shadow-md min-h-screen">
                    <div className='mt-11 p-5' >
                        {
                            conversations.length === 0 && (
                                <div>
                                    <p className="">no users yet </p>
                                </div>
                            )
                        }
                        {
                            conversations.map((conv) => {
                                return (
                                    <ChatMessage
                                        key={conv._id}
                                        userId={conv.userId}
                                        lastMessage={conv.lastMessage}
                                        isActive={activeConversation?._id === conv._id}
                                        onClick={() => handleUserClick(conv)}
                                    />
                                );
                            })
                        }
                    </div>
                </div>
                <div className="w-[70%] bg-white rounded-2xl shadow-md overflow-hidden font-sans min-h-screen">
                    <div className="flex items-center justify-between px-4 py-3">
                        {
                            activeConversation &&
                            <div className="w-full p-5 shadow">
                                <h3 h3 > {activeConversation.userId}</h3>
                            </div>
                        }
                    </div>
                    <div className="px-4 py-3 h-[360px] overflow-y-auto space-y-4 bg-gray-50">
                        {!
                            activeConversation ? (
                            <div className="w-full h-full flex items-center justify-center">
                                <h3 className="font-semibold capitalize">plase slect any user and star to chatting....</h3>
                            </div>
                        ) : (<>
                            <p className="text-center text-xs text-gray-400">Today</p>
                            {
                                messages.map((val) => {
                                    const { createdAt, sender, text, _id } = val;
                                    return (
                                        <div key={_id} className={` flex mb-3 ${sender === "admin" ? "justify-end" : "justify-start"}`}>
                                            <div className={`rounded-2xl p-4 max-w-[70%] shadow-md text-sm ${sender === "admin" ? "bg-blue-500 text-white" : "bg-white text-black"}`}>
                                                {text}
                                                <div>
                                                    {/* <span>{formatTime}</span> */}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            <div ref={bottomRef}></div>
                        </>)
                        }
                    </div >

                    {
                        activeConversation && <div className="flex items-center gap-2 px-3 py-2 border-t bg-white">
                            <input
                                type="text"
                                placeholder="Type your message..."
                                className="flex-1 px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={adminSms}
                                onChange={(e) => setadminSms(e.target.value)}
                                onKeyDown={handlekeyDown}
                            />
                            <button onClick={handleSendSms} className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg">
                                <Send size={18} />
                            </button>
                        </div>
                    }
                </div >
            </section >
        </>
    );
};

export default Dashboard;
