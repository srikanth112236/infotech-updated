const mongoose = require('mongoose');
// require('dotenv').config();

mongoose
  .connect("")
  .then(() => {
    console.log('DB Connected');
  })
  .catch(() => {
    console.log('failed');
  });

const newSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email:{
    type:String,
    required:true,
  },
  phone:{
    type:String,
    required:true,
  },
  company:{
    type:String,
    required:true,
  },
  service:{
    type:String,
  },
  msg:{
    type:String,
  }
});

const collection = mongoose.model('Clienttrail', newSchema);

module.exports = collection;
