import React, { useState, useMemo } from "react";
import styles from "./Tickbox.module.css";

export const Tickbox = ({
  label = "",
  checked: controlledChecked,
  disabled = false,
  onChange,
}) => {
  const [internalChecked, setInternalChecked] = useState(false);

  const isControlled = typeof controlledChecked === "boolean";
  const isChecked = isControlled ? controlledChecked : internalChecked;

  const handleToggle = () => {
    if (disabled) return;
    const newState = !isChecked;
    if (!isControlled) setInternalChecked(newState);
    onChange?.(newState);
  };

  const containerClasses = useMemo(() => {
    return `${styles.container} ${disabled ? styles.disabled : styles.clickable}`;
  }, [disabled]);

  const tickboxClasses = useMemo(() => {
    return `${styles.tickbox} ${isChecked ? styles.checked : styles.unchecked} ${disabled ? styles.disabledBox : ""}`;
  }, [isChecked, disabled]);

  const pathClasses = useMemo(() => {
    return `${styles.tickPath} ${isChecked ? styles.pathChecked : styles.pathUnchecked}`;
  }, [isChecked]);

  const labelClasses = useMemo(() => {
    return `${styles.label} ${disabled ? styles.labelDisabled : ""}`;
  }, [disabled]);

  return (
    <div className={containerClasses} onClick={handleToggle}>
      <div className={tickboxClasses}>
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.svg}
        >
          <path
            d="M5 16L13 24L27 10"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={pathClasses}
          />
        </svg>
        
      </div>

      {label && (
        <span className={labelClasses}>
          {label}
        </span>
      )}
    </div>
  );
};