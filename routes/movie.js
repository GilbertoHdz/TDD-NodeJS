"use strict"
const express = require('express')
const _ = require('lodash')
const Movie = require('../lib/model/movie')
const router = express.Router()

/* GET users listing. */
router
.post('/', function(req, res, next) {
  console.log("POST: ", req.body)
  if(!req.body){
    res.status(403).json({error: true, message: 'Body empty'})
  }

  let _movie = req.body
  
  new Movie({
    title: _movie.title,
    year: _movie.year
  })
  .save((err, movie) => {
    if(err){
      res.status(403).json({error: true, message: err})
    }
    
    res.status(201).json({movie: movie})
  })
})

.get('/', function(req, res, next) {
  console.log("GET: ", req.body)
  Movie.find({}, (err, movies) => {
    if(err){
      res.status(403).json({error: true, message: err})
    }

    res.status(200).json({movies: movies})
  })
})

.get('/:id', function(req, res, next){
  console.log("GET:id", req.params.id)
  if(!req.params.id){
    res.status(403).json({error: true, message: 'Params empty'})
  }

  let _id = req.params.id
  Movie.findOne({_id: _id}, (err, movie) => {
    if(err){
      res.status(403).json({error: true, message: err})
    }

    res.status(200).json({movie: movie})
  })
})

.put('/:id', function(req, res, next){
  console.log("PUT:id ", req.params.id)
  if(!req.params.id && !req.body){
    res.status(403).json({error: true, message: 'Params empty'})
  }

  let _id = req.params.id
  let new_movie = {}

  new_movie.title = req.body.title ? req.body.title : undefined;
  new_movie.year = req.body.year ? req.body.year : undefined;

  Movie.findByIdAndUpdate(_id, { new_movie }, {new: true}, (err, movie) => {
    if(err){
      res.status(403).json({error: true, message: err})
    }
    
    res.status(200).json({movie: movie})
  })
})

.delete('/:id', function(req, res, next){
  console.log("DELETE:id ", req.params.id)
  if(!req.params.id){
    res.status(403).json({error: true, message: 'Params empty'})
  }

  let _id = req.params.id

  Movie.findByIdAndRemove(_id, (err, done) => {
    if(err){
      res.status(403).json({error: true, message: err})
    }
    
    res.status(400).json({})
  })
})

module.exports = router
