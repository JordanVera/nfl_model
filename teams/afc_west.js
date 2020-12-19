import Nfl_team from '../models/teamModel.js';

let chiefs = new Nfl_team('chiefs', 'kansas city', 10, 1, 0, 3, 0, 0);

console.log(chiefs);
console.log(`record: ${chiefs.record}`);
console.log(`division record: ${chiefs.division_record}`);