const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path'); // Require the path module

const app = express();

// Use body-parser middleware to parse request body
app.use(bodyParser.json());

// Serve the static HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// POST endpoint for OpenAI API
app.post('/openai', async (req, res) => {
  try {
    const { prompt } = req.body; // Get prompt from request body

    // Call OpenAI API with prompt
    const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
      prompt: prompt,
      max_tokens: 10,
      n: 1,
      stop: '\n'
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` // Replace with your OpenAI API key
      }
    });

    // Return API response
    res.status(200).json({ response: response.data.choices[0].text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));

