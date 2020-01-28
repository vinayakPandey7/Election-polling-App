
const Election = require('./electionModel.js');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

exports.newElec = (req,res) => {

    new Election({
        organisation:req.body.organisation,
        email:req.body.email,
        location: req.body.location,
        parties: req.body.parties 
    })
    .save()
    .then((elect)=> {
        if (elect){
            return res.status(200).send({
                success: true,
                message: 'New election created successfully',
                
            })
        }
        
    })
    .catch((err)=> {
        if (err){
            return  res.status(401).send({
                success: false,
                message: 'Failed to create new election',
                error: err
            })
        }
      
    })

}

exports.currentElections = (req,res) => {
    
    Election.find({})
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
                data:"no Election held!"
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


exports.submitVote = (req,res) => {

    Election.find({_id:req.body.electionId})
    .exec()
    .then((result)=>{
        if(result.length>0){
            // if username is not in DB update
            Election.updateOne(
            {_id:req.body._id},
            {
                organisation: req.body.organisation,
                email: req.body.email,
                location: req.body.location,
                // parties: {voterId: req.body.voterId, parties: req.body.partyId}
            })
            .then(updatedResult=> {
                    return res.status(200).send({
                        success: true,
                        message: "username updated successfully"
                    })
            })
            .catch(err=>{
                return res.status(400).send({
                    success:false,
                    message: "error occured while updating username"
                })
            })
        
        } else {
            return res.status(400).send({
                success:false,
                message: "error occured while updating username"
            })
        }
    })
    .catch(err=> {
        console.log(err)
    })

}