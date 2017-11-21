import express from 'express';
import path from 'path';
import config from '../config';
import { readFile, readdir } from '../util';

const router = express.Router();
/**
 * get tree in thgn/config
 * @param {String} fileTreePath - `${projectDirName}/config`
 * @return {JSON}
 *
 * Get all file
 *
 * Analyze each file
 *
 * Generate json
 * */
async function getFileTree(dirPath) {
    const fileList = await readdir(dirPath);
    const data = {};
    for (const fileName of fileList) {
        const filePath = path.join(dirPath, fileName);
        const fileData = await readFile(filePath);
        const objectKey = fileName.slice(0, fileName.lastIndexOf('.'));
        data[objectKey] = {};
        data[objectKey].data = JSON.parse(fileData);
        data[objectKey].path = `config/${fileName}`;
        if (fileName === 'billform.json') {
            data[objectKey].children = [];
            Array.prototype.push.apply(data[objectKey].children, Object.keys(data[objectKey].data));
        }
    }
    return data;
}

router.get('/', async (req, res) => {
    try {
        const data = await getFileTree(`${config.projectPath}/config`);
        res.json({
            success: true,
            data,
        });
    } catch (e) {
        res.json({
            success: false,
            data: e,
        });
    }
});

export default router;
