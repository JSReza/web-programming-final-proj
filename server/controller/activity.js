const express = require('express');
const router = express.Router();
const model = require('../models/activity');

router
    .get('/', (req, res) => {
        model.getActivities().then((data) => {
            res.send(data)
        }).catch((err) => {
            res.status(500).send({ error: 'Failed to fetch activities' });
        })
})
.get('/:id', (req, res) => {
    const { id } = req.params;
    model.getActivity(id).then((data) => {
        res.send(data)
    }).catch((err) => {
        res.status(404).send({ error: 'Activity not found' });
    })
})
.post('/', (req, res) => {
    const newData = req.body;
    model.createActivity(newData).then((data) => {
        res.status(201).send(data)
    }).catch((err) => {
        res.status(400).send({ error: 'Failed to create activity' });
    })
})
.patch('/:id', (req, res) => {
    const { id } = req.params
    const newData = req.body;
    model.updateActivity(id, newData).then((data) => {
        res.send(data)
    }).catch((err) => {
        res.status(404).send({ error: 'Activity not found' });
    })

})
.delete('/:id', (req, res) => {
    const { id } = req.params
    model.deleteActivity(id).then((data) => {
        res.send(data)
    }).catch((err) => {
        res.status(404).send({ error: 'Activity not found' });
    })
})
module.exports = router
