const express = require('express');
const router = express.Router();
const ctrl = require('./partyController');

router.post('/add-party',ctrl.newParty); 
router.get('/all-parties',ctrl.showAllParties); 
router.put('/edit-party',ctrl.editParty); 

module.exports = router;

