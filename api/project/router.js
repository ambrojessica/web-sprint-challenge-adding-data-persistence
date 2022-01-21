// build your `/api/projects` router here
const express = require('express');
const router = require('express').Router();
const Projects = require('./model');

//get
router.get('/', (req, res, next) => {
  Projects.getAll()
    .then(proj => {
      res.status(200).json(proj);
    })
    .catch(err => {
      next(err);
    });
});

//post
router.post('/', (req, res, next) => {
  Projects.create(req.body)
    .then(newP => {
      res.status(200).json(newP);
    })
    .catch(next);
});


module.exports = router;