const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


if (process.env.ENV === 'Test') {
  console.log('This is a test');
  const db = mongoose.connect('mongodb://localhost/bookAPI_Test');
} else {
  console.log('This is for real');
  const db = mongoose.connect('mongodb://localhost/bookAPI_prod');
}

const app = express();
const port = process.env.PORT || 3000;
const Book = require('./models/bookModel');
const bookRouter = require('./routes/bookRouter')(Book);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('Welcom to my Nodemon API!');
});

app.server = app.listen(port, () => {
  console.log(`Running on por ${port}`);
});

module.exports = app;