import React, { useState } from "react";

function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInputText] = useState<string>("");

  const handleSendMessage = async () => {
    if (input.trim() === "") {
      return;
    }

    
    const userMessage: Message = {
      text: input,
      isUserMessage: true,
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      const ipdata = { messages: [{ content: input, role: "user" }] };
      console.log("ipdata:", ipdata);
      console.log("messages:", ipdata.messages);

      const response = await fetch("http://localhost:3000/api/getRes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ipdata),
      });

      if (response.ok) {
        const data = await response.text();

        
        const responseMessage: Message = {
          text: data,
          isUserMessage: false,
        };
        setMessages((prevMessages) => [...prevMessages, responseMessage]);
      } else {
        console.error("POST Request failed:", response.statusText);
        // Handle the error as needed, e.g., show an error message to the user
      }
    } catch (error) {
      console.error("POST Request error:", error);
      // Handle the error as needed, e.g., show an error message to the user
    }

    setInputText("");
  };

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", backgroundColor: "#f3f4f6" }}>
      <div style={{ width: "24rem", padding: "1rem", backgroundColor: "#4b7bec", borderRadius: "1rem", boxShadow: "0 0 1rem rgba(0, 0, 0, 0.2)" }}>
        <div style={{ height: "22rem", padding: "1rem", overflowY: "auto", backgroundColor: "#f3f4f6" }}>
          {messages.map((message, index) => (
            <div
              key={index}
              style={{
                padding: "0.5rem",
                backgroundColor: message.isUserMessage ? "#4b7bec" : "#ffa500",
                color: message.isUserMessage ? "#fff" : "#000",
                alignSelf: message.isUserMessage ? "flex-end" : "flex-start",
                borderRadius: message.isUserMessage ? "1rem 0 1rem 1rem" : "0 1rem 1rem 1rem",
                marginBottom: "0.5rem",
                maxWidth: "80%",
                overflowWrap: "break-word",
              }}
            >
              {message.text}
            </div>
          ))}
        </div>
        <div style={{ marginTop: "1rem", display: "flex", justifyContent: "space-between" }}>
          <input
            type="text"
            placeholder="Type your message..."
            style={{ flex: 1, padding: "0.5rem", border: "1px solid #ccc", borderRadius: "0.25rem" }}
            value={input}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button
            onClick={handleSendMessage}
            style={{ backgroundColor: "#4b7bec", color: "#fff", padding: "0.5rem 1rem", borderRadius: "0.25rem", cursor: "pointer" }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatWindow;

interface Message {
  text: string;
  isUserMessage: boolean;
}
