// Require necessary NPM modules:
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
// const path = require('path');

// Assign an appropriate port for the server to listen:
const port = process.env.PORT || 5000;

// Initial Middleware setup:
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
// app.use(express.static(path.join(__dirname, '../Client', 'build')));


// Connect to a new MongoDB Database, using Mongoose ODM:
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.m5s9h.mongodb.net/keeperDB`);

mongoose.connection.once('open', () => {
  console.log(`Connected to Mongo Atlas Database`);
})

// Create a new collection to store the notes:
const noteSchema = new mongoose.Schema ({
	title: String,
	content: String
}, {
  timestamps: true
})

const Note = mongoose.model('Note', noteSchema);



// Handle HTTP requests:

// Handle 'GET' requests made on the '/' route (In future projects, this may serve the client's optimized production build):
app.get('/', (req, res) => {
  res.json({Connection: "Succesfully Established !"})
  // res.sendFile(path.join(__dirname, '../Client', 'build', 'index.html'));
});

// Handle 'GET' requests made on the '/api/notes' route to get all notes:
app.get('/api/notes', (req, res) => {
  Note.find({}, (err, notes) => {
    if(!err) {
      res.json(notes);
    } else {
      res.status(400).json({"error": err});
    }
  })
})

// Handle 'POST' requests made on the '/api/note/add' route to add a note:
app.post('/api/note/add', (req, res) => {
  const note = new Note(req.body);
  note.save(err => {
    if(!err) {
      res.redirect('/api/notes');
    } else {
      res.status(400).json({"error": err});
    }
  })
})

// Handle 'DELETE' requests made on the '/api/note/delete' route to delete a particular note:
app.delete('/api/note/delete', (req, res) => {
  const id = req.body.objId;
  Note.findByIdAndRemove(id, err => {
    if(!err) {
      res.json(`Deleted note with id: ${id} !`);
    } else {
      res.status(400).json({"error": err});
    }
  })
})

// Enable the server to listen to the port:
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
})