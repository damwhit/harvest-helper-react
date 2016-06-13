const path = require('path');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, '/')));

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html');
});

app.listen(PORT, function() {
  console.log("Server is up and running on port: " + PORT);
});

module.exports = app;
