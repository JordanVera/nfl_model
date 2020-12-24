import axios from 'axios';
import Defensive_stats from '../models/defensiveStatsModel.js';
import colors from 'colors';
import dotenv from 'dotenv';
import { CONNREFUSED } from 'dns';
dotenv.config();


axios.get(`https://api.sportsdata.io/api/nfl/odds/json/TeamSeasonStats/2019?key=${process.env.API_KEY}`)
    .then(function (response) {

        response.data.forEach(element => {

            let defensive_stats = new Defensive_stats(element.Team, element.OpponentTouchdowns, element.OpponentRushingYardsPerAttempt,
            element.OpponentPassingYardsPerAttempt, element.OpponentCompletionPercentage, element.OpponentPasserRating, element.OpponentTimesSacked, 
            element.OpponentQuarterbackHits, element.OpponentOffensivePlays);

            console.log(`Defensive Stats Model for ${element.Team}: `.bold.brightBlue)
            console.log(defensive_stats);
            console.log(`opponent qb hit percentage = ${defensive_stats.opponent_quarterback_hits_percentage}`.bold.brightRed);
        });
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .then(function () {
        // always executed
    }); 