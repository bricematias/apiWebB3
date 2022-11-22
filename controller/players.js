const playerService = require('../services/players');
const createError = require('http-errors');

exports.getAllPlayers = async (req, res) => {
   const players = await playerService.getAllPlayers();
   res.set('Cache-control', 'max-age=30');
   res.json({success: true, data: players});
}

exports.getPlayerByFirstname = async (req, res, next) => {
   let playerFirstname = req.params.firstname; // We are sure here by using validator that we have a valid number, we can parseInt
   const players = await playerService.getPlayerByFirstname(playerFirstname);
   if (players && players.length === 1) {
      res.json({success: true, data: players[0]});
   } else {
      next(createError(404, "no player found for this firstname"));
   }
}

exports.addPlayer = async (req, res, next) => {
   if (req.body && req.body.name && req.body.lastName && req.body.position && req.body.teamId) {
      const playerCreated = await playerService.addPlayer(req.body.name , req.body.lastName , req.body.position , req.body.teamId);
      if (playerCreated) {
         res.status(201).json({success: true, id: playerCreated.id});
      } else {
         next(createError(400, "Error when creating this player, verify your args"));
      }
   } else {
      next(createError(400, "Cannot add this player, make sure all args has been sent"));
   }
}

exports.deletePlayer = async (req, res, next) => {
   if (req.params.id) {
      const id = req.params.id;
      const players = await playerService.getPlayerById(id);
      if (players.length === 1) {
         const nbOfDeletion = await playerService.deletePlayer(id);
         if (nbOfDeletion === 1) {
            res.json({success: true});
         } else {
            next(createError(500, 'Unknown error when trying to delete this player, maybe it\'s already deleted'));
         }
      } else {
         next(createError(404, `The player with name '${id}' doesn't exists, it cannot be deleted`));
      }
   } else {
      next(createError(400, "The name is required"));
   }
}