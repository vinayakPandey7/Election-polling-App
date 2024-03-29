
const Party = require('./partyModel');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

exports.newParty = (req,res) => {
    console.log(req.body)
    new Party({
        organisationName: req.body.organisationName,
        partyName : req.body.partyName,
        founderName : req.body.founderName,
        registeredOn : req.body.registeredOn,
        address: req.body.address,
        partyEmail: req.body.partyEmail,
        contactNo: req.body.contactNo
    })
    .save()
    .then((elect)=> {
        if (elect){
            return res.status(200).send({
                success: true,
                message: 'New party added successfully',
                
            })
        }
        
    })
    .catch((err)=> {
        if (err){
            return  res.status(401).send({
                success: false,
                message: 'Failed to add new party',
                error: err
            })
        }
      
    })

}

exports.showAllParties = (req,res) => {
    
    Party.find({})
    .exec()
    .then(elect => {
        if(elect.length>0){
            return res.status(200).send({
                success: true,
                data: elect
            })
        }
        else{
            return res.status(200).send({
                success: true,
                message:"no party data!"
            })
        }
    })
    .catch(err => {
        return res.status.send({
            success: false,
            message: "error occured while retrieving data",
            data: err
        })
    })
}


exports.editParty = (req,res) => {

    Party.find({_id:req.body.partyId})
    .exec()
    .then((result)=>{
        if(result.length>0){
            // if username is not in DB update
            Party.updateOne(
            {_id:req.body.partyId},
            {
                partyName : req.body.partyName,
                founderName : req.body.founderName,
                registeredOn : req.body.registeredOn,
                address: req.body.address,
                partyEmail: req.body.partyEmail,
                contactNo: req.body.contactNo
            })
            .then(updatedResult=> {
                    return res.status(200).send({
                        success: true,
                        message: "Party data updated successfully"
                    })
            })
            .catch(err=>{
                return res.status(400).send({
                    success:false,
                    message: "error occured while updating party data"
                })
            })
        
        } else {
            return res.status(400).send({
                success:false,
                message: "error occured while updating party data"
            })
        }
    })
    .catch(err=> {
        console.log(err)
    })

}