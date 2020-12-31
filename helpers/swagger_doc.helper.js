'use strict'

const express = require('express');
const router = express.Router();
const fs = require('fs');

const swaggerDocument = require('./swagger.json');
const swaggerUi = require('swagger-ui-express');
router.use('/docs', swaggerUi.serve);
router.get('/docs', swaggerUi.setup(swaggerDocument));



module.exports = router