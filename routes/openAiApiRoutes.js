const express = require('express');
const router = express.Router();
const reRollCharacter = require('../utils/reRollCharacter');
const generateSampleImageHttp = require('../http_endpoints/promptEdits/generateSampleImageHttp');

router.post('/openai/reRollCharacter', reRollCharacter);
router.post('/openai/generateSampleImage', generateSampleImageHttp);

module.exports = router;