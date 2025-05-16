import fs from 'fs';
import path from 'path';
import { parseLogFile, formatMessageLine } from '../utils/logParser.js';

const DM_DIR = path.resolve('src/logs/dms');

/**
 * Lists all users who have DM logs by reading the DM directory.
 *
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @returns {Object} - A JSON response indicating success or error.
 */
export const listDMUsers = (req, res) => {
    try {
        const files = fs.readdirSync(DM_DIR);
        const users = files
            .filter((file) => file.endsWith('.log'))
            .map((file) => file.replace('.log', ''));

        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Failed to read DM directory.' });
    }
};

/**
 * Creates a new DM log file for a user with the given name.
 *
 * @param {import('express').Request} req - Express request object containing `name` in the body.
 * @param {import('express').Response} res - Express response object.
 * @returns {Object} - A JSON response indicating success or error.
 */
export const createDM = (req, res) => {
    const { name } = req.body;

    if (!name || name.includes('/') || name.includes('\\')) {
        return res.status(400).json({ error: 'Invalid DM name.' });
    }

    const filePath = path.join(DM_DIR, `${name}.log`);

    if (fs.existsSync(filePath)) {
        return res.status(400).json({ error: 'DM already exists.' });
    }

    try {
        fs.writeFileSync(filePath, '', 'utf-8');
        res.status(201).json({ success: true });
    } catch {
        res.status(500).json({ error: 'Failed to create DM.' });
    }
};

/**
 * Retrieves all messages from a DM log file for a specific user.
 *
 * @param {import('express').Request} req - Express request object with `user` param.
 * @param {import('express').Response} res - Express response object.
 * @returns {Object} - A JSON response indicating success or error.
 */
export const getDMs = (req, res) => {
    const { user } = req.params;
    const filePath = path.join(DM_DIR, `${user}.log`);

    if (!fs.existsSync(filePath))
        return res.status(404).json([]);

    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        const messages = parseLogFile(data);
        res.json(messages);
    } catch {
        res.status(500).json({ error: 'Failed to read DM file.' });
    }
};

/**
 * Appends a new message to a user's DM log file.
 *
 * @param {import('express').Request} req - Express request object with `user` param and body containing `sender`, `text`, and `timestamp`.
 * @param {import('express').Response} res - Express response object.
 * @returns {Object} - A JSON response indicating success or error.
 */
export const postDM = (req, res) => {
    const { user } = req.params;
    const { sender, text, timestamp } = req.body;

    if (!sender || !text || !timestamp) {
        return res.status(400).json({ error: 'Missing sender, text, or timestamp.' });
    }

    const filePath = path.join(DM_DIR, `${user}.log`);
    const line = formatMessageLine(sender, timestamp, text);

    try {
        fs.appendFileSync(filePath, '\n' + line + '\n', 'utf-8');
        res.status(201).json({ success: true });
    } catch {
        res.status(500).json({ error: 'Failed to write to DM file.' });
    }
};
