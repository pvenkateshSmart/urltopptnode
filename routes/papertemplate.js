const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false
})
const Papertemplate = require('../models/papertemplate')
 

 
const { route} = require('.');
 
router.post('/', async (req, res) => {
   
  try {
    
    await Papertemplate.create(req.body)
    //res.redirect('/dashboard')
  } catch (err) {
    console.error(err)
    //res.render('error/500')
  }
});
module.exports = router;