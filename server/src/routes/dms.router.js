import express from 'express';
import {
    listDMUsers, getDMs, postDM, createDM,
} from '../controllers/dms.controller.js';

const router = express.Router();

router.get('/', listDMUsers);
router.post('/', createDM);
router.get('/:user', getDMs);
router.post('/:user', postDM);

export default router;
