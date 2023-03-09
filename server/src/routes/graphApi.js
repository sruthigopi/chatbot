const express = require("express");
const router = express.Router();

const saveData =require( '../controller/controlerFile');
const save =require('../controller/getcontroler')

router.route('/').post(saveData);
router.route('/').get(save);

module.exports = router;