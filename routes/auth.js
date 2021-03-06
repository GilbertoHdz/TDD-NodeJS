"use strict"
const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const User = require('../lib/model/user')
const config = require('../lib/config')
const crypto = require('crypto'),
      algorithm = 'aes-256-ctr',
      password = 'M4NIT05'

function encrypt(text){
  let cipher = crypto.createCipher(algorithm, password)
  let crypted = cipher.update(text, 'utf8', 'hex')
      crypted += cipher.final('hex')
      return crypted
}

function decrypt(text){
  let decipher = crypto.createDecipher(algorithm, password)
  let dec = decipher.update(text, 'hex', 'utf8')
  dec += decipher.final('utf8')
  return dec
}

/* POST auth */
router.post('/', function(req, res, next) {
  if(!req.body){
    res.status(403).json({error: true, message: 'Body empty'})
  }

  let _user = req.body
  
  User.findOne({username: _user.username}, (err, user) => {
      console.log("POST AUTH");
      if(err) {
        res.status(403).json({error: true, message: err})
      } else if(user) {
        if(user.password === encrypt(_user.password)){
          let token = jwt.sign(user, config.secret, {
            expiresIn: '24hr'
          })
          console.log("TOKEN", token);
          res.status(201).json({ token: token })
        }
      } else {
        res.status(403).json({ error: true, message: 'El usuario existe' })
      }
  })

})

module.exports = router
