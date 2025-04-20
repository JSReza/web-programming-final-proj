const express = require('express');
const router = express.Router();
const model = require('../models/friends');
router
    .get('/', (req, res, next) => {
        model.getFriends().then((data) => {
            res.send(data)
        }).catch(next)

    })
    .get('/:id', (req, res, next) => {
        const { id } = req.params
        model.getFriend(id).then((data) => {
            res.send(data)
        }).catch(next)

    })
    .post('/', (req,res, next) => {
        const newData = req.body;
        model.createFriend(newData).then((data) => {
            res.send(data)
        }).catch(next)
       
    })
    .patch('/:id', (req,res, next) => {
        const { id } = req.params
        const newData = req.body;
        model.updateFriend(id, newData).then((data) => {
            res.send(data)
        }
        ).catch(next)
    })
    .delete('/:id', (req,res, next) => {
        const { id } = req.params
        model.deleteFriend(id).then((data) => {
            res.send(data)
        }).catch(next)
    })
module.exports = router