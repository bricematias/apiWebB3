const playerService = require('../services/players');
const createError = require('http-errors');

exports.getAllPlayers = async (req, res) => {
   const players = await playerService.getAllPlayers();
   res.set('Cache-control', 'max-age=30');
   res.json({success: true, data: players});
}

exports.getPlayerById = async (req, res, next) => {
   let playerId = req.params.id; // We are sure here by using validator that we have a valid number, we can parseInt
   const players = await playerService.getPlayerById(playerId);
   if (players && players.length === 1) {
      res.json({success: true, data: players[0]});
   } else {
      next(createError(404, "no player found for this Id"));
   }
}

exports.addPlayer = async (req, res, next) => {
   if (req.body && req.body.firstname && req.body.lastname && req.body.position && req.body.teamId) {
      const playerCreated = await playerService.addPlayer(req.body.firstname , req.body.lastname , req.body.position , req.body.teamId);
      if (playerCreated) {
         res.status(201).json({success: true, id: playerCreated.playerId});
      } else {
         next(createError(400, "Error when creating this player, verify your args"));
      }
   } else {
      next(createError(405, "Cannot add this player, make sure all args has been sent"));
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
         next(createError(404, `The player with id '${id}' doesn't exists, it cannot be deleted`));
      }
   } else {
      next(createError(400, "The name is required"));
   }
}

exports.updatePlayer = async (req, res, next) => {
   if(req.body && req.params.id) {
      const oldPlayer = await playerService.getPlayerById(req.params.id);
      if(oldPlayer.length === 1){
         let firstname;
         let lastName;
         let position;
         let teamId;
         oldPlayer.map(async (player) => {
            req.body.firstname ? firstname = req.body.firstname : firstname = player.dataValues.firstname;
            req.body.lastName ? lastName = req.body.lastName : lastName = player.dataValues.lastName;
            req.body.position ? position = req.body.position : position = player.dataValues.position;
            req.body.teamId ? teamId = req.body.teamId : teamId = player.dataValues.teamId;
            await playerService.updatePlayer(req.params.id, firstname, lastName, position, teamId);
            res.json({success: true});
         })
      } else {
         next(createError(400, "This player not exist"));
      }   
   } else {
      next(createError(400, "Cannot update this player, make sure all args has been sent"));
   }
}