const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['coffee_shop', 'bookstore'],
      default: 'unknown'
    },
    location: {
      coordinates: [
        {
          type: Number,
          min: -180,
          max: 180
        }
      ],
      type: {
        type: String,
        default: 'Point'
      }
    }
  },

  {
    timestamps: true
  }
);

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;