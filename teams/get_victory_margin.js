import axios from 'axios';
import Nfl_team from '../models/teamModel.js';
import Offensive_stats from '../models/offensiveStatsModel.js'
import Defensive_stats from '../models/defensiveStatsModel.js';
import Game_stats from '../models/gameStatsModel.js';
import colors from 'colors';
import dotenv from 'dotenv';
dotenv.config();

let game_stats = {};
let main_dictionary = [];


axios.all([
  axios.get(`https://api.sportsdata.io/api/nfl/odds/json/TeamGameStats/${process.env.SEASON}/1?key=${process.env.API_KEY}`),
  axios.get(`https://api.sportsdata.io/api/nfl/odds/json/TeamGameStats/${process.env.SEASON}/2?key=${process.env.API_KEY}`),
  axios.get(`https://api.sportsdata.io/api/nfl/odds/json/TeamGameStats/${process.env.SEASON}/3?key=${process.env.API_KEY}`)
])
  .then(function(responseArr) {
    responseArr[0].data.forEach(element => {
      let game_stats = { [element.Team]:  new Game_stats(element.Team, element.Opponent, element.HomeOrAway, element.Score, element.OpponentScore, element.TotalScore)};
      let margin_of_victory = element.Score - element.OpponentScore;
      
     main_dictionary.push({
       [element.Team]: margin_of_victory
     }) 


    });

    responseArr[1].data.forEach(element => {
        let game_stats = { [element.Team]:  new Game_stats(element.Team, element.Opponent, element.HomeOrAway, element.Score, element.OpponentScore, element.TotalScore)};
        let margin_of_victory = element.Score - element.OpponentScore;
        
        main_dictionary.push({
          [element.Team]: margin_of_victory
        }) 
      
      });

      responseArr[2].data.forEach(element => {
        let game_stats = {
          [element.Team]: new Game_stats(element.Team, element.Opponent, element.HomeOrAway, element.Score, element.OpponentScore, element.TotalScore)
        };

        let margin_of_victory = element.Score - element.OpponentScore;

        main_dictionary.push({
          [element.Team]: margin_of_victory
        })

      });

     
      console.log(main_dictionary);
    
  })
  .catch(function(error) {
    // handle error
    console.log(error);
  })

  
    

    