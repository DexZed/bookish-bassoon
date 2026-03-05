import { BehaviorSubject } from "rxjs";
import type { ITicket } from "../interfaces/DataInterfaces";
import { useEffect, useState } from "react";


export interface TicketState {
  tickets: ITicket[];
  selectedTicket: ITicket | null;
  resolvedTickets: ITicket[];
}

export const initialState: TicketState = {
  tickets: [],
  selectedTicket: null,
  resolvedTickets: [],
};

class TicketStore {
  private state$: BehaviorSubject<TicketState>;
  private static instance: TicketStore;
  private constructor(initialState: TicketState) {
    this.state$ = new BehaviorSubject(initialState);
    this.loadTickets();
  }
  getState() {
    return this.state$.asObservable();
  }
  static getInstance() {
    if (!TicketStore.instance) {
      TicketStore.instance = new TicketStore(initialState);
    }
    return TicketStore.instance;
  }

  async loadTickets() {
    try {
      // We use a relative path from the domain root (see "The Path Issue" below)
      const response = await fetch("/data/data.json");
      if (!response.ok) throw new Error("Failed to fetch");

      const data: ITicket[] = await response.json();

      // Update the state while preserving other properties (like resolvedTickets)
      this.state$.next({
        ...this.snapshot,
        tickets: data,
      });
    } catch (error) {
      console.error("Error loading tickets:", error);
    }
  }
  // Helper to get the current value without subscribing
  private get snapshot(): TicketState {
    return this.state$.getValue();
  }

  selectTicket(ticket: ITicket) {
    this.state$.next({
      ...this.snapshot,
      selectedTicket: ticket,
    });
  }
  // Moves a ticket from the main list to resolved and clears selection
  resolveTicket(ticketId: string | number) {
    const { tickets, resolvedTickets, selectedTicket } = this.snapshot;

    // 1. Find the ticket to resolve
    const ticketToResolve = tickets.find((t) => t.id === ticketId);

    if (!ticketToResolve) return;

    // 2. Update the state
    this.state$.next({
      ...this.snapshot,
      // Remove from the main list
      tickets: tickets.filter((t) => t.id !== ticketId),
      // Add to the resolved list
      resolvedTickets: [...resolvedTickets, ticketToResolve],
      // Clear selection if the resolved ticket was the one selected
      selectedTicket: selectedTicket?.id === ticketId ? null : selectedTicket,
    });
  }

  // Resets the store to the provided initial state
  reset() {
    this.state$.next(initialState);
  }
}

const store = TicketStore.getInstance();

export function useTicketStore() {
  const [state, setState] = useState<TicketState>(initialState);

  useEffect(() => {
    const subscription = store.getState().subscribe(setState);
    return () => subscription.unsubscribe();
  }, []);

  return {
    ...state,
    selectTicket: (ticket: ITicket) => store.selectTicket(ticket),
    resolveTicket: (ticketId: string | number) => store.resolveTicket(ticketId),
    reset: () => store.reset(),
  };
}
