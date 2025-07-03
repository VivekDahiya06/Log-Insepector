import axios from "axios";
import type { Log } from "../types/log.types";


// const remoteUrl = 'https://my-json-server.typicode.com/VivekDahiya06/Book-Management-System/books';
const Url = 'http://localhost:3002/logs';

export const GETAllLogs = async (): Promise<Log[]> => {
    const response = await axios.get(Url);
    return response.data;
}

export const POSTLogs = async (Log: Log) => {
    const response = await axios.post(Url, Log);
    return response;
}
