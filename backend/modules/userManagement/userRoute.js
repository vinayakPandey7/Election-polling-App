const express = require('express');
const router = express.Router();
const ctrl = require('./userController');

router.get('/all-user',ctrl.getAllUser);                    // get all user from database
router.post('/login',ctrl.login);                           // get login from database
router.post('/add-user',ctrl.addUser);                      // add new suer in database
router.put('/edit-user',ctrl.editUser)
router.delete('/delete-user',ctrl.removeUser);              // delete user from database
router.delete('/delete/:id',ctrl.removeSelectedUser);              // delete user from database
router.get('/check-user-avail/:username',ctrl.checkUserAvail)
router.put('/change-username',ctrl.updateUsername)


module.exports = router;

