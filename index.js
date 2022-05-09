const {
  inquirerMenu,
  pause,
  readInput,
  placesList,
} = require('./helpers/inquirer');
const Searches = require('./models/searches');
require('colors');
require('dotenv').config();

const main = async () => {
  const searches = new Searches();
  let opt;
  do {
    opt = await inquirerMenu();

    switch (opt) {
      case 1:
        //Show Message to the user to start his search
        const place = await readInput('City: ');
        //buscar los lugares
        const places = await searches.city(place);

        //seleccionar el lugar
        const id = await placesList(places);
        const selectedPlace = places.find((place) => place.id === id);

        //clima data
        const weather = await searches.whatherPlace(
          selectedPlace.lat,
          selectedPlace.lng
        );
        //mostrar resultados

        console.log('\nCity Information\n'.rainbow);
        console.log(`City: `, selectedPlace.name);
        console.log(`Lat:`, selectedPlace.lat);
        console.log(`Lng:`, selectedPlace.lng);
        console.log(`Temperature:`, weather.temp);
        console.log(`Min:`, weather.min);
        console.log(`Max:`, weather.max);
        console.log(`How's the weather:`, weather.desc);
        break;
      case 2:
        break;
      case 0:
        break;
    }
    if (opt !== 0) await pause();
  } while (opt !== 0);
};

main();
