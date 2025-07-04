import React, { useState } from 'react';

function ChatBox({ certificate }) {
  const [messages, setMessages] = useState([
    { sender: 'DPE', text: `Welcome to your ${certificate} oral exam. Let's begin. What documents must you carry as a pilot?` }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: 'You', text: input }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            { role: 'system', content: `You are a Designated Pilot Examiner (DPE) conducting a ${certificate} pilot oral exam. Ask realistic FAA-style questions, respond to answers like a DPE would, and simulate follow-up if needed.` },
            ...newMessages.map(msg => ({
              role: msg.sender === 'You' ? 'user' : 'assistant',
              content: msg.text,
            }))
          ],
        }),
      });

      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content || 'Something went wrong.';

      setMessages([...newMessages, { sender: 'DPE', text: reply }]);
      setInput('');
    } catch (error) {
      setMessages([...newMessages, { sender: 'DPE', text: 'Error contacting AI. Please try again later.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{ border: '1px solid #ccc', padding: '1rem', height: '300px', overflowY: 'auto', background: '#f9f9f9' }}>
        {messages.map((msg, i) => (
          <p key={i}><strong>{msg.sender}:</strong> {msg.text}</p>
        ))}
      </div>

      <div style={{ marginTop: '1rem' }}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your answer..."
          style={{ padding: '0.5rem', width: '70%' }}
        />
        <button onClick={sendMessage} disabled={loading} style={{ padding: '0.5rem', marginLeft: '1rem' }}>
          {loading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
}

export default ChatBox;
