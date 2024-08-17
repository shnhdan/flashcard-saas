import openai from '../../lib/openai';

export default async function handler(req, res) {
  const { topic } = req.body;

  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: Create a flashcard for the topic: ${topic},
    max_tokens: 200,
  });

  res.status(200).json({ flashcard: response.data.choices[0].text.trim() });
}