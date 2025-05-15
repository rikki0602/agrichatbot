// ChatInitial.js

import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Chat() {
  const { id } = useParams();
  const [history, setHistory] = useState([]);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedModel, setSelectedModel] = useState("bart");
  const [typing, setTyping] = useState(false);
  const navigate = useNavigate();
  const authToken = localStorage.getItem("authToken");
  const chatHistoryRef = useRef(null);

  useEffect(() => {
    if (authToken) {
      setIsLoggedIn(true);
      fetchMessages();
      fetchHistory();
    } else {
      setIsLoggedIn(false);
    }
  }, [id]);

  const fetchMessages = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/history/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch messages: ${response.statusText}`);
      }

      const data = await response.json();
      setMessages(data.messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const fetchHistory = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/history`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch messages: ${response.statusText}`);
      }

      const data = await response.json();
      data.reverse();
      setHistory(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };
  var botMessage;
  const handleSend = async () => {
    if (input.trim()) {
      const newMessage = { text: input, sender: "user", conversationId: id };
      setMessages([...messages, newMessage]);
      setInput("");
        try {
          const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/add-message`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify( newMessage),
          });
  
          if (!response.ok) {
            throw new Error("Failed to send message");
          }
      } catch (error) {
        console.error("Error sending message:", error);
      }

      try{
        const response = await fetch(`${process.env.REACT_APP_LLM_SERVER_URL}/${selectedModel}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({ query: input }),
        });
        if (!response.ok) {
          throw new Error("Failed to send message");
        }
        const data = await response.json();
        botMessage = { text: data.response, sender: "sys" };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      }catch(error){
        console.error("Error sending message:", error);

      }
      try {

        botMessage["conversationId"]=id
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/add-message`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify(botMessage),
        });

        if (!response.ok) {
          throw new Error("Failed to send message");
        }

        const data = await response.json();


        // setTyping(true);
        // let index = 0;
        // const typingEffect = setInterval(() => {
        //   setMessages((prevMessages) => [
        //     ...prevMessages.slice(0, -1),
        //     { text: data.response.slice(0, index + 1), sender: "sys" },
        //   ]);
        //   index++;
        //   if (index === data.response.length) {
        //     clearInterval(typingEffect);
        //     setTyping(false);
        //   }
        // }, 50);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  const createChat = async () => {
    const title = prompt("Enter the title for the new chat:");
    if (title) {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/create-history`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({ name: title, messages: [] }),
        });

        if (!response.ok) {
          throw new Error(`Failed to create new chat: ${response.statusText}`);
        }

        const data = await response.json();
        fetchHistory(); // Refresh chat history
      } catch (error) {
        console.error("Error creating new chat:", error);
      }
    }
  };

  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex min-h-screen max-h-screen bg-gray-100">
      <div className="w-1/4 bg-[#5d7442] text-white p-6">
        <h2 className="text-2xl font-semibold font-custom mb-6">CHAT HISTORY</h2>
        <button
          onClick={createChat}
          className="w-full bg-[#769246] font-custom text-white py-2 px-4 mb-6 rounded hover:bg-[#4f612f] transition duration-300 focus:outline-none"
        >
          New Chat
        </button>
        <div ref={chatHistoryRef} className="overflow-y-auto h-[calc(100vh-150px)]">
          {history.map((message, index) => (
            <div
              onClick={() => { navigate(`/chat/${message._id}`); }}
              key={index}
              className="text-left text-white mb-4 cursor-pointer p-2 hover:bg-[#769246] hover:bg-opacity-80 rounded"
            >
              {message.name}
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 flex flex-col">
  <div className="flex justify-between items-center p-4 px-6 bg-[#e8ede0] border-b border-gray-300 w-full">
    <h1 className="text-2xl font-bold font-custom">CHAT</h1>
    <div className="flex items-center">
      <label className="mr-4 text-lg font-semibold font-custom">
        Current Model:
        <span className="ml-2 text-xl text-[#3c581c]">{selectedModel}</span>
      </label>
      <select
        value={selectedModel}
        onChange={(e) => setSelectedModel(e.target.value)}
        className="p-2 border border-gray-300 rounded font-custom focus:outline-none bg-white text-[#24301a]"
      >
        <option value="bart" className="text-[#24301a] font-custom">bart</option>
        <option value="gpt2" className="text-[#24301a] font-custom">GPT-2</option>
        <option value="gemini" className="text-[#24301a] font-custom">Gemini</option>
        <option value="llama3" className="text-[#24301a] font-custom">Llama 3</option>
      </select>
    </div>
  </div>
  

        <div className="flex-1 overflow-y-auto p-6 px-44 bg-[#f4f6f0]">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 ${
                message.sender === "user" ? "text-right" : "text-left"
              }`}
            >
              <span
                className={`inline-block p-4 rounded-3xl shadow-sm ${
                  message.sender === "user" ? "bg-[#bbc9a3] rounded-ee-none max-w-xl" : "bg-[#8da465] rounded-es-none"
                }`}
              >
                {message.text}
              </span>
            </div>
          ))}
          {typing && (
            <div className="self-start text-left text-green-500 mb-2">
              <span className="inline-block p-2 rounded-3xl bg-[#8da465] rounded-es-none shadow-sm">
                Typing...
              </span>
            </div>
          )}
        </div>
        <div className="p-4 pb-8 px-44 bg-transparent">
          <div className="flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 p-4 px-8 border border-gray-300 rounded-full bg-[#d1dbc1] focus:outline-none focus:ring-2 focus:ring-[#769246] focus:bg-[#bbc9a3]"
              placeholder="Type your message..."
            />
            <button
              onClick={handleSend}
              className="ml-4 bg-[#769246] font-custom text-white py-4 px-8 rounded-full hover:bg-[#627a3a] transition duration-300 focus:outline-none"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;