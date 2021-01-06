import axios from 'axios';
import Nfl_team from '../models/teamModel.js';
import Offensive_stats from '../models/offensiveStatsModel.js';
import Defensive_stats from '../models/defensiveStatsModel.js';
import Game_stats from '../models/gameStatsModel.js';
import colors from 'colors';
import dotenv from 'dotenv';
dotenv.config();

const teams = {};
let sorted_teams_array = [];


axios.all([
    axios.get(`https://api.sportsdata.io/api/nfl/fantasy/json/Standings/${process.env.SEASON}?key=${process.env.API_KEY}`),
    axios.get(`https://api.sportsdata.io/api/nfl/odds/json/TeamSeasonStats/${process.env.SEASON}?key=${process.env.API_KEY}`),
    axios.get(`https://api.sportsdata.io/api/nfl/odds/json/TeamGameStats/${process.env.SEASON}/1?key=${process.env.API_KEY}`),
    axios.get(`https://api.sportsdata.io/api/nfl/odds/json/TeamGameStats/${process.env.SEASON}/2?key=${process.env.API_KEY}`),
    axios.get(`https://api.sportsdata.io/api/nfl/odds/json/TeamGameStats/${process.env.SEASON}/3?key=${process.env.API_KEY}`),
    axios.get(`https://api.sportsdata.io/api/nfl/odds/json/TeamGameStats/${process.env.SEASON}/4?key=${process.env.API_KEY}`),
    axios.get(`https://api.sportsdata.io/api/nfl/odds/json/TeamGameStats/${process.env.SEASON}/5?key=${process.env.API_KEY}`),
    axios.get(`https://api.sportsdata.io/api/nfl/odds/json/TeamGameStats/${process.env.SEASON}/6?key=${process.env.API_KEY}`),
    axios.get(`https://api.sportsdata.io/api/nfl/odds/json/TeamGameStats/${process.env.SEASON}/7?key=${process.env.API_KEY}`),
    axios.get(`https://api.sportsdata.io/api/nfl/odds/json/TeamGameStats/${process.env.SEASON}/8?key=${process.env.API_KEY}`),
    axios.get(`https://api.sportsdata.io/api/nfl/odds/json/TeamGameStats/${process.env.SEASON}/9?key=${process.env.API_KEY}`),
    axios.get(`https://api.sportsdata.io/api/nfl/odds/json/TeamGameStats/${process.env.SEASON}/10?key=${process.env.API_KEY}`),
    axios.get(`https://api.sportsdata.io/api/nfl/odds/json/TeamGameStats/${process.env.SEASON}/11?key=${process.env.API_KEY}`),
    axios.get(`https://api.sportsdata.io/api/nfl/odds/json/TeamGameStats/${process.env.SEASON}/12?key=${process.env.API_KEY}`),
    axios.get(`https://api.sportsdata.io/api/nfl/odds/json/TeamGameStats/${process.env.SEASON}/13?key=${process.env.API_KEY}`),
    axios.get(`https://api.sportsdata.io/api/nfl/odds/json/TeamGameStats/${process.env.SEASON}/14?key=${process.env.API_KEY}`),
    axios.get(`https://api.sportsdata.io/api/nfl/odds/json/TeamGameStats/${process.env.SEASON}/15?key=${process.env.API_KEY}`),
    axios.get(`https://api.sportsdata.io/api/nfl/odds/json/TeamGameStats/${process.env.SEASON}/16?key=${process.env.API_KEY}`),
    axios.get(`https://api.sportsdata.io/api/nfl/odds/json/TeamGameStats/${process.env.SEASON}/17?key=${process.env.API_KEY}`),
    axios.get(`https://api.sportsdata.io/api/nfl/odds/json/TeamGameStats/${process.env.SEASON}POST/1?key=${process.env.API_KEY}`),
    axios.get(`https://api.sportsdata.io/api/nfl/odds/json/TeamGameStats/${process.env.SEASON}POST/2?key=${process.env.API_KEY}`),
    axios.get(`https://api.sportsdata.io/api/nfl/odds/json/TeamGameStats/${process.env.SEASON}POST/3?key=${process.env.API_KEY}`),
    axios.get(`https://api.sportsdata.io/api/nfl/odds/json/TeamGameStats/${process.env.SEASON}POST/4?key=${process.env.API_KEY}`)
  ])
  .then(function (responseArr) {
      responseArr[0].data.forEach(element => {
        teams[element.Team] = new Nfl_team(element.Team, element.Name, element.Wins, element.Losses, element.Ties,
          element.Percentage, element.DivisionWins, element.DivisionLosses, element.DivisionTies,
          element.PointsFor, element.PointsAgainst)
    });

    responseArr[1].data.forEach(element => {
      teams[element.Team]['offensive_stats'] = new Offensive_stats(element.Team, element.Touchdowns, element.RushingYardsPerAttempt,
        element.PassingYardsPerAttempt, element.CompletionPercentage, element.PasserRating, element.TimesSacked,
        element.QuarterbackHits, element.OffensivePlays);

      teams[element.Team]['defensive_stats'] = new Defensive_stats(element.Team, element.OpponentTouchdowns, element.OpponentRushingYardsPerAttempt,
        element.OpponentPassingYardsPerAttempt, element.OpponentCompletionPercentage, element.OpponentPasserRating, element.OpponentTimesSacked,
        element.OpponentQuarterbackHits, element.OpponentOffensivePlays);
    });

    responseArr[2].data.forEach(element => {
      const game_stats = new Game_stats(element.Team, element.Opponent, element.HomeOrAway, element.Score, element.OpponentScore, element.TotalScore);
      const margin_of_victory = element.Score - element.OpponentScore;
      const margin_of_victory_obj = {[element.Team]: margin_of_victory}



      teams[element.Team]['game_stats'].push(game_stats);
      teams[element.Team]['victory_margin_arr'].push(margin_of_victory);


    });

    responseArr[3].data.forEach(element => {
      const game_stats = new Game_stats(element.Team, element.Opponent, element.HomeOrAway, element.Score, element.OpponentScore, element.TotalScore);
      const margin_of_victory = element.Score - element.OpponentScore;
      const margin_of_victory_obj = {[element.Team]: margin_of_victory}


      teams[element.Team]['game_stats'].push(game_stats);
      teams[element.Team]['victory_margin_arr'].push(margin_of_victory);

    });

    responseArr[4].data.forEach(element => {
      const game_stats = new Game_stats(element.Team, element.Opponent, element.HomeOrAway, element.Score, element.OpponentScore, element.TotalScore);
      const margin_of_victory = element.Score - element.OpponentScore;
      const margin_of_victory_obj = {[element.Team]: margin_of_victory}


      teams[element.Team]['game_stats'].push(game_stats);
      teams[element.Team]['victory_margin_arr'].push(margin_of_victory);

    });

    responseArr[5].data.forEach(element => {
      const game_stats = new Game_stats(element.Team, element.Opponent, element.HomeOrAway, element.Score, element.OpponentScore, element.TotalScore);
      const margin_of_victory = element.Score - element.OpponentScore;
      const margin_of_victory_obj = {[element.Team]: margin_of_victory}


      teams[element.Team]['game_stats'].push(game_stats);
      teams[element.Team]['victory_margin_arr'].push(margin_of_victory);

    });


    responseArr[6].data.forEach(element => {
      const game_stats = new Game_stats(element.Team, element.Opponent, element.HomeOrAway, element.Score, element.OpponentScore, element.TotalScore);
      const margin_of_victory = element.Score - element.OpponentScore;
      const margin_of_victory_obj = {[element.Team]: margin_of_victory}


      teams[element.Team]['game_stats'].push(game_stats);
      teams[element.Team]['victory_margin_arr'].push(margin_of_victory);

    });

    responseArr[7].data.forEach(element => {
      const game_stats = new Game_stats(element.Team, element.Opponent, element.HomeOrAway, element.Score, element.OpponentScore, element.TotalScore);
      const margin_of_victory = element.Score - element.OpponentScore;
      const margin_of_victory_obj = {[element.Team]: margin_of_victory}


      teams[element.Team]['game_stats'].push(game_stats);
      teams[element.Team]['victory_margin_arr'].push(margin_of_victory);

    });


    responseArr[8].data.forEach(element => {
      const game_stats = new Game_stats(element.Team, element.Opponent, element.HomeOrAway, element.Score, element.OpponentScore, element.TotalScore);
      const margin_of_victory = element.Score - element.OpponentScore;
      const margin_of_victory_obj = {[element.Team]: margin_of_victory}


      teams[element.Team]['game_stats'].push(game_stats);
      teams[element.Team]['victory_margin_arr'].push(margin_of_victory);

    });


    responseArr[9].data.forEach(element => {
      const game_stats = new Game_stats(element.Team, element.Opponent, element.HomeOrAway, element.Score, element.OpponentScore, element.TotalScore);
      const margin_of_victory = element.Score - element.OpponentScore;
      const margin_of_victory_obj = {[element.Team]: margin_of_victory}


      teams[element.Team]['game_stats'].push(game_stats);
      teams[element.Team]['victory_margin_arr'].push(margin_of_victory);

    });


    responseArr[10].data.forEach(element => {
      const game_stats = new Game_stats(element.Team, element.Opponent, element.HomeOrAway, element.Score, element.OpponentScore, element.TotalScore);
      const margin_of_victory = element.Score - element.OpponentScore;
      const margin_of_victory_obj = {[element.Team]: margin_of_victory}


      teams[element.Team]['game_stats'].push(game_stats);
      teams[element.Team]['victory_margin_arr'].push(margin_of_victory);

    });

    responseArr[11].data.forEach(element => {
      const game_stats = new Game_stats(element.Team, element.Opponent, element.HomeOrAway, element.Score, element.OpponentScore, element.TotalScore);
      const margin_of_victory = element.Score - element.OpponentScore;
      const margin_of_victory_obj = {[element.Team]: margin_of_victory}


      teams[element.Team]['game_stats'].push(game_stats);
      teams[element.Team]['victory_margin_arr'].push(margin_of_victory);

    });

    responseArr[12].data.forEach(element => {
      const game_stats = new Game_stats(element.Team, element.Opponent, element.HomeOrAway, element.Score, element.OpponentScore, element.TotalScore);
      const margin_of_victory = element.Score - element.OpponentScore;
      const margin_of_victory_obj = {[element.Team]: margin_of_victory}


      teams[element.Team]['game_stats'].push(game_stats);
      teams[element.Team]['victory_margin_arr'].push(margin_of_victory);

    });

    responseArr[13].data.forEach(element => {
      const game_stats = new Game_stats(element.Team, element.Opponent, element.HomeOrAway, element.Score, element.OpponentScore, element.TotalScore);
      const margin_of_victory = element.Score - element.OpponentScore;
      const margin_of_victory_obj = {[element.Team]: margin_of_victory}


      teams[element.Team]['game_stats'].push(game_stats);
      teams[element.Team]['victory_margin_arr'].push(margin_of_victory);

    });

    responseArr[14].data.forEach(element => {
      const game_stats = new Game_stats(element.Team, element.Opponent, element.HomeOrAway, element.Score, element.OpponentScore, element.TotalScore);
      const margin_of_victory = element.Score - element.OpponentScore;
      const margin_of_victory_obj = {[element.Team]: margin_of_victory}


      teams[element.Team]['game_stats'].push(game_stats);
      teams[element.Team]['victory_margin_arr'].push(margin_of_victory);

    });

    responseArr[15].data.forEach(element => {
      const game_stats = new Game_stats(element.Team, element.Opponent, element.HomeOrAway, element.Score, element.OpponentScore, element.TotalScore);
      const margin_of_victory = element.Score - element.OpponentScore;
      const margin_of_victory_obj = {[element.Team]: margin_of_victory}


      teams[element.Team]['game_stats'].push(game_stats);
      teams[element.Team]['victory_margin_arr'].push(margin_of_victory);

    });

    responseArr[16].data.forEach(element => {
      const game_stats = new Game_stats(element.Team, element.Opponent, element.HomeOrAway, element.Score, element.OpponentScore, element.TotalScore);
      const margin_of_victory = element.Score - element.OpponentScore;
      const margin_of_victory_obj = {[element.Team]: margin_of_victory}


      teams[element.Team]['game_stats'].push(game_stats);
      teams[element.Team]['victory_margin_arr'].push(margin_of_victory);

    });

    responseArr[17].data.forEach(element => {
      const game_stats = new Game_stats(element.Team, element.Opponent, element.HomeOrAway, element.Score, element.OpponentScore, element.TotalScore);
      const margin_of_victory = element.Score - element.OpponentScore;
      const margin_of_victory_obj = {[element.Team]: margin_of_victory}


      teams[element.Team]['game_stats'].push(game_stats);
      teams[element.Team]['victory_margin_arr'].push(margin_of_victory);

    });

    responseArr[18].data.forEach(element => {
      const game_stats = new Game_stats(element.Team, element.Opponent, element.HomeOrAway, element.Score, element.OpponentScore, element.TotalScore);
      const margin_of_victory = element.Score - element.OpponentScore;
      const margin_of_victory_obj = {[element.Team]: margin_of_victory}


      teams[element.Team]['game_stats'].push(game_stats);
      teams[element.Team]['victory_margin_arr'].push(margin_of_victory);

    });

    responseArr[19].data.forEach(element => {
      const game_stats = new Game_stats(element.Team, element.Opponent, element.HomeOrAway, element.Score, element.OpponentScore, element.TotalScore);
      const margin_of_victory = element.Score - element.OpponentScore;
      const margin_of_victory_obj = {[element.Team]: margin_of_victory}


      teams[element.Team]['game_stats'].push(game_stats);
      teams[element.Team]['victory_margin_arr'].push(margin_of_victory);

    });

    responseArr[20].data.forEach(element => {
      const game_stats = new Game_stats(element.Team, element.Opponent, element.HomeOrAway, element.Score, element.OpponentScore, element.TotalScore);
      const margin_of_victory = element.Score - element.OpponentScore;
      const margin_of_victory_obj = {[element.Team]: margin_of_victory}


      teams[element.Team]['game_stats'].push(game_stats);
      teams[element.Team]['victory_margin_arr'].push(margin_of_victory);

    });

    responseArr[21].data.forEach(element => {
      const game_stats = new Game_stats(element.Team, element.Opponent, element.HomeOrAway, element.Score, element.OpponentScore, element.TotalScore);
      const margin_of_victory = element.Score - element.OpponentScore;
      const margin_of_victory_obj = {[element.Team]: margin_of_victory}


      teams[element.Team]['game_stats'].push(game_stats);
      teams[element.Team]['victory_margin_arr'].push(margin_of_victory);

    });

    responseArr[22].data.forEach(element => {
      const game_stats = new Game_stats(element.Team, element.Opponent, element.HomeOrAway, element.Score, element.OpponentScore, element.TotalScore);
      const margin_of_victory = element.Score - element.OpponentScore;
      const margin_of_victory_obj = {[element.Team]: margin_of_victory}


      teams[element.Team]['game_stats'].push(game_stats);
      teams[element.Team]['victory_margin_arr'].push(margin_of_victory);

    }); 

    

    /* power rating algorithm logic
    _____________________________________________ */
    

    

    const teams_array = Object.entries(teams);

    sorted_teams_array = teams_array.sort((a, b) => {
      if (a[1].average_victory_margin > b[1].average_victory_margin) return -1;
      if (a[1].average_victory_margin < b[1].average_victory_margin) return 1;
      return 0;
    })

    console.log(sorted_teams_array);

    teams_array.forEach(element => {
      console.log(`average victory margin for ${element[0]} = ${element[1].average_victory_margin}`)
    });

    
  

  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })


