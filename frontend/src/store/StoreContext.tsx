import { createContext } from 'react';
import { initialState } from './Reducers';
import type { StoreContextType } from '../types/Store.types';

export const StoreContext = createContext<StoreContextType>({
  state: initialState,
  dispatch: () => undefined,
});
