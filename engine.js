/* BrineMath engine - honest brine math: salt is measured by weight, tbsp by salt type. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.BrineEngine = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  var QUART_G = 946; // grams of water per quart

  // tbsp densities in grams - the whole reason this app exists
  var SALTS = {
    table:   { name: 'Table salt',            tbspG: 18 },
    morton:  { name: 'Morton kosher',         tbspG: 14 },
    diamond: { name: 'Diamond Crystal kosher', tbspG: 9 },
    seafine: { name: 'Fine sea salt',         tbspG: 18 }
  };

  // hrPerLb and window per meat
  var MEATS = {
    turkey:  { name: 'Whole turkey',  hrPerLb: 1.00, minH: 8,  maxH: 24, whole: true  },
    chicken: { name: 'Whole chicken', hrPerLb: 1.00, minH: 4,  maxH: 12, whole: true  },
    pieces:  { name: 'Chicken pieces', hrPerLb: 0.75, minH: 1, maxH: 4,  whole: false },
    chops:   { name: 'Pork chops',    hrPerLb: 0.50, minH: 1,  maxH: 4,  whole: false },
    fish:    { name: 'Fish or shrimp', hrPerLb: 0.25, minH: 0.25, maxH: 1, whole: false }
  };

  /* Water to submerge: snug container, about 1 quart per 2 lb, plus one for a whole bird's shape. */
  function waterQuarts(weightLb, whole) {
    var q = Math.ceil(weightLb / 2) + (whole ? 1 : 0);
    return Math.max(2, q);
  }

  /* Timed brine: salt % of WATER weight only (classic 5-6%).
     Equilibrium: salt % of water + meat combined (1.5-2%); cannot oversalt, brine until ready. */
  function saltGrams(method, waterQt, weightLb, pct) {
    var waterG = waterQt * QUART_G;
    var meatG = weightLb * 453.6;
    var base = method === 'equilibrium' ? waterG + meatG : waterG;
    return Math.round(base * pct / 100);
  }

  function gramsToTbsp(g, saltKey) {
    return Math.round((g / SALTS[saltKey].tbspG) * 10) / 10;
  }

  /* Window: computed time (clamped to the safe range) up to the safety max. */
  function brineWindow(meatKey, weightLb) {
    var m = MEATS[meatKey];
    var h = weightLb * m.hrPerLb;
    var lo = Math.max(m.minH, Math.min(h, m.maxH));
    return { minH: lo, maxH: m.maxH };
  }

  function sugarGrams(saltG) { return Math.round(saltG / 2); }

  function fmtHours(h) {
    if (h < 1) return Math.round(h * 60) + ' min';
    return (Math.round(h * 10) / 10) + ' hr';
  }

  return {
    QUART_G: QUART_G,
    SALTS: SALTS,
    MEATS: MEATS,
    waterQuarts: waterQuarts,
    saltGrams: saltGrams,
    gramsToTbsp: gramsToTbsp,
    brineWindow: brineWindow,
    sugarGrams: sugarGrams,
    fmtHours: fmtHours
  };
});
