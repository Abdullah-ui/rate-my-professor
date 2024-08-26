"use client";
import Header from "@/components/Header";
import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from 'react-markdown';

function Page() {
  const [inputValue, setInputValue] = useState("");
  const [isTagged, setIsTagged] = useState(false); // State to track if main is tagged
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Hi! I'm the Rate My Professor support assistant. How can I help you today?`,
    },
  ]); // State to store user and bot messages
  const lastMessageRef = useRef(null); // Ref to keep track of the last message

  const handleButtonClick = (prompt) => {
    // Remove leading and trailing quotation marks
    const cleanedPrompt = prompt.replace(/^"|"$/g, "");
    setInputValue(cleanedPrompt);
    setIsTagged(true); // Tag the main element when button is clicked
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // Prevent newline insertion in textarea
      if (inputValue.trim()) {
        submitMessage(); // Submit the message and add it to the chat
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the form from submitting and refreshing the page
    if (inputValue.trim()) {
      submitMessage(); // Submit the message and add it to the chat
    }
  };

  const submitMessage = async () => {
    const userMessage = inputValue.trim();

    // Add user's message to the conversation
    setMessages((prevMessages) => [
      ...prevMessages,
      { type: "user", text: userMessage },
    ]);

    setInputValue(""); // Clear the input field

    // Simulate bot response (replace this with actual bot logic)
    const botResponse = await generateBotResponse(userMessage);

    // Add bot's response to the conversation
    setMessages((prevMessages) => [
      ...prevMessages,
      { type: "assistant", text: botResponse},
    ]);
  };

  const generateBotResponse = async (userMessage) => {
    // Generate a response based on the user's message
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([...messages, { role: 'user', content: userMessage }]),
    });
  
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let result = '';
  
    const processText = async ({ done, value }) => {
      if (done) {
        console.log(result);
        return result; // Return the accumulated text when done
      }
  
      const text = decoder.decode(value || new Uint8Array(), { stream: true });
      result += text;
  
      // Continue reading the stream
      return reader.read().then(processText);
    };
  
    // Start reading the stream and return the final result
    return reader.read().then(processText);
  };

  useEffect(() => {
    // Scroll to the last userMwhenever messages array updates
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="min-h-screen flex flex-col text-black">
      <Header />
      <div className="flex h-full flex-1 flex-col justify-center text-gray-500 items-center">
        {/* Conditionally render the example prompts */}
        {messages.length === 0 && (
          <main
            className={`relative w-full flex flex-col overflow-hidden items-center text-center flex-1 justify-center`}
            data-tagged={isTagged ? "true" : "false"}
          >
            <div className="text-gray-500 w-full md:max-w-2xl lg:max-w-3xl">
              <h1 className="text-3xl font-semibold text-gray-500 mt-5 mb-6">
                Example Prompts
              </h1>
              <div className="md:flex items-start text-gray-500 text-center gap-3.5">
                {[
                  `"Which professors/courses have discussion sections?"`,
                  `"Which professors are generous with extensions?"`,
                  `"Which professors record lectures?"`,
                ].map((prompt, index) => (
                  <div
                    className="flex flex-col mb-8 md:mb-auto gap-3.5 flex-1"
                    key={index}
                  >
                    <button
                      className={`w-full bg-gray-50 text-gray-800 p-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-900 cursor-pointer`}
                      onClick={() => handleButtonClick(prompt)}
                    >
                      {prompt}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </main>
        )}

        {/* Messages Area */}
        <div
          className="w-full p-4 lg:max-w-3xl bg-white rounded-md shadow-md text-black"
          style={{
            marginTop: "10px",
            maxHeight: "420px", // Set a max-height for the messages container
            overflowY: "auto", // Enable vertical scrolling if content exceeds max-height
            overflowX: "hidden", // Prevent horizontal scrolling
          }}
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.type === "user" ? "justify-end" : "justify-start"
              }`}
              style={{
                marginBottom: "10px", // Add margin between messages
              }}
              ref={index === messages.length - 1 ? lastMessageRef : null} // Assign ref to the last message
            >
              <div
                className={`p-3 rounded-md ${
                  message.type === "user"
                    ? "bg-gray-300 text-left"
                    : "bg-gray-200 text-left"
                }`}
                style={{
                  wordBreak: "break-word", // Ensure long words break correctly
                  overflowWrap: "break-word", // Break long words and URLs
                  maxWidth: "75%", // Prevent message boxes from becoming too wide
                }}
              >
                <ReactMarkdown>{message.text}</ReactMarkdown>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area and Footer */}
        <footer className="text-center w-full mt-auto">
          {/* Input Area */}
          <div className="w-full p-4">
            <form
              className="mx-2 flex flex-row gap-3 lg:mx-auto lg:max-w-3xl"
              onSubmit={handleSubmit} // Handle form submission
            >
              <div className="relative flex h-full flex-1">
                <div className="flex flex-col w-full py-2 pl-3 flex-grow md:py-3 md:pl-4 relative bg-gray-200 rounded-md">
                  <textarea
                    tabIndex="0"
                    data-id="root"
                    rows="1"
                    className="m-0 w-full resize-none border-0 bg-transparent p-0 pr-7 focus:ring-0 focus-visible:ring-0 outline-none overflow-y-hidden h-[23px] text-black"
                    placeholder="Ask away..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown} // Add keydown handler for Enter key
                  ></textarea>
                  {/* Submit Button with Left Arrow Icon */}
                  <button
                    type="submit"
                    className="absolute p-2 rounded-md text-white bg-black bottom-1.5 right-1 md:bottom-1.5 md:right-2 hover:bg-gray-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a1 1 0 01-.707-1.707l5.293-5.293H3a1 1 0 010-2h11.586L9.293 3.707A1 1 0 0110.707 2.293l7 7a1 1 0 010 1.414l-7 7A1 1 0 0110 18z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Page;
