import jsPDF from 'jspdf';

export async function exportToPdf(properties, criteria) {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;

  doc.setFillColor(10, 10, 20);
  doc.rect(0, 0, pageWidth, 297, 'F');

  doc.setFillColor(30, 58, 100);
  doc.rect(0, 0, pageWidth, 40, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('Real Estate Optimizer', margin, 18);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(148, 185, 230);
  doc.text(`Analysis Report — ${new Date().toLocaleDateString()}`, margin, 26);
  doc.text('⚠ All property data is simulated for demonstration purposes.', margin, 33);

  let y = 52;

  doc.setTextColor(100, 180, 255);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Search Criteria', margin, y);
  y += 7;

  doc.setTextColor(200, 200, 220);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(`Location: ${criteria.location || 'Not specified'}`, margin, y); y += 5;
  doc.text(`Budget: $${(criteria.budget.min / 1000).toFixed(0)}K – $${(criteria.budget.max / 1000).toFixed(0)}K`, margin, y); y += 5;
  doc.text(`Property Types: ${criteria.propertyTypes.join(', ') || 'All'}`, margin, y); y += 5;
  doc.text(`Investment Horizon: ${criteria.investmentHorizon} years`, margin, y); y += 10;

  doc.setTextColor(100, 180, 255);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text(`Top Properties (${properties.length} found)`, margin, y);
  y += 8;

  properties.slice(0, 20).forEach((prop, idx) => {
    if (y > 260) {
      doc.addPage();
      doc.setFillColor(10, 10, 20);
      doc.rect(0, 0, pageWidth, 297, 'F');
      y = 20;
    }

    doc.setFillColor(20, 30, 50);
    doc.roundedRect(margin, y - 4, contentWidth, 28, 2, 2, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text(`${idx + 1}. ${prop.fullAddress}`, margin + 3, y + 3);

    doc.setTextColor(100, 220, 160);
    doc.setFontSize(11);
    doc.text(`$${prop.price.toLocaleString()}`, margin + 3, y + 11);

    doc.setTextColor(180, 180, 200);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    const details = [
      prop.type,
      prop.beds > 0 ? `${prop.beds}bd/${prop.baths}ba` : '',
      prop.sqft > 0 ? `${prop.sqft.toLocaleString()} sqft` : '',
    ].filter(Boolean).join(' · ');
    doc.text(details, margin + 3, y + 17);

    const score = prop.scores?.overall || 0;
    const stars = '★'.repeat(Math.round(score)) + '☆'.repeat(5 - Math.round(score));
    doc.setTextColor(245, 158, 11);
    doc.setFontSize(10);
    doc.text(stars, margin + 3, y + 23);

    doc.setTextColor(150, 180, 220);
    doc.setFontSize(8);
    doc.text(`Overall Score: ${score.toFixed(1)}/5`, margin + 35, y + 23);

    y += 32;
  });

  doc.setTextColor(80, 80, 100);
  doc.setFontSize(7);
  const lastPage = doc.internal.getNumberOfPages();
  doc.setPage(lastPage);
  doc.text(
    'DISCLAIMER: All property listings, addresses, prices, and scores are simulated for demonstration purposes only. Not investment advice.',
    margin,
    285,
    { maxWidth: contentWidth }
  );

  doc.save(`real-estate-optimizer-${new Date().toISOString().slice(0, 10)}.pdf`);
}

export function exportToCsv(properties) {
  const headers = [
    'Address', 'City', 'State', 'ZIP', 'Price', 'Type', 'Beds', 'Baths',
    'Sqft', 'Price/Sqft', 'Year Built', 'Current Zoning',
    'Overall Score', 'Zoning Transition', 'Neighborhood Growth',
    'Voting & Policy', 'Price to Value', 'Infrastructure', 'Rental Income',
  ];

  const rows = properties.map(p => [
    `"${p.address}"`, p.city, p.state, p.zip,
    p.price, `"${p.type}"`, p.beds, p.baths,
    p.sqft, p.pricePerSqft, p.yearBuilt, `"${p.currentZoning?.label || ''}"`,
    p.scores?.overall || '', p.scores?.zoningTransition || '',
    p.scores?.neighborhoodGrowth || '', p.scores?.votingPolicy || '',
    p.scores?.priceValue || '', p.scores?.infrastructure || '',
    p.scores?.rentalIncome || '',
  ]);

  const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `real-estate-optimizer-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
