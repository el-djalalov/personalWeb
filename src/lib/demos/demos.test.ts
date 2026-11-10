import { describe, expect, it } from "vitest";
import { contourY, isIndexContour, lensOffset, lensStrength } from "./lens";
import { omTier, organicMatter, perimeterM, pointInPolygon, polygonAreaHa, type Point } from "./geo";
import { addPoints, answerPoints, pickWeighted, rankPlayers, type Player } from "./quiz";
import { addTickets, hoursIn, isOverbooked, matchesQuery, moveTicket, type Board } from "./planner";
import { acknowledge, emptyAlarms, nextAlarm, raiseAlarm, type Alarm } from "./alarms";
import { accessFor, visibleCount, type ModuleId } from "./access";

describe("lens (hero map lines)", () => {
  it("is zero at the cursor height, so a line never jumps there", () => {
    const k = lensStrength(150, 34);
    expect(lensOffset(0, 0, 150, k)).toBe(0);
    expect(lensOffset(0, 0.001, 150, k)).toBeGreaterThan(0);
    expect(lensOffset(0, -0.001, 150, k)).toBeLessThan(0);
  });

  it("never pushes more than the chosen maximum", () => {
    for (const radius of [80, 150, 260]) {
      const k = lensStrength(radius, 34);
      let max = 0;
      for (let dy = -600; dy <= 600; dy += 0.5) max = Math.max(max, Math.abs(lensOffset(0, dy, radius, k)));
      expect(max).toBeCloseTo(34, 1);
    }
  });

  it("keeps line order: pushed y always grows with the resting y (no crossing)", () => {
    const radius = 120;
    const k = lensStrength(radius, 34);
    let previous = Number.NEGATIVE_INFINITY;
    for (let y = -500; y <= 500; y += 0.5) {
      const pushed = y + lensOffset(0, y, radius, k);
      expect(pushed).toBeGreaterThan(previous);
      previous = pushed;
    }
  });

  it("handles a zero radius and marks every fifth line", () => {
    expect(lensStrength(0, 34)).toBe(0);
    expect(lensOffset(1, 1, 0, 1)).toBe(0);
    expect([0, 1, 2, 7, 12].map(isIndexContour)).toEqual([false, false, true, true, true]);
    expect(contourY(100, 0, 0, 0)).toBeCloseTo(100, 5);
  });
});

describe("geo (map demo)", () => {
  const size = { width: 1400, height: 700 }; // 1 px = 1 m when the map spans 1400 m
  const square: Point[] = [
    [0, 0],
    [0.1, 0],
    [0.1, 0.2],
    [0, 0.2],
  ];

  it("measures a 140 m × 140 m square as 1.96 ha with a 560 m border", () => {
    expect(polygonAreaHa(square, size, 1400)).toBeCloseTo(1.96, 6);
    expect(perimeterM(square, size, 1400)).toBeCloseTo(560, 6);
  });

  it("gives the same area for clockwise and counter-clockwise points", () => {
    expect(polygonAreaHa([...square].reverse(), size, 1400)).toBeCloseTo(1.96, 6);
  });

  it("returns 0 for fewer than three points", () => {
    expect(polygonAreaHa(square.slice(0, 2), size, 1400)).toBe(0);
    expect(perimeterM(square.slice(0, 1), size, 1400)).toBe(0);
  });

  it("finds points inside and outside", () => {
    expect(pointInPolygon(0.05, 0.1, square)).toBe(true);
    expect(pointInPolygon(0.2, 0.1, square)).toBe(false);
  });

  it("keeps organic matter in range and bands it", () => {
    for (let x = 0; x < 800; x += 37) {
      for (let y = 0; y < 400; y += 29) {
        const v = organicMatter(x, y);
        expect(v).toBeGreaterThanOrEqual(2.1);
        expect(v).toBeLessThanOrEqual(5.3);
      }
    }
    expect([2.5, 3.2, 4.4].map(omTier)).toEqual([0, 1, 2]);
  });
});

describe("quiz (Topqir demo)", () => {
  it("gives more points for faster right answers and none for wrong ones", () => {
    expect(answerPoints(true, 8, 8)).toBe(1000);
    expect(answerPoints(true, 0, 8)).toBe(500);
    expect(answerPoints(true, 4, 8)).toBe(750);
    expect(answerPoints(false, 8, 8)).toBe(0);
    expect(answerPoints(true, 99, 8)).toBe(1000);
  });

  it("ranks players without changing the input", () => {
    const players: Player[] = [
      { name: "A", points: 100 },
      { name: "B", points: 300 },
      { name: "You", points: 100, me: true },
    ];
    const ranked = rankPlayers(players);
    expect(ranked.map(p => p.name)).toEqual(["B", "A", "You"]);
    expect(players[0].name).toBe("A");
    expect(addPoints(players, [10, 0, 5]).map(p => p.points)).toEqual([110, 300, 105]);
    expect(players[0].points).toBe(100);
  });

  it("picks weighted answers", () => {
    expect(pickWeighted([0.2, 0.6, 0.2], 0)).toBe(0);
    expect(pickWeighted([0.2, 0.6, 0.2], 0.5)).toBe(1);
    expect(pickWeighted([0.2, 0.6, 0.2], 0.99)).toBe(2);
    expect(pickWeighted([0, 0], 0.5)).toBe(0);
  });
});

describe("planner (board demo)", () => {
  const board: Board = {
    backlog: [{ id: "P-1", title: "Fix login", hours: 3 }],
    anna: [{ id: "P-2", title: "Filters", hours: 6 }],
  };

  it("moves a ticket without mutating the board", () => {
    const next = moveTicket(board, "P-1", "anna");
    expect(next.backlog).toHaveLength(0);
    expect(next.anna.map(t => t.id)).toEqual(["P-2", "P-1"]);
    expect(board.backlog).toHaveLength(1);
  });

  it("ignores unknown tickets, unknown columns and same-column moves", () => {
    expect(moveTicket(board, "nope", "anna")).toBe(board);
    expect(moveTicket(board, "P-1", "nobody")).toBe(board);
    expect(moveTicket(board, "P-1", "backlog")).toBe(board);
  });

  it("adds hours and flags overbooking past 8h", () => {
    const next = moveTicket(board, "P-1", "anna");
    expect(hoursIn(next, "anna")).toBe(9);
    expect(isOverbooked(hoursIn(next, "anna"))).toBe(true);
    expect(isOverbooked(8)).toBe(false);
    expect(addTickets(board, "backlog", [{ id: "P-3", title: "New", hours: 1 }]).backlog).toHaveLength(2);
  });

  it("searches by id and title", () => {
    expect(matchesQuery(board.backlog[0], "login")).toBe(true);
    expect(matchesQuery(board.backlog[0], "p-1")).toBe(true);
    expect(matchesQuery(board.backlog[0], "export")).toBe(false);
    expect(matchesQuery(board.backlog[0], "  ")).toBe(true);
  });
});

describe("alarms (Tallinja demo)", () => {
  const fire: Alarm = { id: 1, kind: "fire", bus: 42 };
  const tech: Alarm = { id: 2, kind: "tech", bus: 117 };

  it("shows the first alarm and queues the second", () => {
    const state = raiseAlarm(raiseAlarm(emptyAlarms, fire), tech);
    expect(state.active).toEqual(fire);
    expect(state.queue).toEqual([tech]);
  });

  it("handles an alarm once, then shows the next one from the queue", () => {
    const raised = raiseAlarm(raiseAlarm(emptyAlarms, fire), tech);
    const handled = acknowledge(raised, "B");
    expect(handled.active).toBeNull();
    expect(handled.lastHandled).toEqual({ alarm: fire, by: "B" });
    expect(acknowledge(handled, "A")).toBe(handled); // nothing active: no second handling
    const next = nextAlarm(handled);
    expect(next.active).toEqual(tech);
    expect(next.queue).toHaveLength(0);
    expect(nextAlarm(next)).toBe(next);
  });
});

describe("access (CIMP demo)", () => {
  const all: ModuleId[] = ["loyalty", "campaigns", "bonuses", "retention", "crossmail", "analytics"];

  it("gives each role the right modules", () => {
    expect(visibleCount("admin", all)).toBe(6);
    expect(visibleCount("marketer", all)).toBe(4);
    expect(visibleCount("analyst", all)).toBe(2);
    expect(accessFor("analyst", "analytics")).toBe("read");
    expect(accessFor("marketer", "partner")).toBe("active");
    expect(accessFor("analyst", "partner")).toBe("none");
  });
});
