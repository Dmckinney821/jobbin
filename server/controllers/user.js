const User = require('../models/user');
const { normalizeErrors } = require('../helpers/mongoose');
const config = require('../config/dev')
const jwt = require('jsonwebtoken')

exports.auth =  function (req, res) {
  const { email, password } = req.body;
  if (!password || !email) {
    return res.status(422).send({errors: [{title: 'Data missing', details: 'Please input email and password'}] })
    }
    User.findOne({email}, function(err,user){
        if(err){
            return res.status(422).send({errors: normalizeErrors(err.errors)})
        }
        if(!user) {
            return res.status(422).send({errors: [{title: 'Inavlid User', details: 'do not exist'}] })
        }
        if(user.hasSamePassword(password)) {
            const token = jwt.sign({
                userId: user.id,
                username: user.username
            }, config.SECRET, { expiresIn: '1h'});

            // jwt token
            return res.json(token) 
        } else {
            return res.status(422).send({errors: [{title: 'Inavlid Data', details: 'do not match'}] })
        }
       
    })
};


exports.register =  function (req, res) {

    const { username, 
            email, 
            passwordConfirmation, 
            password} = req.body;

    if (!password || !email) {
        return res.status(422).send({errors: [{title: 'Data missing', details: 'Please input email and password'}] })
    }
    if(password !== passwordConfirmation) {
        return res.status(422).send({errors: [{title: 'Invalid passowrd', details: 'Passwords do not match'}] })
    }

    User.findOne({email}, function(err, existingUser){
        if(err){
            return res.status(422).send({errors: normalizeErrors(err.errors)})
        }
        if(existingUser) {
            return res.status(422).send({errors: [{title: 'invalid email', details: 'user already exists'}]})
        }
        const user = new User({
            username,
            email,
            password
        });
        user.save(function(err) {
            if(err){
                return res.status(422).send({errors: normalizeErrors(err.errors)})
            }
            return res.json({"registered": true})
        })
    })
};

exports.authMiddleware = function(req, res, next) {
    const token = req.headers.authorization;
    if(token) {
        const user = parseToken(token)
        User.findById(user.userId, function(err, user) {
            if(err) {
                return res.status(422).send({errors: normalizeErrors(err.errors)})
            } 
            if(user) {
                res.locals.user = user;
                next();
            } else {
                return notAuthorized(res)            }
        })

    } else {
        return notAuthorized(res)
    }
}

function parseToken(token) {
    
    return jwt.verify(token.split(' ')[1], config.SECRET)
}

function notAuthorized(res) {
    return res.status(401).send({errors: [{title: 'not authorized', details: 'log in'}]})
}