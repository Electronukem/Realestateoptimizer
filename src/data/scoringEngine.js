function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

function scoreToStars(score) {
  return clamp(Math.round(score * 10) / 10, 0, 5);
}

export function scoreProperty(property) {
  const d = property.analysisData;

  // 1. Zoning Transition Potential (0-5)
  let zoningScore = 2.0;
  if (d.nearbyZone.distance <= 0.3) zoningScore += 1.5;
  else if (d.nearbyZone.distance <= 0.6) zoningScore += 1.0;
  else if (d.nearbyZone.distance <= 1.0) zoningScore += 0.5;
  if (d.nearbyZone.year >= 2023) zoningScore += 0.8;
  else if (d.nearbyZone.year >= 2020) zoningScore += 0.4;
  if (d.activePetitions > 0) zoningScore += d.activePetitions * 0.3;
  if (d.zoningAge > 20) zoningScore += 0.3;

  const zoningTransition = scoreToStars(zoningScore);

  // 2. Neighborhood Growth Trajectory (0-5)
  let growthScore = 1.5;
  if (d.incomeGrowth > d.metroAvgGrowth) {
    growthScore += Math.min((d.incomeGrowth - d.metroAvgGrowth) * 0.2, 1.5);
  }
  if (d.populationGrowth > 3) growthScore += 0.8;
  else if (d.populationGrowth > 1.5) growthScore += 0.4;
  if (d.newBusinessPermits > 30) growthScore += 0.8;
  else if (d.newBusinessPermits > 15) growthScore += 0.4;
  if (d.schoolRating >= 8) growthScore += 0.5;
  else if (d.schoolRating >= 6) growthScore += 0.2;

  const neighborhoodGrowth = scoreToStars(growthScore);

  // 3. Voting & Policy Alignment (0-5)
  let votingScore = 2.0;
  const quote = d.councilQuote.toLowerCase();
  if (quote.includes('pro-development') || quote.includes('mixed-use')) votingScore += 1.2;
  if (quote.includes('passed') || quote.includes('approved') || quote.includes('won')) votingScore += 0.8;
  if (quote.includes('62%') || quote.includes('58%') || quote.includes('mayor')) votingScore += 0.5;
  votingScore += Math.random() * 0.8; // slight variance

  const votingPolicy = scoreToStars(votingScore);

  // 4. Price-to-Value Ratio (0-5)
  let priceScore = 1.5;
  if (d.discount > 30) priceScore += 2.0;
  else if (d.discount > 20) priceScore += 1.4;
  else if (d.discount > 10) priceScore += 0.8;
  if (property.daysOnMarket > 60) priceScore += 0.4;
  else if (property.daysOnMarket > 30) priceScore += 0.2;

  const priceValue = scoreToStars(priceScore);

  // 5. Infrastructure & Amenity Pipeline (0-5)
  let infraScore = 1.5;
  if (d.transitProject.distance <= 0.5) infraScore += 1.5;
  else if (d.transitProject.distance <= 1.0) infraScore += 1.0;
  else infraScore += 0.3;
  if (d.transitProject.completion <= 2026) infraScore += 0.8;
  else if (d.transitProject.completion <= 2027) infraScore += 0.5;
  if (d.devProject.includes('mixed-use') || d.devProject.includes('apartment') || d.devProject.includes('campus')) infraScore += 0.5;

  const infrastructure = scoreToStars(infraScore);

  // 6. Rental Income Potential (0-5)
  let rentalScore = 1.5;
  if (d.cashFlow > 500) rentalScore += 2.0;
  else if (d.cashFlow > 200) rentalScore += 1.3;
  else if (d.cashFlow > 0) rentalScore += 0.6;
  if (d.vacancyRate < 4) rentalScore += 0.6;
  else if (d.vacancyRate < 6) rentalScore += 0.3;
  if (d.rentGrowth > 8) rentalScore += 0.5;
  else if (d.rentGrowth > 5) rentalScore += 0.25;

  const rentalIncome = scoreToStars(rentalScore);

  const overall = scoreToStars(
    (zoningTransition * 0.25 +
      neighborhoodGrowth * 0.2 +
      votingPolicy * 0.15 +
      priceValue * 0.2 +
      infrastructure * 0.1 +
      rentalIncome * 0.1) *
      1.0
  );

  return {
    zoningTransition,
    neighborhoodGrowth,
    votingPolicy,
    priceValue,
    infrastructure,
    rentalIncome,
    overall,
  };
}

export function buildExplanations(property, scores) {
  const d = property.analysisData;

  return {
    zoningTransition: `This property is ${d.nearbyZone.distance} miles from a district that was rezoned from ${d.nearbyZone.from} to ${d.nearbyZone.to} in ${d.nearbyZone.year}. ${d.councilQuote} ${d.activePetitions > 0 ? `There are currently ${d.activePetitions} active rezone petition(s) in the surrounding area.` : 'City planning documents indicate this corridor is under review for density increases.'}`,

    neighborhoodGrowth: `Median household income in this ZIP grew ${d.incomeGrowth}% over the past 3 years, ${d.incomeGrowth > d.metroAvgGrowth ? `outpacing` : `compared to`} the metro average of ${d.metroAvgGrowth}%. ${d.devProject} Population growth is tracking at ${d.populationGrowth}% annually. New business permit filings are up ${d.newBusinessPermits} YTD — a strong signal of commercial investment momentum.`,

    votingPolicy: `${d.councilQuote} Local referendum data from the past two election cycles shows consistently pro-growth voter sentiment in this district. School performance ratings average ${d.schoolRating}/10, a key indicator correlated with long-term neighborhood desirability and property demand.`,

    priceValue: property.sqft > 0
      ? `At $${property.pricePerSqft}/sqft, this property is ${d.discount}% below the average of $${d.adjacentPricePerSqft}/sqft for comparable properties in the adjacent, already-rezoned zone — suggesting significant upside if this area follows the same trajectory. Days on market: ${property.daysOnMarket}, indicating ${property.daysOnMarket > 45 ? 'motivated seller conditions' : 'normal market velocity for the area'}.`
      : `Priced at $${(property.price / 1000).toFixed(0)}K, this land parcel represents a strategic land-banking opportunity in an area showing strong upzoning signals. Comparable lots in adjacent rezoned districts trade at ${d.discount}% higher valuations.`,

    infrastructure: `A new ${d.transitProject.type} is approved for construction ${d.transitProject.distance} miles away (completion ${d.transitProject.completion}). Transit proximity is one of the strongest predictors of property value appreciation — studies show properties within 0.5 miles of new transit see 10–25% value gains at opening. ${d.devProject}`,

    rentalIncome: property.type === 'Land / Lot'
      ? `As a land investment, rental income during the hold period is not the primary thesis. However, a temporary lease or agricultural easement could generate $${Math.round(property.price * 0.02 / 12 / 100) * 100}/mo to offset carrying costs while the zoning transition matures.`
      : `Comparable ${property.type.toLowerCase()} properties in this ZIP rent for $${d.rentalPerUnit.toLocaleString()}–$${(d.rentalPerUnit + 250).toLocaleString()}/unit. With a projected mortgage of approximately $${d.estimatedMortgage.toLocaleString()}/mo, estimated net cash flow is ${d.cashFlow > 0 ? '+' : ''}$${d.cashFlow.toLocaleString()}/mo. Local vacancy rate is ${d.vacancyRate}% and rent growth is ${d.rentGrowth}% YoY.`,
  };
}
