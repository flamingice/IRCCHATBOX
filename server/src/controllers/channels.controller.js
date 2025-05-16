import fs from 'fs';
import path from 'path';
import { parseLogFile, formatMessageLine } from '../utils/logParser.js';

const LOG_DIR = path.resolve('src/logs/channels');
const DM_DIR = path.resolve('src/logs/dms');

/**
 * Lists all available channels by reading the log directory.
 *
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @returns {void}
 */
export const listChannels = (req, res) => {
    try {
        const files = fs.readdirSync(LOG_DIR);
        const channels = files
            .filter((file) => file.endsWith('.log'))
            .map((file) => file.replace('.log', ''));

        res.json(channels);
    } catch (err) {
        res.status(500).json({ error: 'Failed to read channel directory.' });
    }
};

/**
 * Creates a new channel file with the provided name.
 *
 * @param {import('express').Request} req - Express request object containing `name` in the body.
 * @param {import('express').Response} res - Express response object.
 * @returns {Object} - A JSON response indicating success or error.
 */
export const createChannel = (req, res) => {
    const { name } = req.body;
    if (!name || name.includes('/') || name.includes('\\')) {
        return res.status(400).json({ error: 'Invalid channel name.' });
    }

    const filePath = path.join(LOG_DIR, `${name}.log`);

    if (fs.existsSync(filePath)) {
        return res.status(400).json({ error: 'Channel already exists.' });
    }

    try {
        fs.writeFileSync(filePath, '', 'utf-8');
        res.status(201).json({ success: true, name });
    } catch {
        res.status(500).json({ error: 'Failed to create channel.' });
    }
};

/**
 * Retrieves and parses messages from a specific channel log file.
 *
 * @param {import('express').Request} req - Express request object with `channel` param.
 * @param {import('express').Response} res - Express response object.
 * @returns {Object} - A JSON response indicating success or error.
 */
export const getChannelMessages = (req, res) => {
    const { channel } = req.params;
    const logFile = path.join(LOG_DIR, `${channel}.log`);

    if (!fs.existsSync(logFile)) {
        return res.status(404).json([]);
    }

    try {
        const data = fs.readFileSync(logFile, 'utf-8');
        const messages = parseLogFile(data);
        return res.json(messages);
    } catch (err) {
        return res.status(500).json({ error: 'Failed to read log file.' });
    }
};

/**
 * Appends a new message to the specified channel log file.
 *
 * @param {import('express').Request} req - Express request with `channel` param and body containing `user`, `text`, and `timestamp`.
 * @param {import('express').Response} res - Express response object.
 * @returns {Object} - A JSON response indicating success or error.
 */
export const postChannelMessage = (req, res) => {
    const { channel } = req.params;
    const { user, text, timestamp } = req.body;

    if (!user || !text || !timestamp) {
        return res.status(400).json({ error: 'Missing user, text, or timestamp.' });
    }

    const logFile = path.join(LOG_DIR, `${channel}.log`);
    const line = formatMessageLine(user, timestamp, text);

    try {
        fs.appendFileSync(logFile, '\n' + line + '\n', 'utf-8');

        return res.status(201).json({ success: true });
    } catch (err) {
        return res.status(500).json({ error: 'Failed to write to log file.' });
    }
};

/**
 * Returns the latest message timestamps from both channel and DM logs.
 *
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @returns {Object} - A JSON response indicating success or error.
 */
export const getLatestTimestamps = (req, res) => {
    const result = {
        channels: {},
        dms: {}
    };

    /**
     * Reads the latest timestamp from log files in a given directory.
     *
     * @param {string} dirPath - Path to the directory containing .log files.
     * @returns {Object<string, string>} - Map of file names to latest timestamps.
     */
    const readLatest = (dirPath) => {
        const map = {};
        const files = fs.existsSync(dirPath) ? fs.readdirSync(dirPath) : [];

        for (const file of files) {
            if (!file.endsWith('.log')) {
                continue;
            }

            const filepath = path.join(dirPath, file);
            const content = fs.readFileSync(filepath, 'utf-8').trim();
            const lastLine = content.split('\n').filter(Boolean).pop();

            try {
                const last = JSON.parse(lastLine);
                map[file.replace('.log', '')] = last.timestamp;
            } catch (e) {
                continue;
            }
        }

        return map;
    };

    result.channels = readLatest(LOG_DIR);
    result.dms = readLatest(DM_DIR);

    return res.json(result);
};
