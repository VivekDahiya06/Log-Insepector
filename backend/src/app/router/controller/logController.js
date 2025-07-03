import { JsonDB, Config } from 'node-json-db';
import { v4 as uuidv4 } from 'uuid';

// Initialize the JSON database for storing logs
const db = new JsonDB(new Config("data/logs", true, true, "/"));

// Helper function to validate the structure and content of a log entry
// Returns null if valid, or an error message string if invalid
const isValidLog = (log) => {
    const requiredFields = ["level", "message", "resourceId", "timestamp", "traceId", "spanId", "commit"];
    const validLevels = ["error", "warn", "info", "debug"];

    for (const field of requiredFields) {
        if (!log[field]) return `Missing required field: ${field}`;
    }

    if (!validLevels.includes(log.level)) {
        return `Invalid level: must be one of error, warn, info, debug`;
    }

    // Check timestamp format (basic ISO 8601 check)
    if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z/.test(log.timestamp)) {
        return `Invalid timestamp format. Must be ISO 8601 (e.g., 2023-09-15T08:00:00Z)`;
    }

    return null;
};

/**
 * Controller to handle adding a new log entry.
 * Validates the log, generates a unique ID, and saves it to the database.
 * Responds with the created log or an error message.
 */
export const addLog = async (req, res) => {
    const log = req.body;
    const error = isValidLog(log);
    if (error) {
        // Always respond with 400 for validation errors
        return res.status(400).json({ error });
    }
    const logEntry = {
        id: uuidv4(),
        ...log,
    };
    try {
        await db.push("/logs[]", logEntry);
        res.status(201).json(logEntry);
    } catch (err) {
        // Respond with 500 for server/database errors
        res.status(500).json({ error: "Failed to save log" });
    }
};

/**
 * Controller to fetch all log entries from the database.
 * Responds with an array of logs, or an empty array if none exist.
 */
export const getAllLogs = async (req, res) => {
    try {
        const logs = await db.getData("/logs");
        res.json(logs);
    } catch {
        res.json([]);
    }
};

/**
 * Controller to fetch a single log entry by its unique ID.
 * Responds with the log if found, or a 404 error if not found.
 */
export const getLogById = async (req, res) => {
    const { id } = req.params;
    try {
        const logs = await db.getData("/logs");
        const log = logs.find(l => l.id === id);
        if (!log) return res.status(404).json({ message: "Log not found" });
        res.json(log);
    } catch {
        res.status(500).json({ error: "Failed to fetch log" });
    }
}; 