import { Router } from "express";
import { addLog, getAllLogs, getLogById } from "./controller/logController.js";

const router = Router();

/* 
 * @GET 
 * Route: '/logs'
 * Description: Gets all the logs from Database.
*/
router.get('/logs', getAllLogs);


/*
* @GET
* Route: '/logs/:id'
* Description: Gets a single log by its unique ID.
! Required: Make sure to send the 'id' of log with the log as a param.
*/
router.get('/logs/:id', getLogById);


/* Route to add a new log entry
* @POST /logs
* Route: '/logs'
* Description: Post a single log in the Database.
! Required: Make sure to send the log in the body of the request as JSON.
*/
router.post('/logs', addLog);


export default router;