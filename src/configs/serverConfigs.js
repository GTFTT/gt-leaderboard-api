/**
 * Server configuration file
 */
'use strict';

const fs = require('fs');

const convict = require('convict');

//Add validator for IP address
convict.addFormat(require('convict-format-with-validator').ipaddress);

const config = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development'],
    default: 'development',
    env: 'NODE_ENV'
  },
  ip: {
    doc: 'The IP address to bind.',
    format: 'ipaddress',
    default: '127.0.0.1',
    arg: 'ipAddress',
    env: 'HOST' 
  },
  jwtSecret: {
    doc: 'jwt secret used for authorization key generation',
    format: String,
    default: '4411cdbf9cae96e1872a4eec01a6f2b686c00ddcc75a03eeaeb8e9045d66d451e536118f8a4b020f2e1c29cccbed5821b6324478ad8da3160a2d6a356c18859e',
    arg: 'jwtSecret',
    env: 'JWT_SECRET' 
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 5000,
    arg: 'port',
    env: 'PORT'
  },
  postgres: {
    host: {
      doc: 'A postgres host.',
      default: 'leaderboard-postgres-db-do-user-9923682-0.b.db.ondigitalocean.com',
    },
    user: {
      doc: 'A postgres user.',
      format: String,
      default: 'doadmin'
    },
    password: {
      doc: 'A postgres database password.',
      format: String,
      default: '',
      env: 'POSTGRES_DATABASE_PASSWORD'
    },
    port: {
      doc: 'A postgres port.',
      format: 'port',
      default: 25060
    },
    database: {
      doc: 'Database name.',
      format: String,
      default: 'defaultdb'
    }
  }
});

// Perform validation
config.validate({allowed: 'strict'});

module.exports = config;