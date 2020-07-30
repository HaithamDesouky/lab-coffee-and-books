const { Router } = require('express');
const baseRouter = new Router();
const Place = require('../models/placeModel');

baseRouter.get('/', (req, res, next) => {
  Place.find()
    .then(places => {
      console.log('hello', places);
      places.forEach(place => {
        if (place.type === 'bookstore') {
          place.type = 'Book Store';
        } else if (place.type === 'coffee_shop') {
          place.type = 'Coffee Shop';
        }
      });

      // const placesToRender = places.map(place => {
      //   if (place.type === 'bookstore') {
      //     return { ...place, type: 'Book Store' };
      //   } else if (place.type === 'coffee_shop') {
      //     return { ...place, type: 'Coffee Shop' };
      //   } else {
      //     return place;
      //   }
      // });

      // console.log(
      //   'santi wants to see you ',
      //   placesToRender,
      //   'sajdsidhasdjdsadasdddasdsd',
      //   places
      // );
      console.log('hello', places);
      res.render('index', { title: 'Hello World!', places });
    })
    .catch(error => {
      next(error);
    });
});

module.exports = baseRouter;
