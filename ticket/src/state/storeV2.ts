import { BehaviorSubject } from "rxjs";
import type { ITicket } from "../interfaces/DataInterfaces";

// --- 1. Pure State Definition ---
export interface TicketState {
  tickets: ITicket[];
  resolvedTickets: ITicket[];
}

const initialState: TicketState = {
  tickets: [],
  resolvedTickets: [],
};

// --- 2. The Store (Minimalist) ---
class TicketStore {
  private static instance: TicketStore;
  private state$ = new BehaviorSubject<TicketState>(initialState);

  static getInstance() {
    if (!this.instance) this.instance = new TicketStore();
    return this.instance;
  }

  // Simple Getter/Setter
  get state() { return this.state$.getValue(); }
  get stream() { return this.state$.asObservable(); }

  update(patch: Partial<TicketState>) {
    this.state$.next({ ...this.state, ...patch });
  }
}

const store = TicketStore.getInstance();

// --- 3. The Logic Layer (Modular Actions) ---
// These are easily testable and don't bloat the class.
export const TicketActions = {
  
  toggleSelection: (id: string | number) => {
    const tickets = store.state.tickets.map(t => 
      t.id === id ? { ...t, selected: !t.selected } : t
    );
    store.update({ tickets });
  },

  resolveSelected: () => {
    const { tickets, resolvedTickets } = store.state;
    
    // Partition tickets: those staying and those moving
    const toResolve = tickets.filter(t => t.selected);
    const remaining = tickets.filter(t => !t.selected);

    const newlyResolved = toResolve.map(t => ({ 
      ...t, 
      selected: false, 
      status: "Resolved" as const 
    }));

    store.update({
      tickets: remaining,
      resolvedTickets: [...resolvedTickets, ...newlyResolved]
    });
  },

  load: async () => {
    const response = await fetch("./data.json");
    const data = await response.json();
    store.update({ tickets: data });
  }
};