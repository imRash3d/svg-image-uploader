const express = require('express');


const { Router } = express;

const router = Router();

const fileController = require('../controller/file');



router.get('/', fileController.getFile);




module.exports = router;