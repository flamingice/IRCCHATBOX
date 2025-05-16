import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import channelRoutes from './routes/channels.router.js'
import dmRoutes from './routes/dms.router.js';

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/channels', channelRoutes);
app.use('/api/dms', dmRoutes);

export default app;
