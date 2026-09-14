import React from 'react';

export default function VegBadge({ isVeg, showLabel = false }) {
  if (isVeg) {
    return (
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
        <span className="veg-indicator veg" title="Pure Vegetarian" aria-label="Vegetarian">
          <span className="dot"></span>
        </span>
        {showLabel && <span className="diet-pill veg">VEG</span>}
      </div>
    );
  }

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
      <span className="veg-indicator non-veg" title="Non-Vegetarian" aria-label="Non-Vegetarian">
        <span className="dot"></span>
      </span>
      {showLabel && <span className="diet-pill non-veg">NON-VEG</span>}
    </div>
  );
}
