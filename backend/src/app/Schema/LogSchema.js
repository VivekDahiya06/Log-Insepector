import { z } from 'zod';

// Define the log schema with stricter validation for IDs and commit
export const LogSchema = z.object({
    level: z.enum(['error', 'warn', 'info', 'debug']),
    message: z.string(),
    resourceId: z.string().regex(/^res[a-zA-Z0-9_-]{6,}$/,
        "Invalid resourceId format. Must start with 'res' and be at least 9 characters long."),
    timestamp: z.string().regex(
        /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z/,
        "Invalid timestamp format. Must be ISO 8601 (e.g., 2023-09-15T08:00:00Z)"
    ),
    traceId: z.string().regex(/^[a-fA-F0-9]{16,32}$/,
        "Invalid traceId format. Must be a 16-32 character hexadecimal string."),
    spanId: z.string().regex(/^[a-fA-F0-9]{8,16}$/,
        "Invalid spanId format. Must be an 8-16 character hexadecimal string."),
    commit: z.string().regex(/^[a-fA-F0-9]{7,40}$/,
        "Invalid commit format. Must be a 7-40 character hexadecimal string."),
    metadata: z.record(z.any()).optional()
});
