const express = require('express'),
    router = express.Router(),
    usersController = require('../controller/users');

router.get('/', usersController.getAllUsers);
router.get('/:id', usersController.getUserById);
router.post('/', usersController.addUser);
router.delete('/:id', usersController.deleteUser);

module.exports = router;