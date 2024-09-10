/* eslint-disable react/prop-types */
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import CustomPromptCard from "./CustomPromptCard";

const ChatWindow = ({ prompt, setPrompt, generateResponse, loading, setLoading }) => {
    const { user } = useKindeAuth();
    const chatHistory = useSelector((state) => state.chatHistory);
    const scrollRef = useRef(null);
    const customPrompts = [
        { heading: "Make a  game in python🐍", prompt: "Create a game in python " },
        { heading: "Recipe for Pizza 🍕", prompt: "Create a step step process to make a french pizza" },
        { heading: "A universe fact 🌃", prompt: "Tell a beautiful fact about the universe" },
    ]
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatHistory, loading]);

    return (
        <div className="flex-1 bg-gray-50 p-6 flex flex-col justify-between rounded-lg shadow-md">
            {chatHistory.length === 0 && !loading ? (
                <div className="flex-1 flex flex-col items-center justify-center">
                    <p className="text-2xl font-bold text-gray-600 text-center">
                        Start chatting and get answers to your questions!
                    </p>
                    <div className="flex justify-evenly gap-2">
                        {customPrompts.map((p, index) => (
                            <CustomPromptCard setLoading={setLoading} key={index} heading={p.heading} prompt={p.prompt} />
                        ))}
                    </div>

                </div>
            ) : null}
            <div className="mb-6 h-full overflow-y-auto scrollbar-hide">
                {chatHistory.map((chat, index) => (
                    <div
                        key={index}
                        className={`flex mb-4 ${chat.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                        {chat.sender === "ai" && (
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJM7Vz6vR7P7eKug6Ta0GN3CVWkZPqZmMj5g&s"
                                alt="AI Avatar"
                                className="w-10 h-10 rounded-full mr-3"
                            />
                        )}
                        <div
                            className={`p-4 rounded-xl shadow-md max-w-sm ${chat.sender === "user" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-900"
                                }`}
                            dangerouslySetInnerHTML={{ __html: chat.message }}
                        />
                        {chat.sender === "user" && (
                            <img
                                src={user.picture}
                                alt="User Avatar"
                                className="w-10 h-10 rounded-full ml-3"
                            />
                        )}
                    </div>
                ))}

                {loading && (
                    <div className="flex justify-start mb-4">
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJM7Vz6vR7P7eKug6Ta0GN3CVWkZPqZmMj5g&s"
                            alt="AI Avatar"
                            className="w-10 h-10 rounded-full mr-3"
                        />
                        <div className="bg-gray-200 text-gray-900 p-4 rounded-xl shadow-md max-w-sm animate-pulse">
                            <p>AI is typing...</p>
                        </div>
                    </div>
                )}

                <div ref={scrollRef} />
            </div>

            <div className="flex items-center">
                <input
                    type="text"
                    className="flex-1 rounded-full border-gray-300 p-3 text-gray-800 focus:ring focus:ring-indigo-300 focus:outline-none transition-all duration-200"
                    value={prompt}
                    onChange={(e) => {
                        if (!user) {
                            alert("Please sign in to chat");
                            return;
                        }
                        setPrompt(e.target.value)
                    }
                    }
                    placeholder="Type your question..."
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && prompt.trim()) {
                            generateResponse();
                        }
                    }}
                />
                <button
                    disabled={loading}
                    onClick={generateResponse}
                    className="ml-3 bg-indigo-600 text-white rounded-full p-3 shadow-md hover:bg-indigo-500 focus:ring focus:ring-indigo-300 transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <g id="Send 01">
                            <path id="icon" d="M9.04071 6.959L6.54227 9.45744M6.89902 10.0724L7.03391 10.3054C8.31034 12.5102 8.94855 13.6125 9.80584 13.5252C10.6631 13.4379 11.0659 12.2295 11.8715 9.81261L13.0272 6.34566C13.7631 4.13794 14.1311 3.03408 13.5484 2.45139C12.9657 1.8687 11.8618 2.23666 9.65409 2.97257L6.18714 4.12822C3.77029 4.93383 2.56187 5.33664 2.47454 6.19392C2.38721 7.0512 3.48957 7.68941 5.69431 8.96584L5.92731 9.10074C6.23326 9.27786 6.38623 9.36643 6.50978 9.48998C6.63333 9.61352 6.72189 9.7665 6.89902 10.0724Z" stroke="white" />
                        </g>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default ChatWindow;
