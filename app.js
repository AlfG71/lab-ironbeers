const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(__dirname + '/views/partials');

// Register the location for handlebars partials here:

// home route:
app.get('/', (request, response, next) => response.render('index'));

// beers route:
app.get('/beers',  (request, response, next) => {
  // {'abv_gt':8}
  // const beers = await punkAPI.getBeers()
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      console.log('Beers from the database: ', beersFromApi);
      response.render('beers', { beersFromApi })
    })
    .catch(error => console.log(error));
});

// random-beers route:
app.get('/random-beers', (request, response, next) => {
  punkAPI
    .getRandom()
    .then(randomBeersFromApi => {
      console.log('Beers from the database: ', randomBeersFromApi);
      response.render('randomBeers', { randomBeersFromApi });
    })
    .catch(error => console.log(error));
  // response.render('randomBeers');
});




app.listen(3000, () => console.log('🏃‍ on port 3000'));



