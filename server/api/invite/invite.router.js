/* eslint-disable arrow-body-style */

'use strict';

// eslint-disable-next-line new-cap
const router = require('express').Router();

const db = require('../../_db');

const _ = require('lodash');

const HttpError = require('../../utils/HttpError');
const Channel = require('../channel/channel.model');
const Admin = require('../admin/admin.model');
const User = require('../user/user.model');
const UserInfo = require('../userInfo/userInfo.model');
const Invite = require('../invite/invite.model');

const Promise = require('bluebird');

// POST - CHROME - user receives invites
router.post('/chrome/get', (req, res, next) => {
  const { hash } = req.body;

  User.findOne({
    where: { hash },
  })
    .then((user) => {
      return UserInfo.findOne({
        where: {
          id: user.user_info_id
        }
      });
    })
    .then((userInfo) => {
      return Invite.findAll({
        where: {
          email: userInfo.email
        }
      });
    })
    .then((invites) => {
      res.send(invites);
    })
    .catch(next);
});

router.post('/chrome/delete', (req, res, next) => {
  const { invite } = req.body;
  let user;
  let userInfoEmail;
  UserInfo.findOne({
    where: {
      email: invite.email
    }
  })
    .then((userInfo) => {
      userInfoEmail = userInfo.email;
      return User.findOne({
        where: {
          user_info_id: userInfo.id
        }
      });
    })
    .then((foundUser) => {
      if (!foundUser) throw new Error('User not found.');
      user = foundUser;
      return Channel.findOne({
        where: {
          id: invite.channelId
        }
      });
    })
    .then((channel) => {
      return channel.addUser(user);
    })
    .then((channel) => {
      return Invite.destroy({
        where: {
          email: invite.email,
          channelId: invite.channelId
        }
      });
    })
    .then((number) => {
      return Invite.findAll({
        where: {
          email: userInfoEmail
        }
      });
    })
    .then((invites) => {
      res.send(invites);
    })
    .catch(next);
});

// POST - admin creates invitation
router.post('/webapp', (req, res, next) => {
  if (!req.user) return res.status(403).send();

  Invite.create(req.body)
    .then((invite) => {
      res.status(201).send();
    })
    .catch(next);
});

// POST - org head adds an admin to a channel
router.post('/addAdmin', (req, res, next) => {
  if (!req.user) return res.status(403).send();

  const { email, channelId } = req.body;
  let selectedChannel, newAdmin;

  Channel.findById(channelId)
    .then((currentChannel) => {
      selectedChannel = currentChannel;
      return UserInfo.findOne({
        where: {
          email: email
        }
      });
    })
    .then((currentUserInfo) => {
      if (!currentUserInfo) throw new Error('Only flow extension users may be added as an admin of a channel.');

      return Admin.findOrCreate({
        where: {user_info_id: currentUserInfo.id}
      });
    })
    .spread((admin, created) => {
      newAdmin = admin;
      return selectedChannel.hasAdmin(admin);
    })
    .then(check => {
      if (check) throw new Error('User is already an admin on the channel');

      return selectedChannel.addAdmin(newAdmin);
    })
    .then(() => {
      return selectedChannel.getAdmins({
        where: { id: newAdmin.id },
        include: [{ model: UserInfo, as: 'UserInfo' }]
      });
    })
    .then(admins => {
      console.log(admins[0])
      res.send(admins[0]);
    })
    .catch(next);
});

module.exports = router;
