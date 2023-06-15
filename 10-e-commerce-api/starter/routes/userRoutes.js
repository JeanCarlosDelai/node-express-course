const express = require('express');
const router = express.Router();
const { authenticateUser, authorizePermissions } = require('../middleware/authentication')
const { showCurrentUser, getAllUsers, getSingleUser, updateUser, updateUserPassword } = require('../controllers/userController');

router.route('/').get(authenticateUser, authorizePermissions('admin', 'owner'), getAllUsers)

router.route('/showMe').get(showCurrentUser)
router.route('/updateUser').post(updateUser)
router.route('/updateUserPassword').post(updateUserPassword)

router.route('/:id').get(authenticateUser, getSingleUser)

module.exports = router;
