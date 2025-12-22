import React, { useState } from "react";
import { X, Send } from "lucide-react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { nanoid } from 'nanoid'
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";

const ChatWidget = ({ toggleChatWidget }) => {
    const [userSms, setUserSms] = useState("");
    const [message, setMessage] = useState([]);
    const [openDotsId, setOpenDotsId] = useState(null)
    const handelDots = (id) => {
        setOpenDotsId((prev) => (prev === id ? null : id))
    }

    const handeldeleteSms = (id) => {
        console.log("deletems", id);

    }
    const handelEditSms = (id) => {
        console.log("editsms", id);
    }

    const handelSendSms = () => {
        if (!userSms) {
            alert("this filled is required!")
        }
        const newMessage = {
            id: nanoid(),
            text: userSms,
            sender: "user",
            time: new Date().toLocaleTimeString()
        }
        setMessage((prev) => [...prev, newMessage])
        console.log("sns", newMessage);

        setUserSms('')
    }
    const handelkeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handelSendSms();
        }
    };

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
                <div className="flex gap-2">
                    <img
                        src="https://i.pravatar.cc/40?img=32"
                        alt="agent"
                        className="w-8 h-8 rounded-full"
                    />
                    <div className="bg-white px-4 py-2 rounded-xl shadow text-sm text-gray-800 max-w-[75%]">
                        Hi there! 👋 How can we help you today?
                        <div className="text-[10px] text-gray-400 mt-1">10:23 AM</div>
                    </div>
                </div>

                {
                    message.map((val, index) => {
                        const { id, text, time } = val
                        return (
                            <div key={index} className="flex mt-[70px]  justify-end items-center relative">
                                <div className="bg-blue-500 text-white px-4 py-2 rounded-xl shadow text-sm max-w-[75%]">
                                    {text}
                                    <div className="text-[10px] text-blue-100 mt-1 text-right">
                                        {time}
                                    </div>
                                </div>
                                <div className={`w-[30px] p-5 rounded bg-white shadow-lg absolute top-[50px] right-1 flex items-center justify-center gap-1.5 flex-col  duration-150 ${openDotsId === id ? "scale-[1]" : "scale-0"}`}>
                                    <MdDelete onClick={() => handeldeleteSms(val.id)} className="cursor-pointer text-red-600" />
                                    <FiEdit onClick={()=>handelEditSms(id)} className="cursor-pointer text-blue-500" />
                                </div>
                                <HiOutlineDotsVertical onClick={() => handelDots(id)} className="cursor-pointer" />
                            </div>
                        )
                    })
                }
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
