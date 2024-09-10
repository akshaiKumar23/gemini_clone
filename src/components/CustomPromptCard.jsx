/* eslint-disable react/prop-types */

import { useDispatch } from "react-redux";
import generAiResponse from "../lib/aiResponse"
import { addHistoryMessage } from "../store/slices/chatHistorySlice";
import formatAIResponse from "../lib/aiResponseFormat";

const CustomPromptCard = ({ heading, prompt, setLoading }) => {
    const dispatch = useDispatch();
    return (
        <div
            onClick={async () => {
                setLoading(true);
                const aiResponse = await generAiResponse(prompt);
                setLoading(false);
                const formattedResponse = formatAIResponse(aiResponse)
                dispatch(addHistoryMessage({ sender: "ai", message: formattedResponse }))
            }}
            className="max-w-sm p-4 cursor-pointer flex justify-center items-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mt-2 flex-wrap transition-shadow duration-300  hover:shadow-lg hover:shadow-gray-400">
            <a href="#">
                <h5 className="mb-2 text-sm font-semibold tracking-tight text-gray-900 dark:text-white">{heading}</h5>
            </a>


        </div>

    )
}

export default CustomPromptCard