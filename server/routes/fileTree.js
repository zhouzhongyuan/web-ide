const express = require('express');

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.json([
          'config.js',
          'billform/index.js',
      ]);
});

module.exports = router;
