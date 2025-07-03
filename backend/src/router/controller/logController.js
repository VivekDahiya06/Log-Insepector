import { JsonDB, Config } from 'node-json-db';
import { v4 as uuidv4 } from 'uuid';
import { LogSchema } from '../../Schema/logSchema.js';

// Initialize the JSON database for storing logs
const db = new JsonDB(new Config("data/logs", true, true, "/"));


/*
* @GET
* Route: '/logs'
* Description: Gets all the logs from Database.
*/
export const getAllLogs = async (req, res) => {
    try {
        const logs = await db.getData("/logs");
        res.json(logs);
    } catch {
        res.json([]);
    }
};


/*
* @POST
* Route: '/logs'
* Description: Post a single log in the Database.
! Required: Make sure to send the log in the body of the request as JSON.
*/
export const postLogs = async (req, res) => {
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
