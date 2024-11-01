// server.js
require('dotenv').config();
const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const app = express();

const PORT = process.env.PORT || 3000;
const API_URL = process.env.API_URL;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Backend route to handle API requests
app.get('/api/download', async (req, res) => {
    const videoUrl = req.query.url;
    try {
        const response = await fetch(`${API_URL}${encodeURIComponent(videoUrl)}`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data from API' });
    }
});

// Serve index.html for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
