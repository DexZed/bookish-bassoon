import { BehaviorSubject } from "rxjs";
import type { ITicket } from "../interfaces/DataInterfaces";
import { useEffect, useState } from "react";

export interface TicketState {
  tickets: ITicket[];
  selectedTicket: ITicket | null;
  resolvedTickets: ITicket[];
  selectedTickets: ITicket[];
}

export const initialState: TicketState = {
  tickets: [],
  selectedTicket: null,
  resolvedTickets: [],
  selectedTickets: [],
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
      const response = await fetch("./data.json");
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

  toggleSelection(ticket: ITicket) {
    const { selectedTickets } = this.snapshot;
    const isSelected = selectedTickets.some(t => t.id === ticket.id);

    const nextSelection = isSelected
      ? selectedTickets.filter(t => t.id !== ticket.id) // Remove if exists
      : [...selectedTickets, ticket];                  // Add if new

    this.state$.next({
      ...this.snapshot,
      selectedTickets: nextSelection,
    });
  }
  // Moves a ticket from the main list to resolved and clears selection
  resolveTicket(ticketId: string | number) {
    const { tickets, resolvedTickets, selectedTicket, selectedTickets } =
      this.snapshot;

    const ticketToResolve = tickets.find((t) => t.id === ticketId);
    if (!ticketToResolve) return;

    this.state$.next({
      ...this.snapshot,
      // 1. Remove from main tickets list
      tickets: tickets.filter((t) => t.id !== ticketId),

      // 2. Add to resolved list
      resolvedTickets: [...resolvedTickets, ticketToResolve],

      // 3. Clear single selection if matches
      selectedTicket: selectedTicket?.id === ticketId ? null : selectedTicket,

      // 4. Remove from multi-select array (The "Cleanup")
      selectedTickets: selectedTickets.filter((t) => t.id !== ticketId),
    });
  }

  resolveAllSelected() {
    const { tickets, resolvedTickets, selectedTickets, selectedTicket } =
      this.snapshot;

    // 1. If nothing is selected, do nothing
    if (selectedTickets.length === 0) return;

    // 2. Get the IDs of the tickets to be moved
    const selectedIds = new Set(selectedTickets.map((t) => t.id));

    // 3. Filter the main list and prepare the new resolved list
    const remainingTickets = tickets.filter((t) => !selectedIds.has(t.id));
    const newResolvedTickets = [...resolvedTickets, ...selectedTickets];

    // 4. Update State
    this.state$.next({
      ...this.snapshot,
      tickets: remainingTickets,
      resolvedTickets: newResolvedTickets,
      selectedTickets: [], // Clear the selection array
      // Clear individual selection if it was one of the resolved tickets
      selectedTicket:
        selectedTicket && selectedIds.has(selectedTicket.id)
          ? null
          : selectedTicket,
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
    toggleSelection: (ticket: ITicket) => store.toggleSelection(ticket),
    resolveTicket: (ticketId: string | number) => store.resolveTicket(ticketId),
    resolveAllSelected: () => store.resolveAllSelected(),
    reset: () => store.reset(),
  };
}
