const express = require('express');
const fs = require('fs');
const { title } = require('process');
const app = express();

app.use(express.json());

app.post('/blogs', (req, res) => {
  const { title, content } = req.body;
  fs.writeFileSync(title, content);
  res.end('ok');
});

app.patch('/posts/:title', (req, res) => {
  const { title, content } = req.body;
  if (fs.existsSync(title)) {
    fs.writeFileSync(title, content);
    res.end('ok');
  } else {
    res.send('This post does not exist!');
  }
});

app.delete('/blogs/:title', (req, res) => {
  const title = req.params.title;
  if (fs.existsSync(title)) {
    fs.unlinkSync(title);
    res.end('ok');
  } else {
    res.send('This post does not exist!');
  }
});

app.get('/blogs/:title', (req, res) => {
  const title = req.params.title;
  if (fs.existsSync(title)) {
    const post = fs.readFileSync(title);
    res.send(post);
  } else {
    res.send('This post does not exist!');
  }
});

app.get('/blogs', (req, res) => {
  fs.readdir('./', (err, titles) => {
    if (err) {
      res.send('Error reading directory:', err);
    } else {
      res.send(titles);
    }
  });
});

app.get('/', function (req, res) {
  res.send('Hello World');
});

app.listen(3000);
