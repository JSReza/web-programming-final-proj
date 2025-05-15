const express = require('express');
const router = express.Router();
const model = require('../models/activity');


router.get('/', async (req, res, next) => {
    try {
        const result = await db.query('SELECT * FROM activities ORDER BY date DESC');
        res.json(result.rows);
    } catch (err) {
        next(err);
    }
});
router.get('/types', async (req, res, next) => {
    try {
        const result = await db.query(
            'SELECT DISTINCT type FROM activities ORDER BY type'
        );
        res.json(result.rows.map(row => row.type));
    } catch (err) {
        next(err);
    }
});
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await db.query('SELECT * FROM activities WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Activity not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        next(err);
    }
});
router.post('/', async (req, res, next) => {
    try {
        const { type, duration, date } = req.body;
        const result = await db.query(
            'INSERT INTO activities (type, duration, date) VALUES ($1, $2, $3) RETURNING *',
            [type, duration, date]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        next(err);
    }
});
router.patch('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { type, duration, date } = req.body;
        const result = await db.query(
            'UPDATE activities SET type = $1, duration = $2, date = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING *',
            [type, duration, date, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Activity not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        next(err);
    }
});
router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await db.query('DELETE FROM activities WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Activity not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        next(err);
    }
    router.get('/search/:query', (req, res, next) => {
        const { query } = req.params

        model.search(query).then((data) => {
            res.send(data)
        }).catch(next)

    })
    router.post('/seed', (req, res, next) => {
        const { data } = req.body

        model.seed(data).then((data) => {
            res.status(201).send(data)
        }).catch(next)
    })

});
module.exports = router
