import https from 'https';
import Nfl_team from '../models/teamModel.js';
import colors from 'colors';
import dotenv from 'dotenv'
dotenv.config();

https.get(`https://api.sportsdata.io/v3/nfl/scores/json/Standings/2020?key=${process.env.API_KEY}`, resp => {
    let data = [];

    resp.on('data', (chunk) => {
        data += chunk;
    });

    resp.on('end', () => {
        const data_object = JSON.parse(data); // parse response from string into object so we can run loop


        /* Create a for each loop that goes over each obj and returns a new team object using NFL 
        team model with updated stats from sportsdata.io 
        __________________________________________________________________________________________*/     

        data_object.forEach(element => {
            console.log(`Model for ${element.Name}: `.bold.brightBlue)
            console.log(new Nfl_team(element.Team, element.Name, element.Wins, element.Losses, element.Ties, 
                element.Percentage, element.DivisionWins, element.DivisionLosses, element.DivisionTies, 
                element.PointsFor, element.PointsAgainst));
            console.log(`Record for ${element.record}: `.bold.brightRed)
           
        });
     
    })
})
    .on("error", err => {
        console.log("Error: " + err.message);
    });
