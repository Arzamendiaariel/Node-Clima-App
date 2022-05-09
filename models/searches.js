const axios = require('axios');
// require('dotenv').config();

class Searches {
  record = ['Tegucigalpa', 'Madrid'];
  constructor() {
    // TODO leer db si existe
  }
  get paramsMapbox() {
    return {
      access_token: process.env.MAPBOX_KEY,
      limit: 5,
      language: 'es',
    };
  }
  async city(place = '') {
    try {
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
        params: this.paramsMapbox,
      });
      const answer = await instance.get();

      return answer.data.features.map((place) => ({
        id: place.id,
        name: place.place_name,
        lng: place.center[0],
        lat: place.center[1],
      }));
    } catch (error) {
      return [];
    } //retornar los lugares qeu coincidan con el lugar que escribió la persona
  }
  get paramsOpenWeather() {
    return {
      appid: process.env.OPENWEATHER_KEY,
      lang: 'es',
      units: 'metric',
    };
  }
  // &appid=${process.env.OPENWEATHER_KEY} ?lat=${lat}&lon=${lon}
  async whatherPlace(lat, lon) {
    try {
      const instance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`,
        params: { ...this.paramsOpenWeather, lat, lon },
      });
      const answer = await instance.get();
      const { weather, main } = answer.data;

      return {
        desc: weather[0].description,
        min: main.temp_min,
        max: main.temp_max,
        temp: main.temp,
      };
    } catch (error) {
      console.log('error');
    }
  }
}

module.exports = Searches;
