import axios from 'axios';
import Offensive_stats from '../models/offensiveStatsModel.js';
import colors from 'colors';
import dotenv from 'dotenv';
import { CONNREFUSED } from 'dns';
dotenv.config();


axios.get(`https://api.sportsdata.io/api/nfl/odds/json/TeamSeasonStats/2019?key=${process.env.API_KEY}`)
    .then(function (response) {

        response.data.forEach(element => {

            let offensive_stats = new Offensive_stats(element.Team, element.Touchdowns, element.RushingYardsPerAttempt,
            element.PassingYardsPerAttempt, element.CompletionPercentage, element.PasserRating, element.TimesSacked, 
            element.QuarterbackHits, element.OffensivePlays);

            console.log(`Offensive Stats Model for ${element.Team}: `.bold.brightBlue)
            console.log(offensive_stats);
            console.log(`qb hit percentage = ${offensive_stats.quarterback_hits_percentage}`.bold.brightRed);
        });
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .then(function () {
        // always executed
    });

    