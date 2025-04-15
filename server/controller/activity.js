const express = require('express');
const router = express.Router();

router
    .get('/', (req, res) => {
        res.send([
            { id: 1, type: 'Activity 1', duration: 30, date: '2025-01-01' },
            { id: 2, type: 'Activity 2', duration: 30, date: '2025-01-01' },
            { id: 3, type: 'Activity 3', duration: 30, date: '2025-01-01' }
        ])
})
.get('/:id', (req, res) => {
    const { id } = req.params;
    res.send({ id, type: 'Activity 1', duration: 30, date: '2025-01-01' })
})
.post('/', (req, res) => {
    const { type, duration, date } = req.body;
    
        res.send({
            id: 1,
            type,
            duration,
            date
        })
})
.patch('/:id', (req, res) => {
    const { id } = req.params
    const { type, duration, date } = req.body;

    res.send({
        id,
        type,
        duration,
        date
    })
})
.delete('/:id', (req, res) => {
    const { id } = req.params

    res.send({
        message: `Product ${id} deleted`
    })
})
module.exports = router
