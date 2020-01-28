const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username : { type: String, required: true},
    password : { type: String, required: true},
    firstname: {type: String,required:true},
    lastname: {type: String,required:true},
    location:{type: String, required: true, default: 'India'},
    email: {type:String,required:true},
    age: {type:Number, default: 18},
    gender: {type: String, required:true},
    role: {type: String, default: '3'},
    address: {type: String},
    voted: {type: Boolean, required: true, default: false}
})


// role : 1-> superadmin, 2-> zonal-admin, 3-> voters
module.exports = mongoose.model('User',userSchema);