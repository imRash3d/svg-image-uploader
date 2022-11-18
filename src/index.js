const express = require('express');
const app = express();
const PORT = 3000;
const bodyParser = require("body-parser");
const router = require('./api/routers/file');


app.use(bodyParser.json());
app.use('/api/file', router);

app.listen(PORT, () => {
    console.log('server running on 3000');


});




