"use client";

import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Send, X } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Message {
  id: number;
  text: string;
  sender: "user" | "support";
}

export default function ChatButton() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello! How can I help you today?", sender: "support" },
  ]);
  const [userInput, setUserInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const apiKey = process.env.NEXT_PUBLIC_API_KEY!;
  const MODEL_NAME = `gemini-1.5-pro-001`;

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    setLoading(true);
    setError(null);

    const newMessage: Message = {
      id: messages.length + 1,
      text: userInput,
      sender: "user",
    };
    setMessages([...messages, newMessage]);
    setUserInput("");

    try {
      // Integrate your chat logic here (replace the below mock response)
      const botResponse = {
        text: "Thank you for your message. Our team will get back to you shortly.",
      };

      const supportMessage: Message = {
        id: messages.length + 2,
        text: botResponse.text,
        sender: "support",
      };

      setMessages((prevMessages) => [...prevMessages, supportMessage]);
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
    <>
      <Button
        className="fixed bottom-6 right-6 rounded-full p-4 shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-purple-600 hover:to-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MessageCircle className="h-6 w-6" />
        <span className="sr-only">Open chat</span>
      </Button>

      {isOpen && (
        <div
          className="flex items-center justify-center min-h-screen mt-8"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1638202993928-7267aad84c31?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backdropFilter: "blur(4px)",
          }}
        >
          <div className="w-full max-w-4xl p-10 bg-opacity-100 shadow-xl bg-zinc-40 rounded-3xl backdrop-transparant border-zinc-600">
            <h1 className="mb-10 text-4xl font-bold tracking-wide text-center text-green-600">
              Tanya Medisat
            </h1>

            <div
              ref={scrollAreaRef}
              className="p-6 mb-8 space-y-4 overflow-y-auto border shadow-inner rounded-xl h-96 bg-gradient-to-br bg-transparent scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-zinc-800"
            >
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl break-words shadow-lg transition-transform transform hover:scale-105 ${
                    message.sender === "user"
                      ? "bg-gradient-to-r from-teal-500 via-teal-600 to-teal-700 text-white border-teal-600"
                      : "bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 text-white border-purple-600"
                  }`}
                  style={{
                    maxWidth: "80%",
                    marginLeft: message.sender === "user" ? "auto" : "0",
                  }}
                >
                  {message.text}
                </div>
              ))}
            </div>

            {error && (
              <div className="mb-6 text-center text-red-400">{error}</div>
            )}

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
      )}
    </>
  );
}

// "use client";

// import * as React from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { MessageCircle, Send, X } from "lucide-react";

// interface Message {
//   id: number;
//   text: string;
//   sender: "user" | "support";
// }

// export default function ChatButton() {
//   const [messages, setMessages] = useState<{ role: string; text: string }[]>(
//     []
//   );
//   const [userInput, setUserInput] = useState("");
//   const [chat, setChat] = useState<ChatSession | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   const MODEL_NAME = `gemini-1.5-pro-001`;
//   const apiKey = process.env.NEXT_PUBLIC_API_KEY!; // Use environment variable for Next.js

//   const genAi = new GoogleGenerativeAI(apiKey);
//   console.log(genAi, "genAi");

//   //   const genAi = new GoogleGenerativeAI(process.env.API_KEY);

//   const generateConfig = {
//     temperature: 0.9,
//     topK: 1,
//     topP: 1,
//     maxOutputTokens: 2048,
//   };

//   const safetySettings = [
//     {
//       category: HarmCategory.HARM_CATEGORY_HARASSMENT,
//       threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//     },
//     {
//       category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
//       threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//     },
//     {
//       category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
//       threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//     },
//     {
//       category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
//       threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//     },
//   ];

//   useEffect(() => {
//     const initChat = async () => {
//       try {
//         const newChat = await genAi
//           .getGenerativeModel({
//             model: MODEL_NAME,
//             systemInstruction: `you're a doctor assistant which can answer any question of medical and health.
//                   please avoid to answer any question non related to medical and health, please reply the answer always in Bahasa Indonesia.
//                   please response with text only, avoid to response with markdown.
//                   `,
//           })
//           .startChat({
//             generationConfig: generateConfig,
//             safetySettings,
//             history: messages.map((msg) => ({
//               role: msg.role,
//               parts: [{ text: msg.text }],
//             })),
//           });
//         setChat(newChat);
//       } catch (err) {
//         setError("Failed to initialize chat. Please try again.");
//       }
//     };
//     initChat();
//   }, [messages]);

//   const handleSendMessage = async () => {
//     if (!userInput.trim()) return;

//     setLoading(true);
//     setError(null);

//     try {
//       const userMessage = {
//         text: userInput,
//         role: "user",
//         timestamp: new Date(),
//       };
//       setMessages((prevMessages) => [...prevMessages, userMessage]);
//       setUserInput("");

//       if (chat) {
//         const result = await chat.sendMessage(userInput);
//         // console.log(result, "<<<<<<<<<");
//         const botMessage = {
//           text: result.response.text(),
//           role: "bot",
//           timestamp: new Date(),
//         };
//         setMessages((prevMessages) => [...prevMessages, botMessage]);
//       }
//     } catch (err) {
//       //   console.log(err, "=======");
//       setError("Failed to send message. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter") {
//       e.preventDefault();
//       handleSendMessage();
//     }
//   };

//   const [isOpen, setIsOpen] = React.useState(false);
//   const [messages, setMessages] = React.useState<Message[]>([
//     { id: 1, text: "Hello! How can I help you today?", sender: "support" },
//   ]);
//   const [inputValue, setInputValue] = React.useState("");
//   const scrollAreaRef = React.useRef<HTMLDivElement>(null);

//   const handleSendMessage = () => {
//     if (inputValue.trim()) {
//       const newMessage: Message = {
//         id: messages.length + 1,
//         text: inputValue,
//         sender: "user",
//       };
//       setMessages([...messages, newMessage]);
//       setInputValue("");

//       // Simulate a support response
//       setTimeout(() => {
//         const supportResponse: Message = {
//           id: messages.length + 2,
//           text: "Thank you for your message. Our team will get back to you shortly.",
//           sender: "support",
//         };
//         setMessages((prevMessages) => [...prevMessages, supportResponse]);
//       }, 1000);
//     }
//   };

//   React.useEffect(() => {
//     if (scrollAreaRef.current) {
//       scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
//     }
//   }, [messages]);

//   return (
//     <>
//       <Button
//         className="fixed bottom-6 right-6 rounded-full p-4 shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-purple-600 hover:to-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105"
//         onClick={() => setIsOpen(true)}
//       >
//         <MessageCircle className="h-6 w-6" />
//         <span className="sr-only">Open chat</span>
//       </Button>

//       <div
//         className="flex items-center justify-center min-h-screen mt-8"
//         style={{
//           backgroundImage:
//             "url(https://images.unsplash.com/photo-1638202993928-7267aad84c31?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           backdropFilter: "blur(4px)",
//         }}
//       >
//         <div className="w-full max-w-4xl p-10 bg-opacity-100 shadow-xl bg-zinc-40 rounded-3xl backdrop-transparant border-zinc-600">
//           <h1 className="mb-10 text-4xl font-bold tracking-wide text-center text-green-600 text-bold">
//             Tanya Medisat
//           </h1>

//           <div className="p-6 mb-8 space-y-4 overflow-y-auto border shadow-inner rounded-xl h-96 bg-gradient-to-br bg-transparent scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-zinc-800">
//             {messages.map((message, index) => (
//               <div
//                 key={index}
//                 className={`p-4 rounded-xl break-words shadow-lg transition-transform transform hover:scale-105 ${
//                   message.role === "user"
//                     ? "bg-gradient-to-r from-teal-500 via-teal-600 to-teal-700 text-white border-teal-600"
//                     : "bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 text-white border-purple-600"
//                 }`}
//                 style={{
//                   maxWidth: "80%",
//                   marginLeft: message.role === "user" ? "auto" : "0",
//                 }}
//               >
//                 {message.text}
//               </div>
//             ))}
//           </div>

//           {/* {error && <div className="mb-6 text-center text-red-400">{error}</div>} */}

//           <div className="flex">
//             <input
//               type="text"
//               className="flex-grow p-4 text-white transition-all duration-300 rounded-l-full bg-zinc-800 bg-opacity-80 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-zinc-700"
//               placeholder="Type a message..."
//               value={userInput}
//               onChange={(e) => setUserInput(e.target.value)}
//               onKeyDown={handleKeyPress}
//             />
//             <button
//               className={`p-4 rounded-r-full transition-all duration-300 font-semibold ${
//                 loading
//                   ? "bg-zinc-600 cursor-not-allowed text-gray-400"
//                   : "bg-teal-500 hover:bg-teal-400 text-white"
//               }`}
//               onClick={handleSendMessage}
//               disabled={loading}
//             >
//               {loading ? (
//                 <svg
//                   className="w-5 h-5 text-white animate-spin"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                 >
//                   <circle
//                     className="opacity-25"
//                     cx="12"
//                     cy="12"
//                     r="10"
//                     stroke="currentColor"
//                     strokeWidth="4"
//                   ></circle>
//                   <path
//                     className="opacity-75"
//                     fill="currentColor"
//                     d="M4 12a8 8 0 0116 0h2a10 10 0 10-20 0h2z"
//                   ></path>
//                 </svg>
//               ) : (
//                 "Send"
//               )}
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// "use client";

// import * as React from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { MessageCircle, Send, X } from "lucide-react";

// interface Message {
//   id: number;
//   text: string;
//   sender: "user" | "support";
// }

// export default function ChatButton() {
//   const [isOpen, setIsOpen] = React.useState(false);
//   const [messages, setMessages] = React.useState<Message[]>([
//     { id: 1, text: "Hello! How can I help you today?", sender: "support" },
//   ]);
//   const [inputValue, setInputValue] = React.useState("");
//   const scrollAreaRef = React.useRef<HTMLDivElement>(null);

//   const handleSendMessage = () => {
//     if (inputValue.trim()) {
//       const newMessage: Message = {
//         id: messages.length + 1,
//         text: inputValue,
//         sender: "user",
//       };
//       setMessages([...messages, newMessage]);
//       setInputValue("");

//       // Simulate a support response
//       setTimeout(() => {
//         const supportResponse: Message = {
//           id: messages.length + 2,
//           text: "Thank you for your message. Our team will get back to you shortly.",
//           sender: "support",
//         };
//         setMessages((prevMessages) => [...prevMessages, supportResponse]);
//       }, 1000);
//     }
//   };

//   React.useEffect(() => {
//     if (scrollAreaRef.current) {
//       scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
//     }
//   }, [messages]);

//   return (
//     <>
//       <Button
//         className="fixed bottom-4 right-4 rounded-full p-4 shadow-lg"
//         onClick={() => setIsOpen(true)}
//       >
//         <MessageCircle className="h-6 w-6" />
//         <span className="sr-only">Open chat</span>
//       </Button>

//       {isOpen && (
//         <Card className="fixed bottom-20 right-4 w-80 shadow-xl">
//           <CardHeader className="flex flex-row items-center justify-between">
//             <h2 className="text-lg font-semibold">Chat Support</h2>
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={() => setIsOpen(false)}
//             >
//               <X className="h-4 w-4" />
//               <span className="sr-only">Close chat</span>
//             </Button>
//           </CardHeader>
//           <CardContent>
//             <div className="h-[300px] pr-4" ref={scrollAreaRef}>
//               <ScrollArea>
//                 {messages.map((message) => (
//                   <div
//                     key={message.id}
//                     className={`mb-4 ${
//                       message.sender === "user" ? "text-right" : "text-left"
//                     }`}
//                   >
//                     <span
//                       className={`inline-block rounded-lg px-3 py-2 ${
//                         message.sender === "user"
//                           ? "bg-primary text-primary-foreground"
//                           : "bg-muted"
//                       }`}
//                     >
//                       {message.text}
//                     </span>
//                   </div>
//                 ))}
//               </ScrollArea>
//             </div>
//           </CardContent>
//           <CardFooter>
//             <form
//               onSubmit={(e) => {
//                 e.preventDefault();
//                 handleSendMessage();
//               }}
//               className="flex w-full items-center space-x-2"
//             >
//               <Input
//                 type="text"
//                 placeholder="Type your message..."
//                 value={inputValue}
//                 onChange={(e) => setInputValue(e.target.value)}
//               />
//               <Button type="submit" size="icon">
//                 <Send className="h-4 w-4" />
//                 <span className="sr-only">Send message</span>
//               </Button>
//             </form>
//           </CardFooter>
//         </Card>
//       )}
//     </>
//   );
// }
