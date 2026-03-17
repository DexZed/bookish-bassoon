import { createContext, useContext } from "react";
import type { AppData } from "../interfaces/InterfaceDefinitions";

type AppStateProvider = {
  children: React.ReactNode;
};
type AppStateContext = {
  appData: AppData[];
};
export const AppContext = createContext<AppStateContext | null>(null);
function AppContextProvider({ children }: AppStateProvider) {
  const contextValue: AppStateContext = {
    appData: [],
  };
  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}

export function useAppData() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppData must be used within an AppContextProvider");
  }
  return context;
}

export default AppContextProvider;