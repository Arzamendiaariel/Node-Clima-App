const fs = require('fs');
const axios = require('axios');

class Searches {
  record = [];
  dbPath = './db/database.json';
  constructor() {
    this.readDB();
  }
  get recordUpperCased() {
    return this.record.map((place) => {
      let words = place.split(' ');
      words = words.map((word) => word[0].toUppercase() + word.substring(1));
      return words.join(' ');
    });
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

  addToRecord(place = '') {
    if (this.record.includes(place.toLocaleLowerCase())) {
      return;
    }
    this.record = this.record.splice(0, 5);
    this.record.unshift(place.toLocaleLowerCase());
    //grabar en db
    this.saveDB();
  }
  saveDB() {
    const payload = {
      record: this.record,
    };
    fs.writeFileSync(this.dbPath, JSON.stringify(payload));
  }
  readDB() {
    if (!fs.existsSync(this.dbPath)) {
      return;
    }
    const info = fs.readFileSync(this.dbPath, { encoding: 'utf-8' });
    const data = JSON.parse(info);
    this.recrod = data.record;
  }
}

module.exports = Searches;
