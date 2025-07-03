import axios from "axios";
import type { Log } from "../types/log.types";


const Url = import.meta.env.VITE_REMOTE_URL;

export const GETAllLogs = async (): Promise<Log[]> => {
    const response = await axios.get(Url);
    return response.data;
}

export const POSTLogs = async (Log: Log) => {
    const response = await axios.post(Url, Log);
    return response;
}
