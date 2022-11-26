const axios = require("axios");
const json = require('json');
const playerService = require('../services/players');
const teamsService = require('../services/teams');

exports.initialisation = async (req, res) => {
    const optionsTeams = {
        method: 'GET',
        url: 'https://free-nba.p.rapidapi.com/teams',
        params: {page: '0'},
        headers: {
          'X-RapidAPI-Key': 'd7495ffd1fmsh1210a605caa9441p1efc85jsn6cc557619b9b',
          'X-RapidAPI-Host': 'free-nba.p.rapidapi.com'
        }
      };
      
      await axios.request(optionsTeams).then(function (response) {
          response.data.data.map( team => {
            teamsService.addTeam(team.full_name);
          })
      }).catch(function (error) {
          console.error(error);
      });

    const optionPlayer = {
        method: 'GET',
        url: 'https://free-nba.p.rapidapi.com/players',
        params: {page: '0'},
        headers: {
          'X-RapidAPI-Key': 'd7495ffd1fmsh1210a605caa9441p1efc85jsn6cc557619b9b',
          'X-RapidAPI-Host': 'free-nba.p.rapidapi.com'
        }
      };
      
    await axios.request(optionPlayer).then(function (response) {
        response.data.data.map(async player =>{
            await teamsService.getTeamsByName(player.team.full_name).then(
                function (team) {
                    team.map((e) => {
                        playerService.addPlayer(player.first_name, player.last_name, player.position, e.dataValues.teamId);
                    });
                    
                }
            )
        });
    }).catch(function (error) {
        console.error(error);
    });
    res.json({success : true})
}