const express = require('express');
const Database = require('better-sqlite3');
const db = new Database('todos.db');

db.exec('CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT NOT NULL, completed INTEGER DEFAULT 0)')

const app = express(); //starts express server
app.use(express.json()); //receives json/
app.use(express.static('.')); //serves index.html
app.listen(3000, () => console.log('server running on http://localhost:3000')); //listens to port 3000, then prints to the logs that its running

//bridging the frontend to DB
app.get('/tasks', (req, res) => { const rows = db.prepare('SELECT * FROM tasks').all(); res.json(rows); });

//Adding task
app.post('/tasks', (req, res) => {db.prepare('INSERT INTO tasks(content) VALUES (?)').run(req.body.content); res.sendStatus(201); });




