require('dotenv').config();
const { dbConnection } = require('./db/connection.js');
const express = require('express');

const PORT = process.env.PORT || 5050;

const app = express();

dbConnection();

// app.use(express.json());

app.use('/api', require('./routes/api.js'));

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
