import express from 'express';

const app = express();

app.get('/', function (req, res) {
  res.send('hello from backend to frontend!');
});

app.use(express.json());

app.post('/weather', function (req, res) {
  const cityName = req.body.cityName;
  res.send(`I want to know the current weather in ${cityName}`);
});

app.listen(3000);
