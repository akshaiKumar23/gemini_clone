import { useState } from "react";

import ChatSidebar from "./components/ChatSidebar";
import ChatWindow from "./components/ChatWindow";
import { KindeProvider } from "@kinde-oss/kinde-auth-react";
import { useDispatch } from "react-redux";
import { addHistoryMessage } from "./store/slices/chatHistorySlice";
import generAiResponse from "./lib/aiResponse";
import formatAIResponse from "./lib/aiResponseFormat";



const App = () => {
  const [prompt, setPrompt] = useState("");

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const generateResponse = async () => {

    dispatch(addHistoryMessage({ sender: "user", message: prompt }))

    setPrompt("");

    setLoading(true);

    try {

      const aiResponse = await generAiResponse(prompt);
      const formattedResponse = formatAIResponse(aiResponse);
      dispatch(addHistoryMessage({ sender: "ai", message: formattedResponse }));

      setLoading(false);
    } catch (error) {
      console.error("Error generating AI content:", error);
      setLoading(false);
    }
  };


  return (
    <KindeProvider
      clientId="066714f5d95848428e654f35b49818fc"
      domain="https://akshaisass.kinde.com"
      redirectUri="http://localhost:5173"
      logoutUri="http://localhost:5173"
    >
      <div className="h-screen flex font-poppins">
        <ChatSidebar />
        <ChatWindow
          prompt={prompt}
          setPrompt={setPrompt}
          generateResponse={generateResponse}
          loading={loading}
          setLoading={setLoading}
        />
      </div>
    </KindeProvider>
  );
};

export default App;
