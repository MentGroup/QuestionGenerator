const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const OpenAIApi = require('openai');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAIApi({ apiKey: process.env.OPENAI_API_KEY });

app.post('/generate-questions', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Invalid or missing prompt' });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `
            You are a helpful assistant generating high-quality, detailed questions for mentoring sessions. 
            The questions should be insightful and practical, allowing for up to two sentences per question. 
            The questions should not include any bullet points, hyphens, or numbering. Ensure the questions are clearly written without unnecessary formatting.
          `
        },
        {
          role: 'user',
          content: `
            The following is a description written by a student preparing for a mentoring call.
            Based only on this description, generate 10-15 detailed, insightful questions the student could ask 
            their mentor to gain more insight and guidance. Allow for up to two sentences per question. 
            Keep the questions practical and helpful for the mentoring session. **Do not include any numbering, bullet points, 
            hyphens, or any other symbols in the output.** The output should be just plain questions, one per line, without 
            any special formatting or additional text.
        
            Student's Description: "${prompt}"
          `
        }
      ],
      max_tokens: 2000,
      temperature: 0.7,
    });

    const questions = completion.choices[0].message.content
      .trim()
      .split('\n')
      .map(question => question.replace(/^-|\d+\.\s*/, '').trim())
      .filter(Boolean);

    res.json({ questions });
  } catch (error) {
    console.error('Error generating questions:', error.message);
    res.status(500).json({ error: 'Error generating questions. Please try again later.' });
  }
});

const PORT = process.env.PORT || 3007;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});