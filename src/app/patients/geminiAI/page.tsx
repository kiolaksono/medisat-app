"use client";

import { useState, useEffect } from "react";

interface ChatSession {
  sendMessage: (
    message: string
  ) => Promise<{ response: { text: () => string } }>;
}
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

export default function GeminiAi() {
  const [messages, setMessages] = useState<{ role: string; text: string }[]>(
    []
  );
  const [userInput, setUserInput] = useState("");
  const [chat, setChat] = useState<ChatSession | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const MODEL_NAME = `gemini-1.5-pro-001`;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY!; // Use environment variable for Next.js

  const genAi = new GoogleGenerativeAI(apiKey);

  //   const genAi = new GoogleGenerativeAI(process.env.API_KEY);

  const generateConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  useEffect(() => {
    const initChat = async () => {
      try {
        const newChat = await genAi
          .getGenerativeModel({
            model: MODEL_NAME,
            systemInstruction: `you're a doctor assistant which can answer any question of medical and health.
              please avoid to answer any question non related to medical and health, please reply the answer always in Bahasa Indonesia.
              please response with text only, avoid to response with markdown.
              `,
          })
          .startChat({
            generationConfig: generateConfig,
            safetySettings,
            history: messages.map((msg) => ({
              role: msg.role,
              parts: [{ text: msg.text }],
            })),
          });
        setChat(newChat);
      } catch (err) {
        setError("Failed to initialize chat. Please try again.");
      }
    };
    initChat();
  }, [messages]);

  // const handleSendMessage = async () => {
  //   if (!userInput.trim()) return;

  //   setLoading(true);
  //   setError(null);

  //   try {
  //     const userMessage = {
  //       text: userInput,
  //       role: "user",
  //       timestamp: new Date(),
  //     };
  //     setMessages((prevMessages) => [...prevMessages, userMessage]);
  //     setUserInput("");

  //     if (chat) {
  //       const result = await chat.sendMessage(userInput);
  //       // console.log(result, "<<<<<<<<<");
  //       const botMessage = {
  //         text: result.response.text(),
  //         role: "bot",
  //         timestamp: new Date(),
  //       };
  //       setMessages((prevMessages) => [...prevMessages, botMessage]);
  //     }
  //   } catch (err) {
  //     //   console.log(err, "=======");
  //     setError("Failed to send message. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const userMessage = {
        text: userInput,
        role: "user",
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setUserInput("");

      if (chat) {
        const result = await chat.sendMessage(userInput);
        // Removing asterisks from the bot's response text
        const cleanedText = result.response.text().replace(/\*/g, "");
        const botMessage = {
          text: cleanedText,
          role: "bot",
          timestamp: new Date(),
        };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      }
    } catch (err) {
      setError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center "
      // style={{
      //   backgroundImage:
      //     "url(https://images.unsplash.com/photo-1638202993928-7267aad84c31?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
      //   backgroundSize: "cover",
      //   backgroundPosition: "center",
      //   backdropFilter: "blur(4px)",
      // }}
    >
      <div className="w-full bg-opacity-100 shadow-xl bg-zinc-40 rounded-3xl backdrop-transparant border-zinc-600">
        <h1 className="mb-10 text-4xl font-bold tracking-wide text-center text-green-600 text-bold">
          Tanya Medisat
        </h1>

        <div className="p-6 mb-8 space-y-4 overflow-y-auto border shadow-inner rounded-xl h-96 bg-gradient-to-b from-blue-100 to-blue-300 scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-zinc-800">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl break-words shadow-lg transition-transform transform hover:scale-105 ${
                message.role === "user"
                  ? "bg-gradient-to-r from-teal-500 via-teal-600 to-teal-700 text-white border-teal-600"
                  : "bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 text-white border-purple-600"
              }`}
              style={{
                maxWidth: "80%",
                marginLeft: message.role === "user" ? "auto" : "0",
              }}
            >
              {message.text}
            </div>
          ))}
        </div>

        {/* {error && <div className="mb-6 text-center text-red-400">{error}</div>} */}

        <div className="flex">
          <input
            type="text"
            className="flex-grow p-4 text-white transition-all duration-300 rounded-l-full bg-zinc-800 bg-opacity-80 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-zinc-700"
            placeholder="Type a message..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button
            className={`p-4 rounded-r-full transition-all duration-300 font-semibold ${
              loading
                ? "bg-zinc-600 cursor-not-allowed text-gray-400"
                : "bg-teal-500 hover:bg-teal-400 text-white"
            }`}
            onClick={handleSendMessage}
            disabled={loading}
          >
            {loading ? (
              <svg
                className="w-5 h-5 text-white animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 0116 0h2a10 10 0 10-20 0h2z"
                ></path>
              </svg>
            ) : (
              "Send"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
