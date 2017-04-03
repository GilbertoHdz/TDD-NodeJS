"use strict"
let request = require('supertest-as-promised')
const api = require('../app')
const host = api

request = request(host)

describe('la ruta de peliculas', function(){
  describe('una peticion a POST', function(){
    it('deberia crear una pelicula', function(done){
      let movie = {
        'title': 'back to the future',
        'year': '1985'
      }

      request
        .post('/movie')
        .set('Acept', 'application/json')
        .send(movie)
        .expect(201)
        .expect('Content-Type', /application\/json/)
      .end((err, res) => {
        let body = res.body
        
        expect(body).to.have.property('movie')
        movie = body.movie

        expect(movie).to.have.property('title', 'back to the future')
        expect(movie).to.have.property('year', '1985')
        expect(movie).to.have.property('_id')
        
        done(err)
      })
    })
  })
})