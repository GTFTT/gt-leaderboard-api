'use strict';

const _ = require('lodash');

/**
 * Key-value map to convert db names into camelCase names
 */
const TO_MODEL = {
  id_pk: 'id',
  first_name: 'firstName',
  last_name: 'lastName',
  region: 'region',
  email: 'email',
  rating: 'rating',
};

/**
 * Reverse to TO_MODEL object
 */
const TO_DB = _.reduce(
    TO_MODEL,
    (result, value, key) => {
        result[value] = key;
        return result;
    },
    {}
);

module.exports = {
  TO_MODEL,
  TO_DB,
};
