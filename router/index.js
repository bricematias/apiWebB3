const express = require('express');
const playersRouter = require('./players');
const teamsRouter = require('./teams');
const usersRouter = require('./users');
const authentificationRouter = require('./auth');
const initRouter = require('./init');

const router = express.Router();
router.use('/auth', authentificationRouter);
router.use('/players', playersRouter);
router.use('/teams', teamsRouter);
router.use('/users', usersRouter);
router.use('/init', initRouter);

module.exports = router;