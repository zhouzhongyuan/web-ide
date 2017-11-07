const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

const basePath = '/home/y/project/2017/06/yesdemo/src/thgn/';
/* GET users listing. */
router.get('/', (req, res, next) => {
    console.log(req.query.path);
    // if (!req.query.path) {
    //     res.send('没有文件名');
    //     return;
    // }
    const filePath = path.join(basePath, req.query.path);
    // const stat = fs.statSync(filePath);
    //
    // res.writeHead(200, {
    //     'Content-Type': 'text/plain',
    //     'Content-Length': stat.size,
    // });
    //
    // const readStream = fs.createReadStream(filePath);
    // readStream.pipe(res);

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

/* GET users listing. */
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
