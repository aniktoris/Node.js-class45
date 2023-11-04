import fetch from 'node-fetch';
import { keys } from './sources/keys.js';
import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('hello from backend to frontend!');
});

app.use(express.json());

app.post('/weather', async (req, res) => {
  const { cityName } = req.body;

  if (!cityName) {
    res.status(400).send({ error: 'City name is required' });
  } else {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${keys.API_KEY}&units=metric`,
      );

      const dataWeather = await response.json();

      if (cityName !== dataWeather.name) {
        res.status(404).send({ weatherText: 'City is not found!' });
      } else {
        res.send({
          weatherText: `It is ${Math.round(
            dataWeather.main.temp,
          )} C in ${cityName}`,
        });
      }
    } catch (error) {
      res.send(error.message);
    }
  }
});

export { app };
