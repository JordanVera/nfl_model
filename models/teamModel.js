export default class Nfl_team {
    constructor(team=String, name=String, wins=Number, losses=Number, ties=Number, win_percentage=Number,
         division_wins=Number, division_losses=Number, division_ties=Number, points_for=Number, points_against=Number) {
        this.team = team;
        this.name = name;
        this.wins = wins;
        this.losses = losses;
        this.ties = ties;
        this.win_percentage = win_percentage;
        this.division_wins = division_wins;
        this.division_losses = division_losses;
        this.division_ties = division_ties;
        this.points_for = points_for;
        this.points_against = points_against;
    }

    get record() {
        return [this.wins,this.losses,this.ties];
    }

    get division_record() {
        return [this.division_wins, this.division_losses, this.division_ties];
    }
}
