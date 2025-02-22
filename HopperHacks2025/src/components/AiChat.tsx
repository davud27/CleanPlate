import { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

export function AiChat() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Initialize Gemini AI
    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    try {
      // Get response from Gemini
      const result = await model.generateContent(input);
      const response = await result.response;
      setResponse(response.text());
    } catch (error) {
      console.error('Error:', error);
      setResponse('Sorry, there was an error!');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
        />
        <button type="submit">Send</button>
      </form>
      
      {response && (
        <div>
          <h4>Response:</h4>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
} 