/**
 * Parses a newline-delimited JSON log file string into an array of message objects.
 *
 * @param {string} data - The raw content of the log file, where each line is a JSON string.
 * @returns {Array<Object>} An array of parsed message objects, skipping empty lines and invalid JSON.
 */
export const parseLogFile = (data) => {
    return data
        .split('\n')
        .filter(Boolean)
        .map((line) => {
            try {
                return JSON.parse(line);
            } catch (err) {
                return null;
            }
        })
        .filter(Boolean);
};

/**
 * Formats a message into a single-line JSON string for log file storage.
 *
 * @param {string} user - The username of the message sender.
 * @param {string} timestamp - The timestamp of the message.
 * @param {string} text - The content of the message.
 * @returns {string} A JSON-formatted string representing the message.
 */
export const formatMessageLine = (user, timestamp, text) => {
    return JSON.stringify({ user, timestamp, text });
};
