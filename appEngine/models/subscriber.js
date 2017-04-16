var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var subscriberSchema = new Schema({
  username : {type : String, required : true, unique : true},
  password : {type:String, required : true},
  email : {type : String, required : true , unique : true},
  verified : Boolean,
  created : Date,
  avatar : String,
  admin : Boolean
});
var Subscriber = mongoose.model('Subscriber', subscriberSchema);


module.exports = Subscriber;
