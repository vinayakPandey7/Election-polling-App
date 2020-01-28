const express = require('express');
const router = express.Router();
const ctrl = require('./electionController');

router.get('/new-elect',ctrl.newElec); 
router.get('/current-elect',ctrl.currentElections); 
router.put('/submit-vote',ctrl.submitVote); 

module.exports = router;

