const express = require('express');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3001;
const router = require('./router');

const app = express();

app.use(express.static('client'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const dbPath = path.join(__dirname, 'db/db.json'); // Specify the path to db.json

app.use((req, res, next) => {
  req.db = JSON.parse(fs.readFileSync(dbPath, 'utf8')); // Read db.json and attach it to req.db
  next();
});

app.use(router);


app.listen(PORT, () => console.log(`Running on Port http://localhost:${PORT}`));
