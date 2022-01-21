// build your `/api/resources` router here
const express = require('express');
const router = express.Router();
const Resources = require('./model');

//get
router.get('/', async (req, res, next) => {
  try {
    const getResource = await Resources.getAll();
    res.status(200).json(getResource);
  }
  catch (err) {
    next(err);
  }
});

//post
router.post('/', async (req, res, next) => {
  try {
    const updateRes = await Resources.update(req.body);
    res.json(updateRes);
  }
  catch {
    next();
  }
});


module.exports = router;