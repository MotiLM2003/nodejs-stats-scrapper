const path = require('path');
const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const cheerio = require('cheerio');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
const publicPath = path.join(__dirname, '..', 'build');

console.log(publicPath);
// app.use(cors());
app.use(express.static(publicPath)).use(bodyParser.json());

app.get('/api/data', (req, res) => {
  console.log('api/data');
  getData(res);
});

if (process.env.NODE_ENV === 'production') {
}
app.get('*', (req, res) => {
  const fullPath = path.join(publicPath, 'index.html');
  console.log('sending file:', fullPath);
  res.sendFile(fullPath);
});

app.listen(PORT, () => {
  console.log('server is up!');
});

const getData = (res) => {
  const data = {
    wins: 0,
    level: 0,
    kd: 0,
    kills: 0,
  };
  request(
    'https://cod.tracker.gg/warzone/profile/atvi/DAMAGEX%235551439/overview',
    (error, response, html) => {
      if (!error && response.statusCode === 200) {
        console.log('in');
        const $ = cheerio.load(html);

        data.level = parseInt($('.highlight-text').text().split(' ')[7]);

        const value = $('.numbers .value');
        $('.numbers .value').each((i, elm) => {
          switch (i) {
            case 0: {
              data.wins = elm.children[0].data;
              break;
            }
            case 2: {
              data.kd = elm.children[0].data;
              break;
            }
            case 6: {
              data.kills = elm.children[0].data;
              break;
            }
          }
          // console.log(elm.children[0].data);
        });

        console.log('clg data', data);
        res.json(data);
      } else {
        console.log(response.statusCode);
        res.send('error', resposne);
      }
    }
  );
};
