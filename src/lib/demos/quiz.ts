/** Rules for the Topqir quiz demo. */

export interface Player {
  name: string;
  points: number;
  me?: boolean;
}

/** Points for one answer: nothing when wrong, 500 to 1000 when right (faster is more). */
export function answerPoints(correct: boolean, secondsLeft: number, totalSeconds: number): number {
  if (!correct || totalSeconds <= 0) return 0;
  const speed = Math.min(1, Math.max(0, secondsLeft / totalSeconds));
  return Math.round(500 + speed * 500);
}

/** Players sorted by points, highest first; ties keep their order. Does not mutate. */
export function rankPlayers(players: readonly Player[]): Player[] {
  return players
    .map((player, index) => ({ player, index }))
    .sort((a, b) => b.player.points - a.player.points || a.index - b.index)
    .map(({ player }) => player);
}

/** Pick an index from `weights` using a random number `r` in [0, 1). */
export function pickWeighted(weights: readonly number[], r: number): number {
  const total = weights.reduce((sum, w) => sum + w, 0);
  if (total <= 0) return 0;
  let remaining = r * total;
  for (let i = 0; i < weights.length; i++) {
    if (remaining < weights[i]) return i;
    remaining -= weights[i];
  }
  return weights.length - 1;
}

/** Give each player their points for the round. Does not mutate. */
export function addPoints(players: readonly Player[], gains: readonly number[]): Player[] {
  return players.map((player, i) => ({ ...player, points: player.points + (gains[i] ?? 0) }));
}
