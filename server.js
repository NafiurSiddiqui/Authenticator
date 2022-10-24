const PORT = process.env.PROT || 8000;
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
var serviceAccount = require("./authenticator-dev-nuff-firebase-adminsdk-e17h5-8aecdc4afc.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


require('dotenv').config();

const app = express();

app.use(express.json());



app.get('/', (req,res)=> {
    res.json('YO!!');
})

app.post('/auth', async(req,res)=> {

  //isLogin?
  //run signIn
  //else
  //run signup
})


app.listen(8000, ()=> console.log(`server is running on ${PORT} `));

