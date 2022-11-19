const express = require('express');


const { Router } = express;

const router = Router();

const fileController = require('../controller/file');



router.post('/small-svg', fileController.getSmallChartImageBuffer);

router.post('/svg', fileController.getChartImageBuffer);


module.exports = router;