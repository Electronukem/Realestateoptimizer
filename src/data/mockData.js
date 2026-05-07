export const STREET_NAMES = [
  'Maple', 'Oak', 'Elm', 'Pine', 'Cedar', 'Birch', 'Walnut', 'Ash', 'Willow', 'Poplar',
  'Main', 'First', 'Second', 'Third', 'Washington', 'Lincoln', 'Jefferson', 'Madison',
  'Highland', 'Riverside', 'Lakewood', 'Brookside', 'Hillcrest', 'Sunset', 'Sunrise',
  'Memorial', 'Commerce', 'Market', 'Industrial', 'Railroad', 'Harbor', 'Waterfront',
  'Spring', 'Summer', 'Autumn', 'Winter', 'Garden', 'Meadow', 'Valley', 'Ridge',
  'Greenwood', 'Fairview', 'Plainfield', 'Westview', 'Eastside', 'Northgate', 'Southpark',
];

export const STREET_TYPES = ['St', 'Ave', 'Blvd', 'Dr', 'Ln', 'Rd', 'Way', 'Ct', 'Pl', 'Ter'];

export const ZONING_TYPES = {
  R1: { label: 'R-1 Single Family', density: 'low', color: '#10b981' },
  R2: { label: 'R-2 Low Density Residential', density: 'low-medium', color: '#3b82f6' },
  R3: { label: 'R-3 Medium Density Residential', density: 'medium', color: '#8b5cf6' },
  MU1: { label: 'MU-1 Mixed Use Light', density: 'medium-high', color: '#f59e0b' },
  MU2: { label: 'MU-2 Mixed Use General', density: 'high', color: '#ef4444' },
  C1: { label: 'C-1 Neighborhood Commercial', density: 'medium', color: '#06b6d4' },
  C2: { label: 'C-2 General Commercial', density: 'high', color: '#ec4899' },
  IN: { label: 'Industrial Light', density: 'low', color: '#64748b' },
  TOD: { label: 'TOD Transit Overlay', density: 'high', color: '#f97316' },
};

export const NEARBY_ZONES = [
  { from: 'R-1', to: 'MU-1', year: 2024, distance: 0.3 },
  { from: 'R-2', to: 'MU-2', year: 2023, distance: 0.5 },
  { from: 'Industrial', to: 'C-2', year: 2024, distance: 0.8 },
  { from: 'R-3', to: 'TOD', year: 2025, distance: 0.2 },
  { from: 'C-1', to: 'MU-2', year: 2022, distance: 1.1 },
  { from: 'R-1', to: 'R-3', year: 2023, distance: 0.6 },
  { from: 'Industrial', to: 'Mixed-Use', year: 2024, distance: 0.4 },
];

export const TRANSIT_PROJECTS = [
  { type: 'Light Rail Station', distance: 0.8, completion: 2027 },
  { type: 'Bus Rapid Transit Hub', distance: 0.4, completion: 2026 },
  { type: 'Commuter Rail Stop', distance: 1.2, completion: 2028 },
  { type: 'Bike Share Expansion', distance: 0.1, completion: 2025 },
  { type: 'Pedestrian Bridge', distance: 0.3, completion: 2026 },
  { type: 'Highway On-Ramp', distance: 0.6, completion: 2027 },
];

export const DEVELOPMENT_PROJECTS = [
  'A 15-acre mixed-use development is in permitting at the adjacent parcel.',
  'A new 200-unit apartment complex broke ground 0.4 miles away.',
  'A grocery-anchored retail center is under construction 0.6 miles east.',
  'City approved a $45M downtown revitalization grant for this corridor.',
  'Two new commercial developments broke ground within 1 mile.',
  'A tech campus expansion is planned 0.9 miles north.',
  'Historic district designation proceedings are underway, protecting character.',
  'New elementary school construction approved 0.5 miles away.',
];

export const COUNCIL_QUOTES = [
  'City council voting records show 4 of 5 members support mixed-use expansion in this corridor.',
  'The district council member championed the 2024 Affordable Housing Opportunity Act.',
  'A pro-development candidate won the district seat with 62% of the vote in 2024.',
  'A ballot measure to expand mixed-use zoning passed with 58% approval.',
  'City planning commission approved the Comprehensive Zoning Update in Q1 2025.',
  'Three consecutive planning commission votes favored upzoning in adjacent parcels.',
  'The mayor\'s 2025 housing plan explicitly targets this corridor for densification.',
];

export const PROPERTY_TYPE_CONFIGS = {
  'Single Family Home': { bedRange: [2, 5], bathRange: [1, 3.5], sqftRange: [900, 3200], lotRange: [0.1, 0.8] },
  'Duplex': { bedRange: [2, 4], bathRange: [1, 2], sqftRange: [1200, 2800], lotRange: [0.1, 0.4] },
  'Triplex': { bedRange: [2, 3], bathRange: [1, 2], sqftRange: [1800, 3600], lotRange: [0.15, 0.5] },
  'Fourplex / Quadplex': { bedRange: [2, 3], bathRange: [1, 2], sqftRange: [2400, 4800], lotRange: [0.2, 0.6] },
  'Townhouse': { bedRange: [2, 4], bathRange: [1.5, 3], sqftRange: [1100, 2400], lotRange: [0.05, 0.15] },
  'Condo': { bedRange: [1, 3], bathRange: [1, 2], sqftRange: [600, 1800], lotRange: [0, 0] },
  'Multi-Family (5+ units)': { bedRange: [1, 3], bathRange: [1, 2], sqftRange: [4000, 12000], lotRange: [0.3, 1.5] },
  'Land / Lot': { bedRange: [0, 0], bathRange: [0, 0], sqftRange: [0, 0], lotRange: [0.1, 5] },
};

export const CORRIDORS = [
  'Memorial Drive corridor',
  'Riverside Boulevard corridor',
  'Eastside Innovation District',
  'Northgate Mixed-Use corridor',
  'Market Street corridor',
  'Harbor View corridor',
  'Westside Transit corridor',
  'Greenwood Avenue corridor',
];

export const ZIP_CITY_MAP = {
  default: { city: 'Metro City', state: 'ST', lat: 33.749, lng: -84.388 },
  '30312': { city: 'Atlanta', state: 'GA', lat: 33.749, lng: -84.388 },
  '10001': { city: 'New York', state: 'NY', lat: 40.7128, lng: -74.006 },
  '60601': { city: 'Chicago', state: 'IL', lat: 41.8827, lng: -87.6233 },
  '77001': { city: 'Houston', state: 'TX', lat: 29.7604, lng: -95.3698 },
  '85001': { city: 'Phoenix', state: 'AZ', lat: 33.4484, lng: -112.074 },
  '19101': { city: 'Philadelphia', state: 'PA', lat: 39.9526, lng: -75.1652 },
  '78201': { city: 'San Antonio', state: 'TX', lat: 29.4241, lng: -98.4936 },
  '92101': { city: 'San Diego', state: 'CA', lat: 32.7157, lng: -117.1611 },
  '75201': { city: 'Dallas', state: 'TX', lat: 32.7767, lng: -96.797 },
  '95101': { city: 'San Jose', state: 'CA', lat: 37.3382, lng: -121.8863 },
};
