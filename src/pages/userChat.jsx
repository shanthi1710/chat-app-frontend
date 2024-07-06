import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('https://chat-app-limi.onrender.com');  


export default function UserChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  console.log(messages)
  useEffect(() => {
    console.log("in useeeffedfksadefjils");
    
    socket.on('recvMsg', (msg) => {
      console.log("receiving", msg)
      setMessages((prevMessages) => [...prevMessages, msg]);
    });   

    return () => {
      socket.off('recvMsg');
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (input.trim()) {
      const newMsg = { text: input, user: 'You' };
      console.log("sending image")
      setMessages((prevMessages) => [...prevMessages, newMsg]);

      socket.emit('sending', newMsg);
      setInput('');
    }
  };

  return (
    <div className='min-h-screen flex justify-center items-center'>
      <div className="w-full h-screen flex flex-col bg-gray-100">
        <div className="flex flex-col flex-1 overflow-y-auto p-16">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 p-3 rounded-lg ${
                message.user === 'You' ? 'bg-blue-500 text-white self-end' : 'bg-gray-300 self-end mr-auto'
              }`}
            >
              <p>{message.text}</p>
            </div>
          ))}
        </div>
        <form onSubmit={sendMessage} className="bg-white p-4 flex justify-between items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 border rounded-lg p-2 mr-2"
            placeholder="Type your message..."
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
