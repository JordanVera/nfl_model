import axios from 'axios';
import colors from 'colors';
import dotenv from 'dotenv';
import cheerio from 'cheerio';
dotenv.config();



axios.get('https://thepowerrank.com/nfl/').then(response => {
  const $ = cheerio.load(response.data);

  console.log($('.chartmain > #chart > svg').html());
    // $('.team').each((i, element) => {
    //   console.log(element);
    // })
})
   