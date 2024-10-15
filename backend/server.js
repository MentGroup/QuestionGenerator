const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();  // Ensure your .env file contains the correct API key

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Correctly setting up OpenAI configuration
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY, // Make sure the .env file has OPENAI_API_KEY set
});
const openai = new OpenAIApi(configuration);  // Correct use of OpenAIApi with Configuration

// Route to handle question generation
app.post('/generate-questions', async (req, res) => {
  const { prompt } = req.body;

  // Input validation to ensure prompt is provided and is a string
  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Invalid or missing prompt' });
  }

  try {
    // Create a chat completion using GPT-3.5 Turbo model with a clear system message
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant helping students prepare for mentor sessions.'
        },
        {
          role: 'user',
          content: `
            The following is a description written by a student preparing for a mentoring call.
            Based on this description, generate 10-15 straightforward questions the student could ask 
            their mentor to gain more insight and guidance. Keep the questions practical and helpful for the mentoring session:

            Student's Description: "${prompt}"
          `
        }
      ],
      max_tokens: 2000,  // Allow a larger range for responses
      temperature: 0.7,  // Adds some creativity while keeping responses grounded
    });

    // Split the response into individual questions
    const questions = completion.data.choices[0].message.content.trim().split('\n').filter(Boolean);

    // Return the generated questions in JSON format
    res.json({ questions });
  } catch (error) {
    console.error('Error generating questions:', error.message);
    res.status(500).json({ error: 'Error generating questions. Please try again later.' });
  }
});

// Set the port (3007) and start the server
const PORT = process.env.PORT || 3007;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
