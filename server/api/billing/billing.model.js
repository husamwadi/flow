'use strict';

const Sequelize = require('sequelize');

const db = require('../../_db');

const Billing = db.define('billing', {
  cardType: {
    type: Sequelize.STRING, // eslint-disable-line new-cap
    allowNull: false,
  },
  cardNumber: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  expiryDate: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  securityNumber: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Billing;
