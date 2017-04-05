"use strict"
let request = require('supertest-as-promised')
const _ = require('lodash')
const mongoose = require('mongoose')
const config = require('../lib/config')
const api = require('../app')
const host = api

request = request(host)

describe('Ruta para los auth:', function(){
  before(() => {
    mongoose.connect(config.database)
  })

  after((done) => {
    mongoose.disconnect(done)
    mongoose.models = {}
  })

  describe('POST /', function(){
    it('deberia autenticar un usuario', function(done){
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
        //user = res.body.user #Si hago esto el usuario se envia con el password encriptado...
        
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