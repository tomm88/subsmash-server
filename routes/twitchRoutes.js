const express = require('express');
const router = express.Router();
const getSubsFromTwitchHttp = require('../http_endpoints/getSubsFromTwitchHttp');
const getSubsFromTwitchHttpSlideshow = require('../http_endpoints/getSubsFromTwitchHttpSlideshow');
const createAlertsTwitchWebsocketHttp = require('../http_endpoints/createAlertsTwitchWebsocketHttp');
const createSlideshowEventSubHttp = require('../http_endpoints/createSlideshowTwitchWebsocketHttp');
const getStreamerTwitchDataHttp = require('../http_endpoints/getStreamerTwitchDataHttp');
const handleLogoutHttp = require('../http_endpoints/handleLogoutHttp');
const handleTwitchEventTestHttp = require('../http_endpoints/handleTwitchEventTestHttp');

router.get('/twitch/getSubs', getSubsFromTwitchHttp);
router.get('/twitch/getSubsSlideshow', getSubsFromTwitchHttpSlideshow);
router.get('/twitch/getStreamerData', getStreamerTwitchDataHttp);
router.post('/twitch/eventSub/slideshow', createSlideshowEventSubHttp);
router.post('/twitch/eventSub/alerts', createAlertsTwitchWebsocketHttp);
router.post('/twitch/logout', handleLogoutHttp);
router.post('/twitch/testEvent', handleTwitchEventTestHttp);

module.exports = router;