import React from "react";

const ChatMessage = () => {
    return (
        <div className="flex items-start gap-3 relative max-w-xl">
            <img
                src="https://i.pravatar.cc/40"
                alt="avatar"
                className="w-10 h-10 rounded-full object-cover"
            />
            <div className="relative bg-gray-100 rounded-xl px-4 py-3 w-full">
               
                <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-gray-900 text-sm">
                        user1
                    </h4>
                    
                </div>
            </div>
        </div>
    );
};

export default ChatMessage;
