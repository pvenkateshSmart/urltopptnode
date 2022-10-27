require('dotenv').config()

var express = require('express');
var router = express.Router();
const axios = require('axios');
const { route } = require('./pdftoppt');
//fs = require('fs'),
const jwt = require('jsonwebtoken')


/* GET users listing. */
// router.get('/', async function (req, res, next) { 
//     const config = {
//         headers: {
//             'Content-Type': 'application/x-www-form-urlencoded'
//         }
//     };
    
// 	var SetObjurl={
//         "url":"http://exam.aditya.ac.in/touchstone/downlaod_paper.html?papercode=220910151129733&subject=CHEMISTRY",
//         "output":"pdf", "pdf": {
//             "width":"1920",
//             "height":"1080"
//         },
//         "emulateScreenMedia":true
//         };

// axios.post('https://apis.aditya.ac.in/url2pdf/render', SetObjurl,{responseType:'arraybuffer'})
//     .then((resp) => {
//         //console.log(resp.data);
//         //res.send(resp);
//        // res.send(new Buffer(resp.data));
//         //const buf = Buffer.from(resp.data, 'utf8');
//         //let buf=fs.writeFileSync('test.pdf', resp.data)
//         //res.send(buf);
//         //downloadBlob(response.data,"t.pdf");
      
//        //var setdata=new Blob([response.data], {type: "application/pdf"})
//         let buf=fs.writeFileSync('test2.pdf', resp.data)
         
        
//     }).catch((err) => {
//         console.log('testerr');
//         //console.error(err);
//     });
   
// });

 posts=[
  {
    "username":"venky",
    "password":"set"
  },
  {
    "username":"super",
    "password":"aditya"
  }
];

router.get('/posts',authenticateToken,(req,res)=>{
  console.log(req.user.name);
  res.json(posts.filter(post=>post.username===req.user.name));

})

router.post('/login',(req,res)=>{
  const username=req.body.username;
  const user={name:username}

  const accrestoken=jwt.sign(user,process.env.ACCESS_TOKEN_SECRET)
  res.json({accrestoken:accrestoken})
})
// router.get('/:id', async function (req, res, next) { 
    
// });

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log(err)
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}
module.exports = router;