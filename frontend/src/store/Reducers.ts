import type { ReducerActionType, ReducerStateType } from "../types/Reducer.types"

export const initialState: ReducerStateType = {
    page: 1,
    totalPages: 0,
    alertOpen: false,
    formOpen: false,
    alertMessage: '',
    alertType: 'error',
    searchLogFilter: '',
    logId: '',
    logDetails: {
        id: '',
        level: 'info',
        message: '',
        resourceId: '',
        timestamp: '',
        traceId: '',
        spanId: '',
        commit: '',
        metadata: {},
    }
}

export const Reducers = (state: ReducerStateType, action: ReducerActionType) => {
    switch (action.type) {
        case 'CHANGE_PAGE': return { ...state, page: action.payload }
        case 'SET_TOTAL_PAGES': return { ...state, totalPages: action.payload }
        case 'TOGGLE_ALERT': return { ...state, alertOpen: action.payload }
        case 'SET_FORM_OPEN': return { ...state, formOpen: action.payload }
        case 'SET_ALERT_MESSAGE': return { ...state, alertMessage: action.payload }
        case 'SET_ALERT_TYPE': return { ...state, alertType: action.payload }
        case 'SET_SEARCH_LOG_FILTER': return { ...state, searchLogFilter: action.payload }
        case 'SET_LOG_ID': return { ...state, logId: action.payload }
        case 'SET_LOG_DETAILS': return { ...state, logDetails: action.payload }
        default: return state;
    }
}