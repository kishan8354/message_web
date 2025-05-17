const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();

// Use PORT from environment variable (provided by Render) or default to 10000
const port = process.env.PORT || 10000;

// Enable CORS to allow the website to fetch data
app.use(cors());
app.use(express.json()); // Parse JSON bodies for POST requests

// API key from environment variable
const API_KEY = process.env.API_KEY || 'X7kP9mW3qT2rY8nF4vJ6hL5zB1cD';

// In-memory message store (replace with a database for production)
let messages = [
  {
    sender: 'User1',
    content: "print('Hello, World!')",
    type: 'code',
    language: 'python',
    timestamp: '2025-05-17T11:00:00Z'
  },
  {
    sender: 'User2',
    content: "Hi, how's it going?",
    type: 'text',
    timestamp: '2025-05-17T11:01:00Z'
  },
  {
    sender: 'User3',
    content: 'function greet() { return "Hello!"; }',
    type: 'code',
    language: 'javascript',
    timestamp: '2025-05-17T11:02:00Z'
  },
  {
    sender: 'User3',
    content: 'function greet() { return "Hello!"; }',
    type: 'code',
    language: 'javascript',
    timestamp: '2025-05-17T11:03:00Z'
  }
];

// Middleware to check API key
const authenticateAPIKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey || apiKey !== API_KEY) {
    return res.status(401).json({ error: 'Unauthorized: Invalid or missing API key' });
  }
  next();
};

// GET endpoint to fetch messages (requires API key)
app.get('/messages', authenticateAPIKey, (req, res) => {
  console.log('Serving messages:', messages);
  res.json(messages);
});

// POST endpoint to add a new message (requires API key)
app.post('/messages', authenticateAPIKey, (req, res) => {
  const { message, timestamp } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message content is required' });
  }

  const newMessage = {
    sender: 'PythonScript', // Hardcoded for now; could be dynamic
    content: message,
    type: message.includes('\n') || message.includes('{') || message.includes('(') ? 'code' : 'text', // Basic heuristic
    language: message.includes('def ') || message.includes('print(') ? 'python' : 'text', // Basic detection
    timestamp: timestamp || new Date().toISOString()
  };

  messages.push(newMessage);
  console.log('Added new message:', newMessage);
  res.status(201).json(newMessage);
});

// Serve static files from the public directory
const publicPath = path.join(__dirname, 'public');
console.log('Public directory path:', publicPath);
if (fs.existsSync(publicPath)) {
  console.log('Public directory exists. Contents:', fs.readdirSync(publicPath));
} else {
  console.error('Public directory does not exist:', publicPath);
}
app.use(express.static(publicPath));

// Catch-all route to serve index.html for any unknown paths
app.get('*', (req, res) => {
  const filePath = path.join(__dirname, 'public', 'index.html');
  console.log('Attempting to serve:', filePath);
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error('Error accessing index.html:', err);
      return res.status(500).json({ error: 'Failed to serve index.html', details: err.message });
    }
    res.sendFile(filePath);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`API running at http://localhost:${port}`);
});