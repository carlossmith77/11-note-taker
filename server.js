const express = require('express');
const path = require('path');

const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const PORT = 3001;
let notes = loadData();

app.use(express.static('public'));
app.use(bodyParser.json());
app.get('/', (req, res) => res.send('Navigate to /send or /routes'));

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

app.get('/routes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/routes.html'))
);
app.get('/api/notes', (req, res) =>{
  res.send(notes);
});
let lastId = 1;
app.post('/api/notes', (req, res) =>{
    ++lastId;
    const note = {id:lastId, title:req.body.title, text:req.body.text}

    notes.push(note);
    res.send({status:1, message:"note posted"});
  });
app.delete("/api/notes/:id", (req, res) =>{
    const id = req.params.id;

    notes =notes.filter(row=>row.id !=id);
    res.send({status:1, message:"note deleted"});
})
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
function loadData ()
{
    let contents = fs.readFileSync('./db/db.json');
    let data = JSON.parse(contents);

    return data;
}
