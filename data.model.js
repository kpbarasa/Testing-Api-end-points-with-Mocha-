const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const dbDataSchema = new Schema({
  id: {
    type: String,  
    minlength: 3
  },
  tittle: {
    type: String, 
    required: true, 
    minlength: 3
  }
}, {
  timestamps: true,
});

const dbData = mongoose.model('dbData', dbDataSchema);

module.exports = dbData;