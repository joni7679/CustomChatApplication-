const ChatMessage = ({ userId, lastMessage, isActive, onClick }) => {
    return (
        <div onClick={onClick}
            className={`p-3 mb-2 rounded-lg cursor-pointer ${isActive ? "bg-blue-100" : "bg-gray-100"
                }`}>
            <p className="font-medium">{userId}</p>
            <p className="text-xs text-gray-500">{lastMessage}</p>
        </div>
    );
};

export default ChatMessage;
