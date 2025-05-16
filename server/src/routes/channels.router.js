import express from 'express';
import {
    listChannels, createChannel, getChannelMessages, postChannelMessage, getLatestTimestamps
} from '../controllers/channels.controller.js';

const router = express.Router();



router.get('/', listChannels);
router.get('/latest', getLatestTimestamps);
router.post('/', createChannel);
// GET /channels/:channel
router.get('/:channel', getChannelMessages);
// POST /channels/:channel
router.post('/:channel', postChannelMessage);

export default router;
