import { z } from 'zod';

export const LogSchema = z.object({
    level: z.enum(['error', 'warn', 'info', 'debug']),
    message: z.string(),
    resourceId: z.string().regex(/^res[a-zA-Z0-9_-]{6,}$/, "Invalid resourceId format. Must start with 'res-xxx' and be at least 9 characters long."),
    timestamp: z.string(),
    traceId: z.string().regex(/^[a-zA-Z]+-\d+$/, "Invalid traceId format. Must be in the format 'abc-1234'"),
    spanId: z.string().regex(/^span-\d+$/, "Invalid spanId format. Must be in the format 'span-xxx' where x is number."),
    commit: z.string(),
    metadata: z.record(z.any()).optional()
});

export type Log = z.infer<typeof LogSchema> & { id: string };