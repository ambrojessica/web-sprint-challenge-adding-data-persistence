// build your `/api/tasks` router here
const express = require('express');
const router = require('express').Router();
const Tasks = require('./model');

//get 
router.get('/', (req, res, next) => {
  Tasks.getAll()
    .then(task => {
      res.json(task);
    })
    .catch(err => {
      next(err);
    });
});

//post
router.post('/', (req, res, next) => {
  Tasks.create(req.body)
    .then(newTask => {
      res.status(200).json(newTask);
    })
    .catch(err => {
      next(err);
    });
});


module.exports = router;
