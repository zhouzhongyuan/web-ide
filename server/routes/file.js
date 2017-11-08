const express = require('express');
const fs = require('fs');
const path = require('path');
const config = require('../config');
const router = express.Router();

router.get('/', (req, res, next) => {
    const filePath = path.join(config.projectPath, req.query.path);
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.json({
                success: false,
            });
            return;
        }
        res.json({
            success: true,
            content: data,
        });
    });
});

router.put('/', (req, res, next) => {
    const filePath = path.join(basePath, req.body.path);
    const code = req.body.code;
    fs.writeFile(filePath, code, (err) => {
        if (err) {
            return console.log(err);
        }
        res.send(`Write file ${filePath} success.`);
    });
});

module.exports = router;
