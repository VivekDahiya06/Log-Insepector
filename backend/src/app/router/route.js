import { Router } from "express";
import { getAllLogs, postLogs } from "./controller/logController";

const router = Router();

/* 
 * @GET 
 * Route: '/logs'
 * Description: Gets all the logs from Database.
*/
router.get('/logs', getAllLogs);


/* Route to add a new log entry
* @POST /logs
* Route: '/logs'
* Description: Post a single log in the Database.
! Required: Make sure to send the log in the body of the request as JSON.
*/
router.post('/logs', postLogs);


export default router;