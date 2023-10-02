const express = require('express');
const cors = require('cors');

/**
 * TODO: Authentication with bcrypt
 */
// const bcrypt = require('bcrypt');
// const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cors());

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const vehicle = require('./routes/vehicle')

app.use('/vehicle', vehicle);

app.use('/static', express.static(path.resolve(__dirname, './static')));


// app.get('*', (req, res) => {
//     return res.sendFile(path.join(__dirname, '../src/index.html'));
//   });

const PORT = parseInt(process.env.PORT) || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
