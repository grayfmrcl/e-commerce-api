const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const router = require('./routers');

const app = express();
const port = process.env.port || 3000;

const dbUrl = process.env.DB_URL;
mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log(`connected to db: ${dbUrl}`));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use('/', router);

app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Resource not found.',
  });
});

/* eslint no-unused-vars: ["error", { "args": "none" }] */
app.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    res.status(400).json({
      error: Object.values(err.errors).map(e => e.message),
    });
  } else if (err.name === 'CastError' && err.kind === 'ObjectId') {
    res.status(404).json({ error: 'Resource not found.' });
  } else {
    console.log(err);
    res.status(500).json({
      error: 'Something went wrong in the server.',
    });
  }
});

app.listen(port, () => {
  console.log(`connected to port ${port}`);
});
