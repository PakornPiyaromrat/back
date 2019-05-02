const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

const User = require('../models/userModel')

router.post('/register', (req, res, next) => {
    User
        .find({email: req.body.email})
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: 'mail exists'
                })
            } else {
                const user = new User({
                    name: req.body.name,
                    surename: req.body.surename,
                    email: req.body.email,
                    password: req.body.password
                })
                
                user
                .save()
                .then(result => {
                    res.status(201).json({
                        message: 'user created'
                    })
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    })
                })
            }
        })
   
})



router.delete('/:userId', (req, res, next) => {
    User
    .find({_id: req.params.userId})
    .exec()
    .then(result => {
        if(result.length < 1){
            return res.status(409).json({
                message: 'no user'
            })
        } else {
            User
            .remove({_id: req.params.userId})
            .exec()
            .then(output => {
                res.status(500).json({
                    message: 'user deleted'
                })
            })
        }
        
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
})

// router.delete('/:userId', (req, res, next) => {
//     User.remove({_id: req.params.userId})
//     .exec()
//     .then(result => {
//         res.status(500).json({
//             message: 'user deleted'
//         })
//     })
//     .catch(err => {
//         console.log(err)
//         res.status(500).json({
//             error: err
//         })
//     })
// })

module.exports = router
