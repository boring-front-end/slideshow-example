const express = require('express');
const FgBlue = '\x1b[34m';
const app = express();	
const path = require('path');

app.use(express.static(path.join(__dirname, '/docs')));
const port = 3000;
app.listen(port, () => {
  console.log(`${FgBlue}`, 'Example app listening on', `http://localhost:${port}`);
});