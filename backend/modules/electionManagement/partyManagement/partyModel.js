const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const partySchema = new Schema({
    organisationName: { type: String, required: true},
    partyName : { type: String, required: true},
    founderName : { type: String, required: true},
    registeredOn : { type: String, required: true},
    address:{type: String, required: true, default: 'India'},
    partyEmail: {type:String,required:true},
    contactNo: {type: String}

})


// role : 1-> superadmin, 2-> zonal-admin, 3-> voters
module.exports = mongoose.model('Party',partySchema);