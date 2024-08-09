// Importing modules
const express = require("express");
const router = express.Router();
const sqlite = require('better-sqlite3');
const path = require('path');

// Connecting to the SQLite database
const db = new sqlite(path.resolve('numbers.db'), { fileMustExist: true });


router.post('/number', (req, res) => {
    const { value } = req.body;

    if (typeof value !== 'number') {
        return res.status(400).json({
            success: false,
            message: 'Invalid input: value must be a number.'
        });
    }

    const insert = db.prepare('INSERT INTO numbers (value) VALUES (?)');
    try {
        const result = insert.run(value);
        res.status(201).json({
            success: true,
            message: 'Number added successfully.',
            data: {}   
        });
    } catch (err) {
        console.error('Error inserting data:', err.message);
        res.status(500).json({
            success: false,
            message: 'Internal server error.',
            error: err.message
        });
    }
});

router.get('/number', (req, res) => {
    const query = 'SELECT * FROM numbers';
    try {
        const data = db.prepare(query).all();
        res.status(200).json({
            success: true,
            message: 'All numbers fetched successfully',
            data
        });
    } catch (err) {
        console.error('Error retrieving data:', err.message);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: err.message
        });
    }
});


module.exports = router;
