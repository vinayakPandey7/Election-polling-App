const express = require('express');
const router = express.Router();
const ctrl = require('./electionController');
const auth = require("../../middleware/auth");

router.get('/new-elect',auth,ctrl.newElec); 
router.get('/current-elect',ctrl.currentElections); 
router.put('/submit-vote',ctrl.submitVote); 

module.exports = router;

