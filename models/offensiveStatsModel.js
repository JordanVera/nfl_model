export default class Offensive_stats {

    constructor (team, touchdowns, rushing_yards_per_attempt, passing_yards_per_attempt, completion_percentage, passer_rating, 
   times_sacked, quarterback_hits, offensive_plays) {
        this.team = team;
        this.touchdowns = touchdowns;
        this.rushing_yards_per_attempt = rushing_yards_per_attempt;
        this.passing_yards_per_attempt = passing_yards_per_attempt;
        this.completion_percentage = completion_percentage;
        this.passer_rating = passer_rating;
        this.times_sacked = times_sacked;
        this.quarterback_hits = quarterback_hits;
        this.offensive_plays = offensive_plays;
    }

    get quarterback_hits_percentage() {
        return this.offensive_plays / this.quarterback_hits;
    }
}
