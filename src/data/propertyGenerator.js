import {
  STREET_NAMES, STREET_TYPES, ZONING_TYPES, NEARBY_ZONES,
  TRANSIT_PROJECTS, DEVELOPMENT_PROJECTS, COUNCIL_QUOTES,
  PROPERTY_TYPE_CONFIGS, ZIP_CITY_MAP, CORRIDORS
} from './mockData.js';

function seededRandom(seed) {
  let s = seed;
  return function () {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

function randBetween(rng, min, max) {
  return min + rng() * (max - min);
}

function randInt(rng, min, max) {
  return Math.floor(randBetween(rng, min, max + 1));
}

function pickRandom(rng, arr) {
  return arr[randInt(rng, 0, arr.length - 1)];
}

function roundTo(val, dec) {
  return Math.round(val * Math.pow(10, dec)) / Math.pow(10, dec);
}

function generateAddress(rng, cityInfo) {
  const num = randInt(rng, 100, 9999);
  const street = pickRandom(rng, STREET_NAMES);
  const type = pickRandom(rng, STREET_TYPES);
  return `${num} ${street} ${type}`;
}

function parseLocation(location) {
  if (!location) return ZIP_CITY_MAP.default;
  const trimmed = location.trim();
  const zipMatch = trimmed.match(/\b(\d{5})\b/);
  if (zipMatch && ZIP_CITY_MAP[zipMatch[1]]) {
    return { ...ZIP_CITY_MAP[zipMatch[1]], zip: zipMatch[1] };
  }
  return { ...ZIP_CITY_MAP.default, zip: '00000' };
}

function getZip(location) {
  if (!location) return '30312';
  const match = location.trim().match(/\b(\d{5})\b/);
  return match ? match[1] : '30312';
}

function generatePropertyImage(seed, type) {
  const colors = [
    ['#1e3a5f', '#2d6a9f', '#4a90d9'],
    ['#1a3a2a', '#2d6a4a', '#4ab87a'],
    ['#3a1e3a', '#6a2d6a', '#c44fc4'],
    ['#3a2a1a', '#6a4a2d', '#c4874a'],
    ['#1a2a3a', '#2d4a6a', '#4a7ac4'],
    ['#3a1a1a', '#6a2d2d', '#c44a4a'],
    ['#2a3a1a', '#4a6a2d', '#7ac44a'],
    ['#1a3a3a', '#2d6a6a', '#4ac4c4'],
  ];
  const idx = seed % colors.length;
  return colors[idx];
}

export function generateProperties(criteria) {
  const { location, budget, propertyTypes, investmentHorizon } = criteria;
  const locationInfo = parseLocation(location);
  const zip = getZip(location);
  const baseSeed = zip.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const rng = seededRandom(baseSeed + propertyTypes.length * 17 + Math.floor(budget.min / 1000));

  const count = randInt(rng, 15, 22);
  const properties = [];
  const corridor = CORRIDORS[randInt(rng, 0, CORRIDORS.length - 1)];

  const zoningKeys = Object.keys(ZONING_TYPES);

  for (let i = 0; i < count; i++) {
    const propRng = seededRandom(baseSeed + i * 97 + 31337);
    const type = propertyTypes.length > 0 ? pickRandom(propRng, propertyTypes) : 'Single Family Home';
    const config = PROPERTY_TYPE_CONFIGS[type] || PROPERTY_TYPE_CONFIGS['Single Family Home'];

    const priceRange = budget.max - budget.min;
    const price = Math.round(randBetween(propRng, budget.min, budget.max) / 1000) * 1000;

    const sqft = type === 'Land / Lot' ? 0 : randInt(propRng, config.sqftRange[0], config.sqftRange[1]);
    const beds = type === 'Land / Lot' ? 0 : randInt(propRng, config.bedRange[0], config.bedRange[1]);
    const bathOptions = [1, 1.5, 2, 2.5, 3, 3.5, 4];
    const baths = type === 'Land / Lot' ? 0 : bathOptions[randInt(propRng, 0, Math.min(config.bathRange[1] * 2, bathOptions.length - 1))];
    const lotSize = type === 'Condo' ? 0 : roundTo(randBetween(propRng, config.lotRange[0], config.lotRange[1]), 2);
    const yearBuilt = randInt(propRng, 1945, 2018);
    const daysOnMarket = randInt(propRng, 3, 120);

    const currentZoning = zoningKeys[randInt(propRng, 0, 3)];
    const nearbyZone = NEARBY_ZONES[randInt(propRng, 0, NEARBY_ZONES.length - 1)];
    const transitProject = TRANSIT_PROJECTS[randInt(propRng, 0, TRANSIT_PROJECTS.length - 1)];
    const devProject = DEVELOPMENT_PROJECTS[randInt(propRng, 0, DEVELOPMENT_PROJECTS.length - 1)];
    const councilQuote = COUNCIL_QUOTES[randInt(propRng, 0, COUNCIL_QUOTES.length - 1)];

    const latOffset = (propRng() - 0.5) * 0.08;
    const lngOffset = (propRng() - 0.5) * 0.08;
    const lat = locationInfo.lat + latOffset;
    const lng = locationInfo.lng + lngOffset;

    const address = generateAddress(propRng, locationInfo);
    const city = locationInfo.city || 'Metro City';
    const state = locationInfo.state || 'ST';

    const imageColors = generatePropertyImage(i, type);

    const pricePerSqft = sqft > 0 ? Math.round(price / sqft) : 0;
    const adjacentPricePerSqft = sqft > 0 ? Math.round(pricePerSqft * randBetween(propRng, 1.2, 1.55)) : 0;
    const discount = adjacentPricePerSqft > 0 ? Math.round((1 - pricePerSqft / adjacentPricePerSqft) * 100) : 0;

    const rentalPerUnit = Math.round(randBetween(propRng, 900, 2400) / 50) * 50;
    const estimatedMortgage = Math.round((price * 0.007) / 100) * 100;
    const cashFlow = rentalPerUnit - Math.round(estimatedMortgage / (type === 'Duplex' ? 2 : type === 'Triplex' ? 3 : type === 'Fourplex / Quadplex' ? 4 : 1));

    const incomeGrowth = roundTo(randBetween(propRng, 3, 18), 1);
    const metroAvgGrowth = roundTo(randBetween(propRng, 2, 6), 1);

    properties.push({
      id: `prop-${zip}-${i}`,
      address,
      city,
      state,
      zip,
      fullAddress: `${address}, ${city}, ${state} ${zip}`,
      price,
      type,
      sqft,
      beds,
      baths,
      lotSize,
      yearBuilt,
      daysOnMarket,
      pricePerSqft,
      currentZoning: ZONING_TYPES[currentZoning],
      imageColors,
      lat,
      lng,
      analysisData: {
        nearbyZone,
        transitProject,
        devProject,
        councilQuote,
        adjacentPricePerSqft,
        discount,
        rentalPerUnit,
        estimatedMortgage,
        cashFlow,
        incomeGrowth,
        metroAvgGrowth,
        zoningAge: 2025 - randInt(propRng, 1990, 2018),
        activePetitions: randInt(propRng, 0, 3),
        newBusinessPermits: randInt(propRng, 8, 45),
        schoolRating: randInt(propRng, 5, 10),
        vacancyRate: roundTo(randBetween(propRng, 2, 9), 1),
        rentGrowth: roundTo(randBetween(propRng, 3, 14), 1),
        populationGrowth: roundTo(randBetween(propRng, 1, 8), 1),
      },
      corridor,
    });
  }

  return { properties, corridor, zip, locationInfo };
}
