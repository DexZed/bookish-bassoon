import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import type { AppData } from "../interfaces/InterfaceDefinitions";
import { BehaviorSubject, catchError, from, map, of, switchMap } from "rxjs";
import { useDatabase } from "../database/LocalDB";

// 1. State & Reducer Setup
type State = { data: AppData[]; loading: boolean; error: string | null };
type Action =
  | { type: "START" }
  | { type: "SUCCESS"; payload: AppData[] }
  | { type: "ERROR"; payload: string };

function appReducer(state: State, action: Action): State {
  switch (action.type) {
    case "START":
      return { ...state, loading: true, error: null };
    case "SUCCESS":
      return { ...state, loading: false, data: action.payload };
    case "ERROR":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

// 2. The RxJS "Source of Truth"
// We keep this outside so it persists across renders
const dataRequest$ = new BehaviorSubject<void>(undefined);
export const AppContext = createContext<{
  state: State;
  refresh: () => void;
} | null>(null);

export function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(appReducer, {
    data: [],
    loading: false,
    error: null,
  });
  const {data: dbData,addItem} = useDatabase()
  // 0. Sync the Data 
  const syncData = useMemo(()=> {
    return state.data.map((item) => {
      const dbItem = dbData.find((dbItem) => dbItem.id === item.id);
      if (dbItem) {
        return { ...item, ...dbItem };
      }
      return item;
    })
  }, [state.data, dbData])

  useEffect(() => {
    // 3. The RxJS Pipeline
    const subscription = dataRequest$
      .pipe(
        // Whenever a request starts, tell the Reducer
        map(() => dispatch({ type: "START" })),
        // Perform the actual fetch
        switchMap(() =>
          from(fetch("./data.json").then((res) => res.json())).pipe(
            map((data) => dispatch({ type: "SUCCESS", payload: data })),
            catchError((err) => {
              dispatch({ type: "ERROR", payload: err.message });
              return of(null); // Keep the stream alive
            }),
          ),
        ),
      )
      .subscribe();

    return () => subscription.unsubscribe();
  }, []);

  // 4. Provide a way to trigger a refresh
  const contextValue = useMemo(
    () => ({
      state:{...state, data: syncData},
      refresh: () => dataRequest$.next(),
    }),
    [state,syncData,addItem],
  );

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
