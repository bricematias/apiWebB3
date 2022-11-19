const express = require('express');
const playersRouter = require('./players');
const teamsRouter = require('./teams');
const usersRouter = require('./users');

const router = express.Router();
router.use('/players', playersRouter);
router.use('/teams', teamsRouter);
router.use('/users', usersRouter);

module.exports = router;