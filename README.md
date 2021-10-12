# Keeper App
### Live Site URL: [https://keeper-app-basuabhirup.vercel.app](https://keeper-app-basuabhirup.vercel.app/)
This project is a part of [The Complete 2021 Web Development Bootcamp](https://www.udemy.com/course/the-complete-web-development-bootcamp/) by [London App Brewery](https://www.londonappbrewery.com/), instructed by Dr. Angela Yu.
<div align="center">
    <img src="https://i.ibb.co/5RfDsTN/image.png" alt="Project Screenshot" width=720px>
</div>

## Objective of this Project
* To build a custom keeper app from the starting files
* To understand components, states and hooks in React
* To manage complex states and component tree in React

## Steps I have followed:
### Client-side Development:
1. Downloaded the starting files and installed the requiring dependencies using `npm install` command.
2. Created 4 components - `App`, `Header`, `Note` & `Footer` and edited them accordingly to render the corresponding elements in `ReactDOM`.
3. Rendered all the notes inside `src/notes.js` file dynamically as separate Note components.
```javascript
import notes from "../notes";
```
```jsx
{notes.map((note) => (
    <Note title={note.title} content={note.content} />
))}
```
4. Added a new `InputArea` component inside `App` so that users can submit new notes.
5. Added a `DELETE` button inside each `Note` component so that users can click that to delete a particular note.
6. Created a new state variable `note` using `React.useState()` hook inside `InputArea` component to keep track of the changes made in the input fields. 
```javascript
const [note, setNote] = useState({
    title: "",
    content: ""
})
function updateNote(e) {
    const name = e.target.name;
    const value = e.target.value;
    setNote({
        ...note,
        [name]: value
    })
}
```
```jsx
<input name="title" onChange={updateNote} placeholder="Title" value={note.title} />
<textarea name="content" onChange={updateNote} placeholder="Take a note..." rows="3" value={note.content} />
```
<br />

7. Created another state variable `notes` using `React.useState()` hook inside `App` component to save all the notes inside an array:
```javascript
const [notes, setNotes] = useState([]);

function addNote(note) {
    setNotes([...notes, note]);
}
```
<br />

8. Passed the `addNote` function from `App` to `InputArea`, so that a newly added note can be passed back from `InputArea` to `App` component:
```jsx
// Code inside 'components/App.jsx' file:
<InputArea onSubmit={addNote}/>
```
```jsx
// Code inside 'components/InputArea.jsx' file:
<form onSubmit={ (e) => {
    props.onSubmit(note);    
    e.preventDefault();
    setNote({ title: "", content: "" });
} }>
.....
</form>
```
<br />


9. Disconnected the `notes.js` file from the `App` component.
10. Rendered all the notes stored inside the `notes` array dynamically as separate Note components:
```jsx
{notes.map((note) => (
    <Note title={note.title} content={note.content} />
))}
```
<br />

11. Created a function inside the `App` component to delete any particular note and passed it to its child `Note` component. Also, modified the `map()` method to pass the `index` value as `id` of each individual `Note` component, so that it can be used to identify any particular note that needs deletion:
```javascript
function deleteNote(id) {
    setNotes(prevArray => {
        return prevArray.filter((note, index) => index !== id);
    })
}
```
```jsx
{notes.map((note, index) => (
    <Note key={`SGBPQ${index}`} id={index} onClick={deleteNote} title={note.title} content={note.content} />
))}
```
<br />

12. Modified the code inside the `Note` component, so that after receiving props from its parent `App` component it can use them properly to delete any particular note:
```jsx
<button onClick={ () => props.onClick(props.id)}>DELETE</button>
```
<br />

13. Added two dependencies from Material-UI using the `npm i @material-ui/icons @material-ui/core` command from the terminal.
14. Imported `@material-ui/icons/Add`, `@material-ui/icons/Delete`, `@material-ui/core/Fab` and `@material-ui/core/Zoom` elements and used them inside corresponding components to improve the UI.
15. Added another state variable `isClicked` using `React.useState()` hook inside `InputArea` component to manage its custom expansion functionality:
```javascript
const [isClicked, setIsClicked] = useState(false);
```
```jsx
<form onSubmit={setIsClicked(false); ....... } ....... />
.......
{isClicked && <input name="title" ....../>}
.......
<textArea name="content" onClick={ () => setIsClicked(true)} rows={isClicked ? "3" : "1"} ......./>
.......
<Zoom in={isClicked}>
    <Fab type="submit"><AddIcon /></Fab>
</Zoom>
```
<br />

16. Added a [transparent texture background](https://www.transparenttextures.com/patterns/black-thread-light.png) to the body of the webpage.

### Server-side Development:
17. Created a separate `server` directory, initialized NPM with `npm init -y` and installed necessary dependencies using `npm i express mongoose cors dotenv` command from the terminal.
18. Created a `server.js` file and required all the necessary dependencies:
```javascript
// Require necessary NPM modules:
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");

// Assign an appropriate port for the server to listen:
const port = process.env.PORT || 5000;

// Initial Middleware setup:
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());


// Connect to a new MongoDB Database, using Mongoose ODM:


// Create a new collection to store the notes:



// Handle HTTP requests:



// Enable the server to listen to the port:
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
})
```
<br />

19. Connected the server to a Mongo Atlas database `keeperDB` and a collection named `notes`:
```javascript
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
```
<br />

20. Set API endpoints to handle HTTP `GET`, `POST` and `DELETE` requests:
```javascript
// Handle HTTP requests:

// Handle 'GET' requests made on the '/' route:
app.get('/', (req, res) => {
  res.json({Connection: "Succesfully Established !"})
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
```
<br />
