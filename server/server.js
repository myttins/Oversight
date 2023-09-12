const express = require('express')

const bcrypt = require('bcrypt')
const path = require('path')
const cookieParser = require('cookie-parser')
require('dotenv').config({path: path.resolve(__dirname, '../.env')})

const app = express();
app.use(express.json());






const PORT = parseInt(process.env.PORT) || 3000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})