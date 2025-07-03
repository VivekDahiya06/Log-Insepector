import { useContext } from "react"
import { StoreContext } from "../store/StoreContext";
import type { StoreContextType } from "../types/Store.types";


export const useStore = (): StoreContextType => {
    const context = useContext(StoreContext);
    if (!context) throw new Error("useStore must be used within a StoreProvider");
    return context
}