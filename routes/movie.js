"use strict"
var express = require('express')
var router = express.Router()

var Movie = {}

/* GET users listing. */
router.post('/', function(req, res, next) {
  console.log("POST: ", req.body)
  if(!req.body){
    res.status(403).json({error: true, message: 'Body empty'})
  }

  let _movie = req.body
    _movie._id = Date.now()

  Movie[_movie._id] = _movie

  res.status(201).json({movie: Movie[_movie._id]})
})

module.exports = router
