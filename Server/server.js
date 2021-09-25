// Require necessary NPM modules:
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

// Assign an appropriate port for the server to listen:
const port = process.env.PORT || 5000;

// Initial setup:
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// Connect to a new MongoDB Database, using Mongoose ODM:

// Create a new collection inside the database to store data:


const notes = [
  {
    title: "1st Note from Server",
    content: "Lorem Ipsum Dolor Amet Teri ghur effetc."
  },
  {
    title: "2nd Note from Server",
    content: "Lorem Ipsum Dolor Amet Teri ghur effetc."
  },
  {
    title: "3rd Note from Server",
    content: "Lorem Ipsum Dolor Amet Teri ghur effetc."
  }
]

// Handle HTTP requests:

// Handle 'GET' requests made on the '/api/notes' route to get all notes:
app.get('/api/notes', (req, res) => {
  res.json(notes);
})

// Handle 'POST' requests made on the '/api/note/add' route to add a note:
app.post('/api/note/add', (req, res) => {
  notes.push(req.body);
  res.json(notes);
})

// Handle 'DELETE' requests made on the '/api/note/delete' route to delete a particular note:
app.delete('/api/note/delete', (req, res) => {
  const id = req.body.index;
  notes.splice(id, 1);
  res.json(notes);
})

// Enable the server to listen to the port:
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
})
