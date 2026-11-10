import { describe, expect, it } from "vitest";
import { SUPPORTED_LANGUAGES } from "@/content.config";
import { home } from "./home";
import { cases } from "./cases";
import { site } from "./site";
import { getExperiences } from "./experiences";

// Every language must have the same structure as English: same runs, steps,
// skills, cases, demo data and jobs. Text differs; shape and data must not.
const others = SUPPORTED_LANGUAGES.filter(lang => lang !== "en");

describe.each(others)("%s matches English", lang => {
  it("has the same hero runs, steps and numbers", () => {
    expect(home[lang].runs.map(r => r.id)).toEqual(home.en.runs.map(r => r.id));
    home[lang].runs.forEach((run, i) => {
      expect(run.steps.map(s => [s.name, s.detail])).toEqual(home.en.runs[i].steps.map(s => [s.name, s.detail]));
      run.steps.forEach(step => expect(step.why.trim()).not.toBe(""));
    });
    expect(home[lang].stats.map(s => [s.value, s.suffix])).toEqual(home.en.stats.map(s => [s.value, s.suffix]));
    expect(home[lang].skills.items.map(s => s.id)).toEqual(home.en.skills.items.map(s => s.id));
  });

  it("has the same case files with the same results and build logs", () => {
    const mine = cases[lang];
    expect(mine.items.map(c => c.id)).toEqual(cases.en.items.map(c => c.id));
    mine.items.forEach((item, i) => {
      const en = cases.en.items[i];
      expect(item.link).toEqual(en.link);
      expect(item.build).toEqual(en.build);
      expect(item.results.map(r => [r.count, r.suffix])).toEqual(en.results.map(r => [r.count, r.suffix]));
    });
  });

  it("has the same demo data", () => {
    const mine = cases[lang].demo;
    const en = cases.en.demo;
    expect(mine.quiz.questions.map(q => [q.answers.length, q.correct])).toEqual(
      en.quiz.questions.map(q => [q.answers.length, q.correct]),
    );
    mine.brief.briefs.forEach((brief, i) => {
      const enBrief = en.brief.briefs[i];
      expect(brief.id).toBe(enBrief.id);
      expect(brief.facts.map(f => [f.source, Boolean(f.deal), f.investor === undefined])).toEqual(
        enBrief.facts.map(f => [f.source, Boolean(f.deal), f.investor === undefined]),
      );
      expect(brief.sources).toHaveLength(enBrief.sources.length);
    });
    expect(Object.keys(mine.planner.tickets).sort()).toEqual(Object.keys(en.planner.tickets).sort());
    expect(Object.keys(mine.modules.names).sort()).toEqual(Object.keys(en.modules.names).sort());
    expect(mine.bus.routes).toHaveLength(en.bus.routes.length);
  });

  it("has the same jobs and shell text keys", () => {
    expect(getExperiences(lang).map(j => j.website)).toEqual(getExperiences("en").map(j => j.website));
    expect(Object.keys(site[lang].nav).sort()).toEqual(Object.keys(site.en.nav).sort());
  });
});

describe("placeholders", () => {
  it("keeps {placeholders} in every translation", () => {
    for (const lang of others) {
      const pairs: [string, string][] = [
        [cases[lang].demo.bus.handledByYou, cases.en.demo.bus.handledByYou],
        [cases[lang].demo.bus.handledBy, cases.en.demo.bus.handledBy],
        [cases[lang].demo.modules.sees, cases.en.demo.modules.sees],
        [cases[lang].demo.brief.thinking[2], cases.en.demo.brief.thinking[2]],
      ];
      for (const [mine, en] of pairs) {
        const keys = (s: string) => (s.match(/\{\w+\}/g) ?? []).sort();
        expect(keys(mine)).toEqual(keys(en));
      }
    }
  });
});
