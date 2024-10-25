const express = require('express');
const router = express.Router();
const { imageUpload, fontUpload, audioUpload } = require('../http_endpoints/multerUpload');
const uploadUserImagestoS3Http = require('../http_endpoints/uploadUserImagesToS3Http');
const getUserImagesHttp = require('../http_endpoints/getUserImagesHttp');
const deleteUserImageHttp = require('../http_endpoints/deleteUserImageHttp');
const uploadFontToS3Http = require('../http_endpoints/uploadFontsToS3Http');
const getUserFontsHttp = require('../http_endpoints/getUserFontsHttp');
const uploadSoundToS3Http = require('../http_endpoints/uploadSoundToS3Http');
const getUserSoundsHttp = require('../http_endpoints/getUserSoundsHttp');


router.post('/aws/uploadUserImages', imageUpload, uploadUserImagestoS3Http);
router.get('/aws/getUserImages', getUserImagesHttp);
router.delete('/aws/deleteUserImage/:imageTitle', deleteUserImageHttp);
router.post('/aws/upload/font', fontUpload, uploadFontToS3Http);
router.get('/aws/fonts', getUserFontsHttp);
router.post('/aws/uploadSounds', audioUpload, uploadSoundToS3Http);
router.get('/aws/sounds', getUserSoundsHttp);

module.exports = router;