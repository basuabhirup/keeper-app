# Keeper App
This project is a part of [The Complete 2021 Web Development Bootcamp](https://www.udemy.com/course/the-complete-web-development-bootcamp/) by [London App Brewery](https://www.londonappbrewery.com/), instructed by Dr. Angela Yu.
<div align="center">
    <img src="" alt="Project Screenshot" width=720px>
</div>

## Objective of this Project
* To build a custom keeper app from the starting files

## Steps I have followed:
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