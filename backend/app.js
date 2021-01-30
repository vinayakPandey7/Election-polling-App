// import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var cors = require('cors')


// set up dependencies
const app = express();
app.use(cors()) // Use this after the variable declaration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


// connect mongoDB
mongoose.connect('mongodb://localhost/loginApp')
    .then( () => {
        console.log("mongodb is connected")
    })
    .catch((error) => {
        console.log("error occured while connecting database")
    })



const userRoute = require('./modules/userManagement/userRoute.js')
const electRoute = require('./modules/electionManagement/electionRoute.js')
const partyRoute = require('./modules/electionManagement/partyManagement/partyRoute.js')

// set up route
// app.get('/api', (req, res,next) => {
//     res.status(200).json({
//       message: 'Welcome to Project Support',
//     });
//   });

app.use('/api/user', userRoute);
app.use('/api/elect', electRoute);
app.use('/api/party', partyRoute);


// setup port and run server

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => {
    console.log('server is running on port '+app.get('port'))
})


