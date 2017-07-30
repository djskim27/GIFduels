const express = require('express');
const router = express.Router({mergeParams: true});

const Battle = require('..models/battle')
const User = require('../models/user');
const Gif = require('../models/gif');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('homepage/index', { title: 'GIF DUELS' });
});

module.exports = router;
