'use strict';

const { Router } = require('express');
const placeRouter = new Router();
const Place = require('../models/placeModel');

placeRouter.get('/create', (req, res, next) => {
  res.render('create');
});

placeRouter.post('/create', (req, res, next) => {
  const { name, type, latitude, longitude } = req.body;

  return Place.create({
    name,
    type,
    location: {
      coordinates: [latitude, longitude]
    }
  })
    .then(place => {
      res.redirect('/');
    })
    .catch(error => {
      next(error);
    });
});

placeRouter.get('/place/:id', (req, res, next) => {
  const id = req.params.id;
  Place.findById(id)
    .then(place => {
      if (place.type === 'bookstore') {
        place.type = 'Book Store';
      } else if (place.type === 'coffee_shop') {
        place.type = 'Coffee Shop';
      }

      res.render('single', { place });
    })
    .catch(error => {
      next(error);
    });
});

placeRouter.get('/place/:id/edit', (req, res, next) => {
  const id = req.params.id;
  Place.findById(id)
    .then(place => {
      res.render('edit', { place });
    })
    .catch(error => {
      next(error);
    });
});

placeRouter.post('/place/:id/edit', (req, res, next) => {
  const id = req.params.id;
  const { name, type } = req.body;

  Place.findByIdAndUpdate(id, { name, type })
    .then(place => {
      res.redirect(`/place/${id}/`);
    })
    .catch(error => {
      next(error);
    });
});

placeRouter.post('/place/:id/delete', (req, res, next) => {
  const id = req.params.id;
  Place.findByIdAndDelete(id)
    .then(place => {
      res.redirect('/');
    })
    .catch(error => {
      next(error);
    });
});

module.exports = placeRouter;
