const express = require('express');
const PORT = process.env.PORT || 3001;
const router = require('./router');

const app = express();

app.use(express.static('client'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);


app.listen(PORT, () => console.log(`Running on Port http://localhost:${PORT}`));
