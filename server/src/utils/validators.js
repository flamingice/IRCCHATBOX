/**
 * Sanitizes a string to prevent path traversal and removes newlines.
 * @param {string} input - The input string to sanitize.
 * @returns {string} - The sanitized string.
 */
export const sanitizeInput = (input) => {
    return input.replace(/[\\/:\n\r]/g, ''); // Remove path separators and newlines
};

/**
 * Strictly sanitizes input for log files
 * @param {string} input - The input string to sanitize
 * @returns {string} - Sanitized string or empty string if invalid
 */
export const strictSanitize = (input) => {
    if (typeof input !== 'string') return '';

    // Remove ALL non-alphanumeric chars except safe punctuation
    // Allow only: letters, numbers, spaces, hyphens, underscores, dots (with restrictions)
    const sanitized = input.replace(/[^a-zA-Z0-9 _\-.]/g, '');

    // Additional safety checks
    return sanitized
        .replace(/\.{2,}/g, '')     // Remove consecutive dots (prevents ../)
        .replace(/\s+/g, ' ')       // Collapse multiple spaces
        .trim()                     // Trim whitespace
        .substring(0, 100);         // Length limit
};

/**
 * Validates a timestamp string in "YYYY-MM-DD HH:mm" format.
 * @param {string} timestamp - The timestamp to validate.
 * @returns {boolean} - True if valid, false otherwise.
 */
export const isValidTimestamp = (timestamp) => {
    if (typeof timestamp !== 'string') return false;

    // Try to parse the timestamp
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) return false;

    const formatted = formatDate(date);
    return formatted === timestamp;
};

/**
 * Strictly sanitizes DM message content
 */
export const sanitizeDMContent = (input) => {
    if (typeof input !== 'string') return '';

    // Allow letters, numbers, spaces, basic punctuation, AND backslashes
    const sanitized = input.replace(/[^\w\s.,!?@#'"\-\\]/g, '');

    // Security: Neutralize dangerous patterns (even if they sneak through)
    return sanitized
        .replace(/<\?.*?\?>/g, '')      // Remove PHP tags
        .replace(/system\(.*?\)/g, '')  // Remove system() calls
        .replace(/\b(eval|exec|cmd|sh)\b/gi, '') // Block dangerous commands
        .substring(0, 1000);            // Length limit
};

/**
 * Enhanced message validation
 */
export const validateDMMessage = ({ sender, text, timestamp }) => {
    // Timestamp validation (same as before)
    const timestampRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/;
    if (!timestampRegex.test(timestamp)) return false;

    // Strict sanitization
    const sanitizedSender = sender.replace(/[^\w\- ]/g, '').substring(0, 50);
    const sanitizedText = sanitizeDMContent(text);

    return {
        sender: sanitizedSender,
        text: sanitizedText,
        timestamp,
        isValid: sanitizedSender.length > 0 &&
            sanitizedText.length > 0 &&
            sanitizedText === text // Ensure no dangerous content was removed
    };
};

// Helper function to format date as "YYYY-MM-DD HH:mm"
const formatDate = (date) => {
    const pad = (num) => num.toString().padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth()+1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
};
