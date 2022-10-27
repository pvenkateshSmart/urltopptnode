const mongoose = require('mongoose')
//var shortHash = require('short-hash');

const Papertemplate = new mongoose.Schema({
    Exammodel: {
    type: String,
    },
    Examprgoram: {
    type: String,
    },
    Papersetter: {
    type: Array,
    },
    Paperreviewer: {
        type: Array,
        },     
    time : { type : Date, default: Date.now }
})

module.exports = mongoose.model('Papertemplate',Papertemplate,'Papertemplate')
