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

app.use((err, req, res) => {
  res.status(500).json({
    error: 'Oops... Something went wrong on the server.',
  });
});

app.listen(port, () => {
  console.log(`connected to port ${port}`);
});
