const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

/**
 * TODO: Authentication with bcrypt
 */
// const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cors());
app.use(fileUpload());

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const vehicle = require('./routes/vehicle');
const search = require('./routes/search');
const people = require('./routes/people');
const auth = require('./routes/auth');

app.use(cookieParser())
app.use('/vehicle', vehicle);
app.use('/search', search);
app.use('/people', people);
app.use('/auth', auth);

app.use('/static', express.static(path.resolve(__dirname, './static')));

// app.get('*', (req, res) => {
//     return res.sendFile(path.join(__dirname, '../src/index.html'));
//   });

app.use((err, req, res, _next) => {
  console.log(err);
  res
    .status(err.status || 500)
    .json({ error: 'Internal Server Error', message: err.message });
});

const PORT = parseInt(process.env.PORT) || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
