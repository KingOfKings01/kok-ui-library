import React, { useState } from "react";
import styles from "./Switcher.module.css";


export const Switcher = ({
  labels,
  selected = 0,
  onChange,
  className = "",
}) => {
  const [activeIndex, setActiveIndex] = useState(selected);
  const numLabels = labels.length;

  const handleSelect = (index) => {
    setActiveIndex(index);
    onChange?.(index);
  };

  // Static offset from border-2 and padding-1
  const borderAndPaddingOffset = 2; // Corresponds to border-2 (2px) + py-1/px-1 (4px) / 2 = 3px?
  // In the original, top/bottom/left use 2px/4px to account for the border and wrapper padding.
  // We'll calculate the dynamic pill width and position based on the number of labels.

  return (
    <div
      className={`${styles.switcherWrapper} ${className}`}
    >
      {/* Sliding pill - geometry must remain inline for dynamic calculation */}
      <div
        className={styles.slidingPill}
        style={{
          // Top and Bottom are fixed to 2px offset from the wrapper edge (accounting for the 2px border)
          top: "2px",
          bottom: "2px",
          
          // Width is (100% / number of labels) - 4px (2px on each side for margin/gap to wrapper border)
          width: `calc(${100 / numLabels}% - 4px)`,
          
          // Left position: (100% / number of labels * active index) + 2px (left border/padding offset)
          left: `calc(${(100 / numLabels) * activeIndex}% + 2px)`,
        }}
      />

      {/* Labels */}
      {labels.map((label, index) => {
        const isActive = activeIndex === index;
        return (
          <button
            key={label}
            onClick={() => handleSelect(index)}
            className={`${styles.switcherButton} ${
              isActive ? styles.textActive : styles.textInactive
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};