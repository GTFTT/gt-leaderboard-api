'use strict';

const _ = require('lodash');
const Joi = require('joi');
// const moment = require('moment');

module.exports = ({config}) => {
  // console.log("config: ", config, server);

  return ({
    key: config.get('jwtSecret'),
    verifyOptions: {algorithms: ['HS256']},
    validate: async (decoded) => {
      //If we are here, then web token was validated
      return {isValid: true, credentials: decoded}
    }
  })
};