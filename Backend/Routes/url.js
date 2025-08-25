const express = require('express');
const shortUrlhandler = require('../controller/shortURL');

const router = express.Router();

router.post('/', shortUrlhandler);

module.exports = router;
