import express from 'express';
import path from 'path';
import fs from 'mz/fs';
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
// TODO POST	Create(以此为准)

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
// TODO PUT Update/Replace(以此为准)
router.put('/', async (req, res) => {
    const reqPath = req.body.path;
    const pathArr = reqPath.split('#');
    const filePath = path.join(config.projectPath, pathArr[0]);
    const childPath = pathArr[1];
    let fileContent;
    let data;
    if (childPath) {
        data = await readFile(filePath);
        data = JSON.parse(data);
    }
    switch (req.body.action) {
        case 'update':
/*            const reqPath = req.body.path;
            const pathArr = reqPath.split('#');
            const filePath = path.join(config.projectPath, pathArr[0]);
            const childPath = pathArr[1];
            let fileContent; */
            if (childPath) {
                // let data = await readFile(filePath);
                // data = JSON.parse(data);
                delete data[childPath];

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
            break;
        case 'rename':
            const reqNewPath = req.body.newPath;
            const pathNewArr = reqNewPath.split('#');

            try {
                if (childPath) {
                    const childNewPath = pathNewArr[1];
                    data[childNewPath] = data[childPath];
                    delete data[childPath];
                    fileContent = JSON.stringify(data, null, 4);
                    const r = await writeFile(filePath, fileContent);
                } else {
                    await fs.rename(reqPath, reqNewPath);
                }

                res.json({
                    success: true,
                });
            } catch (e) {
                res.json({
                    success: false,
                    data: e,
                });
            }
            break;
        default:
            break;
    }
});

router.delete('/', async (req, res) => {
    const reqPath = req.query.path;
    const filePath = path.join(config.projectPath, reqPath);
    const childPath = req.query.childPath;
    try {
        if (childPath) {
            let data = await readFile(filePath);
            data = JSON.parse(data);
            delete data[childPath];
            const fileContent = JSON.stringify(data, null, 4);
            await fs.writeFile(filePath, fileContent);
        } else {
            await fs.unlink(filePath);
        }
        res.json({
            success: true,
        });
    } catch (e) {
        res.json({
            success: false,
            data: e,
        });
    }
});

export default router;
