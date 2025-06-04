import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useApiWithToken } from '../../../server/routes/api.cjs';
import Header from './Header';

export default function ChatWindow() {
  const api = useApiWithToken();
  const [messages, setMessages] = useState([]);
  const [prompt, setPrompt] = useState('');
  const [chatId, setChatId] = useState(null);

  // Create a new chat on first load (or fetch latest)
  useEffect(() => {
    const createChat = async () => {
      try {
        const res = await api.post('/chats', {}); // Clerk auth is assumed
        setChatId(res.data.id); // Chat ID from backend
      } catch (err) {
        console.error('Failed to create chat:', err);
      }
    };

    createChat();
  }, []);

  const handleSend = async () => {
    if (!prompt.trim() || !chatId) return;

    const userMessage = {
      sender: 'user',
      content: prompt,
    };

    setMessages((prev) => [...prev, userMessage]);
    setPrompt('');

    try {
      const res = await api.post('/gemini', {
        chatId,
        prompt,
      });

      const aiMessage = {
        sender: 'ai',
        content: res.data.reply,
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {/* <Header/> */}
      <div className="max-w-2xl mx-auto mt-10 p-4 bg-white rounded-2xl shadow-lg h-[80vh] flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-xl max-w-xs ${
                msg.sender === 'user' ? 'bg-blue-500 text-white ml-auto' : 'bg-gray-200 text-black'
              }`}
            >
              {msg.content}
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="flex-1 border border-gray-300 rounded-xl p-2"
            placeholder="Type your message..."
          />
          <button
            onClick={handleSend}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
 