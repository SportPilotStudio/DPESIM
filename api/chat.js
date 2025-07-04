export default async function handler(req, res) {
  const { messages, certificate } = req.body;

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
            content: `You are a Designated Pilot Examiner (DPE) conducting a realistic FAA oral exam for a ${certificate} pilot. Ask relevant questions, evaluate answers like a DPE, and follow up if needed.`,
          },
          ...messages,
        ],
      }),
    });

    const data = await response.json();
    res.status(200).json({ reply: data.choices?.[0]?.message?.content || 'No response from OpenAI.' });
  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ reply: 'Server error connecting to OpenAI.' });
  }
}
