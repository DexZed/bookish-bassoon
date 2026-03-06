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
    const { selectedTickets, tickets } = this.snapshot;
    const isCurrentlySelected = selectedTickets.some((t) => t.id === ticket.id);

    // 1. Update the tracking array
    const nextSelectedTickets = isCurrentlySelected
      ? selectedTickets.filter((t) => t.id !== ticket.id)
      : [...selectedTickets, { ...ticket, selected: true }];

    // 2. Update the 'selected' field in the main tickets list
    const nextTickets = tickets.map((t) => {
      if (t.id === ticket.id) {
        return { ...t, selected: !isCurrentlySelected };
      }
      return t;
    });

    this.state$.next({
      ...this.snapshot,
      tickets: nextTickets,
      selectedTickets: nextSelectedTickets,
    });
  }
  resolveTicket(ticketId: string | number) {
    const { tickets, resolvedTickets, selectedTicket, selectedTickets } =
      this.snapshot;

    const ticketToResolve = tickets.find((t) => t.id === ticketId);
    if (!ticketToResolve) return;

    // Set status to Resolved AND selected to false
    const resolvedTicket: ITicket = {
      ...ticketToResolve,
      status: "Resolved",
      selected: false,
    };

    this.state$.next({
      ...this.snapshot,
      tickets: tickets.filter((t) => t.id !== ticketId),
      resolvedTickets: [...resolvedTickets, resolvedTicket],
      selectedTicket: selectedTicket?.id === ticketId ? null : selectedTicket,
      selectedTickets: selectedTickets.filter((t) => t.id !== ticketId),
    });
  }
  resolveAllSelected() {
    const { tickets, resolvedTickets, selectedTickets, selectedTicket } =
      this.snapshot;
    if (selectedTickets.length === 0) return;

    const selectedIds = new Set(selectedTickets.map((t) => t.id));

    // 1. Prepare the tickets for the resolved list (force selected: false)
    const newlyResolved = selectedTickets.map((t) => ({
      ...t,
      status: "Resolved",
      selected: false,
    }));

    // 2. Remove them from the active tickets list
    const remainingTickets = tickets.filter((t) => !selectedIds.has(t.id));

    this.state$.next({
      ...this.snapshot,
      tickets: remainingTickets,
      resolvedTickets: [...resolvedTickets, ...newlyResolved],
      selectedTickets: [], // Clear tracking array
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
