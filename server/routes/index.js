import express from 'express';
import path from 'path';
import config from '../config';

const router = express.Router();

router.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname, '../../build', 'index.html'));
});

export default router;
