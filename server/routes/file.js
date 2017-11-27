import express from 'express';
import path from 'path';
import { readFile, writeFile } from '../util';
import config from '../config';

const router = express.Router();

router.get('/', async (req, res) => {
    const filePath = path.join(config.projectPath, req.query.path);
    const childPath = req.query.childPath;
    try {
        const data = await readFile(filePath);
        res.json({
            success: true,
            content: childPath ? JSON.parse(data)[childPath] : data,
        });
    } catch (e) {
        res.json({
            success: false,
            content: e,
        });
    }
});

// 非幂等 修改文件
router.post('/', async (req, res) => {
    const reqPath = req.body.path;
    const pathArr = reqPath.split('#');
    const filePath = path.join(config.projectPath, pathArr[0]);
    const childPath = pathArr[1];
    let code = req.body.code;
    if (childPath) {
        let data = await readFile(filePath);
        data = JSON.parse(data);
        data[childPath] = JSON.parse(code);
        code = JSON.stringify(data, null, 4);
    }
    try {
        const data = await writeFile(filePath, code);
        res.send(data);
    } catch (e) {
        res.send(`Write file ${filePath} fail.`);
    }
});

// put 幂等 添加文件

router.put('/', async (req, res) => {
    const reqPath = req.body.path;
    const pathArr = reqPath.split('#');
    const filePath = path.join(config.projectPath, pathArr[0]);
    const childPath = pathArr[1];
    let fileContent;
    if (childPath) {
        let data = await readFile(filePath);
        data = JSON.parse(data);
        data[childPath] = '';

        fileContent = JSON.stringify(data, null, 4);
    } else {
        fileContent = '';
    }

    try {
        const r = await writeFile(filePath, fileContent);
        res.json({
            success: true,
            data: r,
        });
    } catch (e) {
        res.json({
            success: false,
            data: e,
        });
    }
});

export default router;
