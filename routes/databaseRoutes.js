const express = require('express');
const router = express.Router();
const getStreamerHashesHttp = require('../http_endpoints/getStreamerHashesHttp');
const getTokensFromDatabase = require('../http_endpoints/getTokensFromDatabaseHttp');
const getStreamerPromptsWithPresetsHttp = require('../http_endpoints/getStreamerPromptsWithPresetsHttp');
const getSubsFromDatabaseHttp = require('../http_endpoints/getSubsFromDatabaseHttp');
const generatePromptHttp = require('../http_endpoints/generatePromptHttp');
const toggleActiveHttp = require('../http_endpoints/promptEdits/toggleActiveHttp');
const createNewPromptHttp = require('../http_endpoints/promptEdits/createNewPromptHttp');
const deletePromptHttp = require('../http_endpoints/promptEdits/deletePromptHttp');
const savePromptHttp = require('../http_endpoints/promptEdits/savePromptHttp');
const editPromptNameHttp = require('../http_endpoints/promptEdits/editPromptNameHttp');
const getStreamerLayoutsWithPresetsHttp = require('../http_endpoints/getStreamerLayoutsWithPresetsHttp');
const createNewLayout = require('../http_endpoints/layoutEdits/createNewLayoutHttp');
const saveLayoutHttp = require('../http_endpoints/layoutEdits/saveLayoutHttp');
const editLayoutNameHttp = require('../http_endpoints/layoutEdits/editLayoutNameHttp');
const deleteLayoutHttp = require('../http_endpoints/layoutEdits/deleteLayoutHttp');
const updateActiveStatusHttp = require('../http_endpoints/layoutEdits/updateActiveStatusHttp');
const getActiveSlideshowLayoutHttp = require('../http_endpoints/getActiveSlideshowLayoutHttp');
const getActiveAlertsLayoutsHttp = require('../http_endpoints/getActiveAlertsLayoutsHttp');
const imageTransferHttp = require('../http_endpoints/imageTransferHttp');
const getAllUsersHttp = require('../http_endpoints/getAllUserHttp');
const updateUserPermissionsHttp = require('../http_endpoints/updateUserPermissionsHttp');

router.get('/db/hashes', getStreamerHashesHttp);
router.get('/db/getAccessAndRefreshTokens', getTokensFromDatabase);
router.get('/db/getPrompts', getStreamerPromptsWithPresetsHttp);
router.get('/db/generatePrompt', generatePromptHttp);
router.get('/db/getLayouts', getStreamerLayoutsWithPresetsHttp);
router.get('/db/getSubsFromDatabase', getSubsFromDatabaseHttp);
router.get('/db/layouts/activeSlideshow/:slideshowHash', getActiveSlideshowLayoutHttp);
router.get('/db/layouts/activeAlerts/:alertsHash', getActiveAlertsLayoutsHttp);
router.get('/db/getAllUsers', getAllUsersHttp);
router.put('/db/updateUserPermissions', updateUserPermissionsHttp);

//Prompt edits
router.put('/db/prompts/active/:id', toggleActiveHttp);
router.post('/db/prompts/create', createNewPromptHttp);
router.delete('/db/prompts/delete', deletePromptHttp);
router.put('/db/prompts/savePrompt/:id', savePromptHttp);
router.put('/db/prompts/updateName/:id', editPromptNameHttp);

//Layout edits
router.post('/db/layouts/create', createNewLayout)
router.put('/db/layouts/saveLayout/:id', saveLayoutHttp);
router.put('/db/layouts/updateName/:id', editLayoutNameHttp);
router.delete('/db/layouts/delete/:id', deleteLayoutHttp);
router.put('/db/layouts/active/:id', updateActiveStatusHttp);

//Image Migration
router.get('/imageTransfer', imageTransferHttp);

module.exports = router;