/** Board logic for the Planner demo. All functions return new objects. */

export interface Ticket {
  id: string;
  title: string;
  hours: number;
}

export type Board = Readonly<Record<string, readonly Ticket[]>>;

export const DAY_HOURS = 8;

/** Move a ticket to another column. Unknown ticket or column: board is returned as is. */
export function moveTicket(board: Board, ticketId: string, to: string): Board {
  if (!(to in board)) return board;
  const from = Object.keys(board).find(key => board[key].some(t => t.id === ticketId));
  if (!from || from === to) return board;
  const ticket = board[from].find(t => t.id === ticketId)!;
  return {
    ...board,
    [from]: board[from].filter(t => t.id !== ticketId),
    [to]: [...board[to], ticket],
  };
}

/** Add tickets to a column (for "Sync from Jira"). */
export function addTickets(board: Board, column: string, tickets: readonly Ticket[]): Board {
  if (!(column in board)) return board;
  return { ...board, [column]: [...board[column], ...tickets] };
}

export const hoursIn = (board: Board, column: string): number =>
  (board[column] ?? []).reduce((sum, t) => sum + t.hours, 0);

export const isOverbooked = (hours: number): boolean => hours > DAY_HOURS;

export function matchesQuery(ticket: Ticket, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return `${ticket.id} ${ticket.title}`.toLowerCase().includes(q);
}
