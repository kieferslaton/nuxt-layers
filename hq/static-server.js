const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, '.output/public')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '.output/public/index.html'));
});

app.listen(8080);