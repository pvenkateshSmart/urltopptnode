require('dotenv').config()
const express = require('express')
const app = express()
const jwt = require('jsonwebtoken');
const refreshtokens=[];


app.get('/toekn',(req,res)=>{
    const refreshtoken=req.body.token
    if(refreshtoken==null) return res.sendStatus(401)
    if(!refreshtokens.includes(resfreshtoken)) return res.sendStatus(403)
    jwt.verify(refreshtoken,precess.env.ACCESS_TOKEN_SECRET,(err,user)=>{
        const accrestoken=generareAccressToken({name:user.name})
        res.json({accrestoken:accrestoken})
    })
})

app.delete('/logout', (req, res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token)
    res.sendStatus(204)
  })
  app.post('/login',(req,res)=>{
    const username=req.body.username;
    const user={name:username}
  
    const accrestoken=generareAccressToken(user)
    const refreshtoken=jwt.sign(user,process.env.REFRESH_TOKEN_SECRET);
    refreshtokens.push(refreshtoken);
    res.json({accrestoken:accrestoken,refreshtoken:refreshtoken})
  })


function generareAccressToken(user){    
    jwt.sign(user,process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15s'})
}
app.post('/login', (req, res) => {
    // Authenticate User
  
    const username = req.body.username
    const user = { name: username }
  
    const accessToken = generateAccessToken(user)
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    refreshTokens.push(refreshToken)
    res.json({ accessToken: accessToken, refreshToken: refreshToken })
  })
  
  function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
  }
  app.listen(4000)
