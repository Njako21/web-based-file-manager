// localhost:5000/api/*

const express = require('express');
const router = express.Router();
const mediaController = require('../controllers/mediaController');

router.get('/videos/:path(*)', mediaController.serveVideo);
router.get('/images/:path(*)', mediaController.serveImage);
router.get('/*', mediaController.getMedia);

module.exports = router;