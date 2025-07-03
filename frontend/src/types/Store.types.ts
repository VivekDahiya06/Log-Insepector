import type { ReducerActionType, ReducerStateType } from "./Reducer.types";

export interface StoreContextType {
    state: ReducerStateType;
    dispatch: React.Dispatch<ReducerActionType>;
}