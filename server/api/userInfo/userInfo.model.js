'use strict';

const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

const db = require('../../_db');

const UserInfo = db.define('userInfo', {
  name: Sequelize.STRING,
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true,
      notEmpty: true,
    },
  },
  password_digest: Sequelize.STRING,
  password: Sequelize.VIRTUAL
}, {
  indexes: [{
    fields: ['email'],
    unique: true,
  }],
  hooks: {
    beforeCreate: setEmailAndPassword, // eslint-disable-line no-use-before-define
    beforeUpdate: setEmailAndPassword, // eslint-disable-line no-use-before-define
  },
  instanceMethods: {
    authenticate(plaintext) {
      console.log('password', plaintext)
      return new Promise((resolve, reject) =>
        bcrypt.compare(plaintext, this.password_digest,
          (err, result) =>
          err ? reject(err) : resolve(result))
      );
    },
  },
});

function setEmailAndPassword(user) {
  user.email = user.email && user.email.toLowerCase();
  if (!user.password) return Promise.resolve(user);

  return new Promise((resolve, reject) =>
    bcrypt.hash(user.get('password'), 10, (err, hash) => {
      if (err) reject(err);
      user.set('password_digest', hash);
      resolve(user);
    })
  );
}

module.exports = UserInfo;