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

app.use(cookieParser());
app.use('/api/vehicle', vehicle);
app.use('/api/search', search);
app.use('/api/people', people);
app.use('/api/auth', auth);

// Serve static files from 'public' directory
app.use('/public', express.static(path.join(__dirname, '../public')));

// Serve the React application
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.use((req, res) => {
  return res.status(404).json({ message: 'API route not found.' });
});

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
