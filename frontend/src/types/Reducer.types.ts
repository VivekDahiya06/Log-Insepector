import type { Log } from "./log.types";

export interface ReducerStateType {
    page: number,
    totalPages: number,
    alertOpen: boolean,
    formOpen: boolean,
    alertMessage: string,
    alertType: 'error' | 'success' | 'warning' | 'info',
    searchLogFilter: string,
    logId: string,
    logDetails: Log
}

interface ChangePageAction { type: 'CHANGE_PAGE'; payload: number };
interface SetTotalPagesAction { type: 'SET_TOTAL_PAGES'; payload: number };
interface ToggleAlertAction { type: 'TOGGLE_ALERT'; payload: boolean };
interface SetFormOpenAction { type: 'SET_FORM_OPEN'; payload: boolean };
interface SetAlertMessageAction { type: 'SET_ALERT_MESSAGE'; payload: string };
interface SetAlertTypeAction { type: 'SET_ALERT_TYPE'; payload: 'error' | 'success' | 'warning' | 'info' };
interface SetSearchLogFilterAction { type: 'SET_SEARCH_LOG_FILTER'; payload: string };
interface SetLogIdAction { type: 'SET_LOG_ID'; payload: string };
interface SetLogDetailsAction { type: 'SET_LOG_DETAILS'; payload: Log };

export type ReducerActionType =
    | ChangePageAction
    | SetTotalPagesAction
    | ToggleAlertAction
    | SetFormOpenAction
    | SetAlertMessageAction
    | SetAlertTypeAction
    | SetSearchLogFilterAction
    | SetLogIdAction
    | SetLogDetailsAction;