export default async function handler(req, res) {
  const { messages, certificate } = req.body;

  if (!process.env.OPENAI_API_KEY) {
    console.error('❌ Missing OpenAI API key');
    return res.status(500).json({ reply: 'Missing OpenAI API key on server.' });
  }

  if (!messages || !Array.isArray(messages)) {
    console.error('❌ Invalid messages array:', messages);
    return res.status(400).json({ reply: 'Invalid messages array.' });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `You are a Designated Pilot Examiner (DPE) conducting a realistic FAA oral exam for a ${certificate} pilot.`,
          },
          ...messages,
        ],
      }),
    });

    const data = await response.json();
    console.log('✅ OpenAI response:', data);

    if (data.error) {
      console.error('❌ OpenAI returned an error:', data.error);
      return res.status(500).json({ reply: 'OpenAI API error occurred.' });
    }

    const reply = data.choices?.[0]?.message?.content || 'No response from OpenAI.';
    res.status(200).json({ reply });
  } catch (err) {
    console.error('❌ Server error:', err);
    res.status(500).json({ reply: 'Server error connecting to OpenAI.' });
  }
}
