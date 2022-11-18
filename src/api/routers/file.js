const express = require('express');


const { Router } = express;

const router = Router();

const fileController = require('../controller/file');



router.post('/small-svg', fileController.getSmallChartImageBuffer);




module.exports = router;