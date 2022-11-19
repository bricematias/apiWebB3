const express = require('express'),
    router = express.Router(),
    userController = require('../controller/users');

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserByName);
router.post('/', userController.addUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;