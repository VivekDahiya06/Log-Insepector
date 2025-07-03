import axios from "axios";
import type { Log } from "../types/log.types";

// Backend Remote/Local URL to make API Requests 
const Url = import.meta.env.VITE_REMOTE_URL;


/*
* @GET
* Description: Gets all the logs
*/
export const GETAllLogs = async (): Promise<Log[]> => {
    const response = await axios.get(Url);
    return response.data;
}

/*
* @POST
* Description: Posts a log to the backend
*/
export const POSTLogs = async (Log: Log) => {
    const response = await axios.post(Url, Log);
    return response;
}
