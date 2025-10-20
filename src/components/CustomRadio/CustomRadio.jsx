import React from "react";
import styles from "./CustomRadio.module.css";


export const CustomRadio = ({
  checked = false,
  onChange,
  size = "md",
  disabled = false,
  name,
  value,
}) => {
  const sizeMap = {
    sm: 16,
    md: 20,
    lg: 28,
  };

  const radioSize = sizeMap[size];

  const sizeClass = styles[`size-${size}`];
  
  // FIX: Ensure the base style class '.dot' is always included.
  const dotClasses = `${styles.dot} ${checked ? styles.dotAnimated : styles.dotHidden}`;
  
  const radioClasses = `${styles.customRadio} ${sizeClass} ${checked ? styles.checked : styles.unchecked} ${disabled ? styles.disabled : ''}`;
  
  const RadioOutline = (
    <path 
      d="M16 32C7.1632 32 0 24.8368 0 16C0 7.1632 7.1632 0 16 0C24.8368 0 32 7.1632 32 16C32 24.8368 24.8368 32 16 32ZM16 28.8C19.3948 28.8 22.6505 27.4514 25.051 25.051C27.4514 22.6505 28.8 19.3948 28.8 16C28.8 12.6052 27.4514 9.3495 25.051 6.94903C22.6505 4.54857 19.3948 3.2 16 3.2C12.6052 3.2 9.3495 4.54857 6.94903 6.94903C4.54857 9.3495 3.2 12.6052 3.2 16C3.2 19.3948 4.54857 22.6505 6.94903 25.051C9.3495 27.4514 12.6052 28.8 16 28.8Z" 
      fill="currentColor"
    />
  );

  return (
    <label
      className={radioClasses}
    >
      <input
        type="radio"
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
        disabled={disabled}
        name={name}
        value={value}
        className={styles.hiddenInput}
      />

      <span className={styles.visualContainer} style={{ width: radioSize, height: radioSize }}>
        <svg 
          width={radioSize}
          height={radioSize} 
          viewBox="0 0 32 32" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {RadioOutline}
          
          <circle
            cx="16"
            cy="16"
            r="8"
            className={dotClasses}
          />
        </svg>
      </span>
    </label>
  );
};