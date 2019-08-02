const express = require('express');
const cors = require('cors');
const app = express();

// settings
app.set('port', process.env.PORT || 4000);

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.get('api/users', (req, res) => res.send('Users Routes'));
app.get('api/notes', (req, res) => res.send('Notes Routes'));

module.exports = app;