
const User = require('./userModel');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

exports.login = (req,res) => {

    User.findOne({username:req.body.username})
    .exec()
    .then((user) => {

        bcrypt.compare(req.body.password, user.password, (err,result) => {
            if (err) {
                return res.status(401).json({
                    message: "Auth failed"
                });
            } 
            if(result) {
                const token = jwt.sign({
                    username: user.username,
                    userId: user._id,
                    email:user.email,
                },
                // process.env.JWT_KEY,
                'secretkey', 
                { expiresIn:'1d' }
                );

                let userDetail = {
                    username: user.username,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    age: user.age,
                    email: user.email
                }
                return res.status(200).send({
                    success: true,
                    message: "user found in the record",
		            userDetail: userDetail,
                    token: token
                });
            }
            res.status(401).json({
		success: false,
                message: "Auth failed"
            });
        });
    })
    .catch(err => {

        res.status(200).json({
	    success: false,
            error: err
        });
    });

}

exports.addUser = (req,res) => {

    let password = req.body.password;
    var hash = bcrypt.hashSync(password, 10);
    new User({
        firstname:req.body.firstname,
        lastname: req.body.lastname,
        username : req.body.username,
        password: hash,
        age: Number(req.body.age),
        gender: req.body.gender,
        email:req.body.email,
        location: req.body.location,
        
    })
    .save()
    .then((user)=> {
        if (user){
            return res.status(200).send({
                success: true,
                message: 'User is successfully registered',
                
            })
        }
        
    })
    .catch((err)=> {
        if (err){
            return  res.status(401).send({
                success: false,
                message: 'Failed to register the user',
                error: err
            })
        }
      
    })
    
}

exports.editUser = (req,res) => {

    User.find({_id:req.body._id})
    .exec()
    .then((result)=>{
        if(result.length>0){
            // if username is not in DB update
            User.updateOne(
            {_id:req.body._id},
            {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                gender: req.body.gender,
                age: req.body.age,
                location: req.body.location,
                address: req.body.address
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

exports.removeUser = (req,res) => {
    let password = req.body.password;
    User.findOne({username:req.body.username})
    .exec()
    .then((user)=> {
        if(user.length>0){

            bcrypt.compareSync(password, user.password, (err, result) => {
                if (result) {
                    user.deleteOne({username:req.body.username, password:result.password})
                    .exec()
                    .then(user => {
                        if (user.length>0){
                            return res.status(200).send({
                                success: true,
                                message: "user deleted successfully"
                            })
                        }
                    })
                    .catch(err=> {
                        if (err){
                            return res.status(400).send({
                                success: false,
                                message: "failed to delete user"
                            })
                        }
                    })
                } else {
                    return res.status(401).send({
                        success: false,
                        message: "password is not matched, try again!"
                    })
                }
            })
        }else {
            return res.status(200).send({
                status: true,
                message: "no user is found of this username"
            })
        }
    })
    .catch(err => {
        if (err){
            return res.status(401).send({
                success: false,
                message: "failed to get user detail. try again"
            })
        } 
    })

}

exports.getAllUser = (req,res) => {
    User.find({},{password:0})
    .exec()
    .then(user => {
        if(user.length>0){
            console.log(user)
            return res.status(200).send({
                success: true,
                data: user
            })
        }
        else{
            return res.status(200).send({
                success: true,
                data:"no user available"
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

exports.checkUserAvail = (req,res)=>{
    console.log(req.params.username)
    User.find({username:req.params.username})
    .exec()
    .then((result)=>{
        // console.log(res)
        if(result.length>0){
            return res.status(200).send({
                success: false,
                message: "username is unavailable"
            })
        } else {
            // if username is not in db 
            return res.status(200).send({
                success: true,
                message: "username is available"
            })
        }
        
    })
    .catch(err=> {
        console.log(err)
    })
}

exports.updateUsername = (req,res)=>{
    console.log(req.body.email)
    User.find({username:req.body.username})
    .exec()
    .then((result)=>{
        console.log(result)
        if(result.length>0){
            return res.status(200).send({
                success: false,
                message: "username already available"
            })
        } else {
            // if username is not in DB update
            console.log("in else")
            User.updateOne({email:req.body.email},{username:req.body.username})
            .then(updatedResult=> {
                console.log(updatedResult)
                
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
        }
        
    })
    .catch(err=> {
        console.log(err)
    })
}

exports.removeSelectedUser = (req,res) => {
    
    User.deleteOne({_id:req.params.id})
    .exec()
    .then(res => {
        return res.status(200).send({
            success: true,
            message: "user deleted successfully"
        })
    })
    .catch(err=> {
        if (err){
            return res.status(400).send({
                success: false,
                message: "failed to delete user"
            })
        }
    })

}