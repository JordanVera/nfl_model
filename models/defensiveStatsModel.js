/* eslint-disable camelcase */
/* eslint-disable max-len */
export default class Defensive_stats {
  constructor(team, opponent_touchdowns, opponent_rushing_yards_per_attempt, oppenent_passing_yards_per_attempt, opponent_completion_percentage,
    opponent_passer_rating, opponent_times_sacked, opponent_quarterback_hits, opponent_offensive_plays) {
    this.team = team;
    this.opponent_touchdowns = opponent_touchdowns;
    this.opponent_rushing_yards_per_attempt = opponent_rushing_yards_per_attempt;
    this.oppenent_passing_yards_per_attempt = oppenent_passing_yards_per_attempt;
    this.opponent_completion_percentage = opponent_completion_percentage;
    this.opponent_passer_rating = opponent_passer_rating;
    this.opponent_times_sacked = opponent_times_sacked;
    this.opponent_quarterback_hits = opponent_quarterback_hits;
    this.opponent_offensive_plays = opponent_offensive_plays;
  }

  get opponent_quarterback_hits_percentage() {
    return this.opponent_offensive_plays / this.opponent_quarterback_hits;
  }
}
