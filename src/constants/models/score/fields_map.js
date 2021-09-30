'use strict';

const _ = require('lodash');

/**
 * Key-value map to convert db names into camelCase names
 */
const TO_MODEL = {
  id_pk: 'id',
  user_id_fk: 'userId',
  score: 'score',
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
