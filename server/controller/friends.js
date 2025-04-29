const express = require('express');
const router = express.Router();
const model = require('../models/friends');
const db = require('../db');
router.get('/', async (req, res, next) => {
    try {
        const result = await db.query('SELECT * FROM friends');
        res.json(result.rows);
    } catch (err) {
        next(err);
    }
    });
    router.get('/:id/activities', async (req, res, next) => {
        try {
            const result = await db.query(
                'SELECT * FROM friend_activities WHERE friend_id = $1 ORDER BY date DESC',
                [req.params.id]
            );
            res.json(result.rows);
        } catch (err) {
            next(err);
        }
    });
    router.get('/:id', (req, res, next) => {
        const { id } = req.params
        model.getFriend(id).then((data) => {
            res.send(data)
        }).catch(next)

    })
    router.post('/', (req,res, next) => {
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