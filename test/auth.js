"use strict"
let request = require('supertest-as-promised')
const _ = require('lodash')
const api = require('../app')
const host = api

request = request(host)

describe('Ruta para los auth:', function(){
  describe('POST /', function(){
    it.only('deberia autenticar un usuario', function(done){
      let user = {
        'username': 'gilberto',
        'password': 'secret'
      }

      request
        .post('/user')
        .set('Accept', 'application/json')
        .send(user)
        .expect(201)
        .expect('Content-Type', /application\/json/)
      .then((res) => {
        user = res.body.user
        
        return request
          .post('/auth')
          .set('Accept', 'application/json')
          .send(user)
          .expect(201)
          .expect('Content-Type', /application\/json/)
      })
      .then((res) => {
        let body = res.body

        expect(body).to.have.property('token')
        done()
      }, done)
    })
  })

})