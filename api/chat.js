export default async function handler(req, res) {
  const { messages, certificate } = req.body;

  try {
    const response = await fetch('/api/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    certificate,
    messages: newMessages.map(msg => ({
      role: msg.sender === 'You' ? 'user' : 'assistant',
      content: msg.text,
    })),
  }),
});
 ...messages,
        ],
      }),
    const data = await response.json();
    res.status(200).json({ reply: data.choices?.[0]?.message?.content || 'No response from OpenAI.' });
  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ reply: 'Server error connecting to OpenAI.' });
  }
}
