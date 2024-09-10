
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../store/slices/chatMessages";
import { setChatHistory } from "../store/slices/chatHistorySlice";


const ChatSidebar = () => {
    const { register, login, logout, isAuthenticated } = useKindeAuth()
    const dispatch = useDispatch();
    const chatMessages = useSelector(state => state.chatMessages)
    const chatHistory = useSelector(state => state.chatHistory)
    const handleNewChat = () => {
        if (chatHistory.length !== 0) {
            dispatch(addMessage(chatHistory))
            dispatch(setChatHistory([]));
        }


    }
    return (
        <div className="w-1/4 h-full bg-gray-800 text-white p-4 flex flex-col">
            <button onClick={handleNewChat} className="rounded-lg mb-3 py-2 bg-cyan-400 hover:bg-cyan-600">New Chat</button>
            <div className="flex-1">
                <h2 className="text-xl mb-4">Chat History</h2>

                <ul>

                    {chatMessages.map((message, index) =>
                        <li
                            onClick={() => {
                                dispatch(setChatHistory(message))
                            }}
                            key={index} className="mb-2 p-2 bg-gray-700 rounded-lg cursor-pointer">
                            Chat {index + 1}
                        </li>
                    )}


                </ul>
            </div>
            <div className="mt-auto">
                {!isAuthenticated ? <div>
                    <button onClick={login} className="w-full bg-green-500 py-2 rounded-lg mb-4">
                        Login
                    </button>
                    <button onClick={register} className="w-full bg-purple-600 py-2 rounded-lg">
                        Register
                    </button>
                </div> :
                    <button onClick={logout} className="bg-gray-500 w-full py-2 rounded-lg">Logout</button>
                }
            </div>
        </div>
    );
};

export default ChatSidebar;
