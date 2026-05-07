import './PropertyImage.css';

const SHAPES = [
  // Modern house silhouette paths
  'M10,80 L50,20 L90,80 Z M20,80 L20,95 L80,95 L80,80',
  'M5,85 L5,95 L95,95 L95,85 L70,85 L70,50 L30,50 L30,85 Z M50,10 L15,50 L85,50 Z',
  'M10,95 L10,60 L30,40 L50,20 L70,40 L90,60 L90,95 Z',
  'M5,95 L5,70 L20,50 L20,95 M80,95 L80,50 L95,70 L95,95 M20,95 L80,95 M35,95 L35,65 L65,65 L65,95',
  'M15,95 L15,55 L50,25 L85,55 L85,95 Z M40,95 L40,70 L60,70 L60,95',
];

export function PropertyImage({ colors, type, index }) {
  const [c1, c2, c3] = colors;
  const shapeIdx = index % SHAPES.length;
  const gradId = `grad-${index}`;
  const bgGradId = `bgrad-${index}`;

  return (
    <div className="property-image">
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id={bgGradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={c1} />
            <stop offset="100%" stopColor={c2} />
          </linearGradient>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={c3} stopOpacity="0.9" />
            <stop offset="100%" stopColor={c1} stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <rect width="100" height="100" fill={`url(#${bgGradId})`} />
        {/* Stars/dots pattern */}
        {Array.from({ length: 12 }).map((_, i) => (
          <circle
            key={i}
            cx={(i * 31 + 7) % 100}
            cy={(i * 17 + 13) % 60}
            r={i % 3 === 0 ? 1.5 : 0.8}
            fill="white"
            opacity={0.15 + (i % 4) * 0.05}
          />
        ))}
        {/* House shape */}
        <g transform="translate(0, 0)" opacity="0.85">
          <path d={SHAPES[shapeIdx]} fill={`url(#${gradId})`} stroke={c3} strokeWidth="1.5" strokeLinejoin="round" />
        </g>
        {/* Ground line */}
        <line x1="0" y1="95" x2="100" y2="95" stroke={c3} strokeWidth="0.5" opacity="0.4" />
        {/* Type label strip */}
        <rect x="0" y="83" width="100" height="12" fill="rgba(0,0,0,0.45)" />
        <text x="50" y="92" textAnchor="middle" fill="white" fontSize="5.5" fontFamily="Inter,sans-serif" fontWeight="600" opacity="0.9">
          {type.toUpperCase()}
        </text>
      </svg>
    </div>
  );
}
