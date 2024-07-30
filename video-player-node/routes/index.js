// localhost:5000/api/test

const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => {
  res.json({ message: 'Server is working!' });
});

module.exports = router;