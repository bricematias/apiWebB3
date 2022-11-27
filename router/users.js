const { authMiddleware } = require('../controller/auth');

const express = require('express'),
    router = express.Router(),
    usersController = require('../controller/users');

router.get('/',authMiddleware, usersController.getAllUsers);
router.get('/:id',authMiddleware, usersController.getUserById);
router.post('/', usersController.addUser);
router.delete('/:id',authMiddleware, usersController.deleteUser);

module.exports = router;