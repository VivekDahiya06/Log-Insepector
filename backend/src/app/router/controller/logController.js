import { JsonDB, Config } from 'node-json-db';
import { v4 as uuidv4 } from 'uuid';
import { LogSchema } from '../../Schema/LogSchema.js';

// Initialize the JSON database for storing logs
const db = new JsonDB(new Config("data/logs", true, true, "/"));

/**
 * Controller to handle adding a new log entry.
 * Validates the log using Zod, generates a unique ID, and saves it to the database.
 */
export const addLog = async (req, res) => {
  const result = LogSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: "Validation failed",
      details: result.error.errors.map(e => ({
        field: e.path.join('.'),
        message: e.message,
      }))
    });
  }

  const logEntry = {
    id: uuidv4(),
    ...result.data,
  };

  try {
    await db.push("/logs[]", logEntry);
    res.status(201).json(logEntry);
  } catch (err) {
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
