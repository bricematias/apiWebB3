const express = require('express'),
    router = express.Router(),
    userController = require('../controller/users');

router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.addUser);
router.delete('/:id', userController.deleteUserById);

module.exports = router;