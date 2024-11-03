const express = require('express');
const router = express.Router();
const newSubscriberTestHttp = require('./httpEndpoints/newSubscriberTestHttp');
const resubTestHttp = require('./httpEndpoints/resubTestHttp');
const giftSubTestHttp = require('./httpEndpoints/giftSubTestHttp');
const newFollowerTestHttp = require('./httpEndpoints/newFollowTestHttp');
const cheerTestHttp = require('./httpEndpoints/cheerTestHttp');
const raidTestHttp = require('./httpEndpoints/raidTestHttp');
const serveSessionDataHttp = require('./httpEndpoints/serveSessionDataHttp');

router.post('/test/handleNewSubscriber', newSubscriberTestHttp);
router.post('/test/handleResub', resubTestHttp);
router.post('/test/handleGiftSub', giftSubTestHttp);
router.post('/test/handleFollow', newFollowerTestHttp);
router.post('/test/handleCheer', cheerTestHttp);
router.post('/test/handleRaid', raidTestHttp);
router.get('/test/sessionData', serveSessionDataHttp);

module.exports = router;