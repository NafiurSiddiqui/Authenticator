const PORT = 8000;

const express = require('express');
const cors = require('cors');
const axios = require('axios');

require('dotenv').config();

const app = express();

app.get('/', (req,res)=> {
    res.json('YO!!');
})

app.get('/auth', (req,res)=> {
    axios.request()
})


app.listen(8000, ()=> console.log(`server is running on ${PORT} `));

