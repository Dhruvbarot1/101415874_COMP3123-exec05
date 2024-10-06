const express = require('express');
const path = require('path');
const app = express();

// Route to serve home.html from the root directory
app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'home.html'));
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});


const fs = require('fs');

app.get('/profile', (req, res) => {
  fs.readFile('user.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading file');
    }
    res.json(JSON.parse(data));
  });
});
app.use(express.json());  // To parse JSON body

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  fs.readFile('user.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading file');
    }
    const user = JSON.parse(data);
    if (username !== user.username) {
      return res.json({ status: false, message: 'User Name is invalid' });
    }
    if (password !== 'your_password') {  // Replace with actual password handling logic
      return res.json({ status: false, message: 'Password is invalid' });
    }
    res.json({ status: true, message: 'User Is valid' });
  });
});
app.get('/logout/:username', (req, res) => {
  const username = req.params.username;
  res.send(`<b>${username} successfully logged out.<b>`);
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Server Error');
});
