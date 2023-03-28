const express = require('express');
const openai = require('openai');

const app = express();
const port = 3000;

// Set up OpenAI API credentials
openai.apiKey = 'process.env.OPENAI_API_KEY';

// Serve the HTML file when the root URL is requested
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Handle form submission
app.get('/submit', (req, res) => {
  const prompt = req.query.prompt;

  // Call the OpenAI API with the prompt
  openai.completion.create({
    engine: 'text-davinci-002',
    prompt: prompt,
    maxTokens: 100,
    n: 1,
    stop: ['\n']
  })
  .then(response => {
    const text = response.data.choices[0].text;

    // Display the result to the user
    res.send(text);
  })
  .catch(error => {
    console.log(error);
    res.send('An error occurred');
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

