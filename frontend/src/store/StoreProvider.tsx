import { useReducer, type FC, type ReactNode } from 'react'
import { initialState, Reducers } from './Reducers';
import { StoreContext } from './StoreContext';


interface StoreProviderProps{
    children: ReactNode
}

const StoreProvider: FC<StoreProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(Reducers, initialState);

  return (
    <StoreContext.Provider value={{state, dispatch}}>
      {children}
    </StoreContext.Provider>
  )
}

export default StoreProvider
