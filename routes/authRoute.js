const express = require('express');
const router = express.Router();
const twitchUriRedirect = require('../controllers/authControllers/twitchUriRedirect')
const authCallback = require('../controllers/authControllers/authCallback');
const checkAuth = require('../controllers/authControllers/checkAuth');

router.get('/auth/twitchUriRedirect', twitchUriRedirect);
router.get('/auth/callback', authCallback);
router.get('/auth/check', checkAuth);

module.exports = router;