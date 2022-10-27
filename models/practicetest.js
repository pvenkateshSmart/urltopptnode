const mongoose = require('mongoose')
var shortHash = require('short-hash');

const PracticeTestSchema = new mongoose.Schema({
    ExamType: {
    type: String,
    },
    Subjects: {
    type: Array,
    },
    Subjectname:{
      type:String
    },
    Topics:{
    type:Array,
  },
  TopicsArr:{
    type:Array
  },
  Level:{
    type:String
  },
  NoOfQueSub:{
    type:String
  },
  ExamTime:{
    type:String
  },
  QueLimit:{
    type:String
  },
  TimeLeft:{
    type:Number
  },
  Questions:{
      type:Object
  },
  uid:{
      type:String
  },
  suc:{
    type:String
  },
  branch:{
    type:String
  },
  section:{
    type:String
  },
  name:{
    type:String
  },
  time_left:{
    type:Number
  },
  examstatus:{
      type:String
  },
  summary:{
    type:Object
  },
  time : { type : Date, default: Date.now }
})

module.exports = mongoose.model('PracticeTest',PracticeTestSchema,'PracticeTest')
