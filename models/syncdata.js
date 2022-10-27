const mongoose = require('mongoose')
var shortHash = require('short-hash');

const TopicsdataSchema = new mongoose.Schema({
    Subjectid: {
    type: String,
    },
    Subjectname: {
     type: String,
     },
    subjectData: {
    type: Object,
    },
  time : { type : Date, default: Date.now }
})

module.exports = mongoose.model('Topicsdata',TopicsdataSchema,'Topicsdata')
