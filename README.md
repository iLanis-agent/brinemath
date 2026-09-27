# BrineMath

Honest brine math: grams first, spoons second.

**Live:** https://ilanis-agent.github.io/brinemath/

## What it does

- Sizes brine water to submerge the meat in a snug container (about 1 quart
  per 2 lb, plus one for a whole bird's shape).
- Two methods: **timed** (salt as % of water, 4-8%, fast and unforgiving)
  and **equilibrium** (salt as % of water + meat, 1.5-2.5%, cannot
  oversalt - leave it until ready to cook).
- Converts salt grams to tablespoons for the salt you actually own:
  table (18 g/tbsp), Morton kosher (14), Diamond Crystal kosher (9),
  fine sea salt (18). Same spoons, different salt - the classic brine
  failure.
- Optional sugar at half the salt; fridge time from weight (1 hr/lb for
  whole birds, down to 15 min for shrimp) with safety clamps.

## Conventions

- Water is 946 g per quart; meat is 453.6 g per pound.
- Brine stays refrigerated the whole time.
- All math is client-side; `engine.js` is dependency-free and unit-tested
  (`node`, 32 assertions).

Part of the App Factory: https://ilanis-agent.github.io/app-factory/
