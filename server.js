// const PORT = process.env.PROT || 8080;
// const express = require('express');
// const cors = require('cors');
// const admin = require('firebase-admin');

// //download firebase service accounnt for the key
// // var serviceAccount = require("path to the downloaded key");

// // admin.initializeApp({
// //   credential: admin.credential.cert(serviceAccount)
// // });


// require('dotenv').config();

// const app = express();

// app.use(express.json());
// app.use(express.urlencoded({extended:true}));


// app.get('/', (req,res)=> {
//     res.json('YO!!');
// })

// app.post('/auth', async(req,res)=> {

//   //isLogin?
//   //run signIn
//   //else
//   //run signup

//   const user = {
//     email:req.body.email,
//     password: req.body.password 
//   }

//   const userResponse = await admin.auth().createUser({
//     email: user.email,
//     password:user.password,
//     emailVerified: false,
//     disabled:false
//   })

//   res.json(userResponse);
// })


// app.listen(8000, ()=> console.log(`server is running on ${PORT} `));

