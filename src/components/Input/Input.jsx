import * as React from "react";
import styles from "./Input.module.css"; // Import the CSS Module

export const Input = ({
  type = "text",
  label = "Label",
  error = "",
  required = false,
  onChange,
  className,
  ...props
}) => {
  // Combine base, border, and any external class names
  const inputClasses = `${styles.baseInput} ${
    error ? styles.errorBorder : styles.defaultBorder
  } ${className || ""}`;

  return (
    <label className={styles.labelContainer}>
      {label && (
        <span className={styles.labelSpan}>
          {label}
          {required && <span className={styles.requiredStar}>*</span>}
        </span>
      )}
      <input
        type={type}
        className={inputClasses}
        required={required}
        onChange={onChange}
        {...props}
      />
      {error && (
        <p className={styles.errorText}>
          {/* SVG for the error icon (resized for better alignment with the CSS styling) */}
          <svg
            width="18"
            height="18"
            viewBox="0 0 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.errorIcon}
          >
            <path
              fill="#DA0000"
              d="M10.4997 1.45837C8.8103 1.45837 7.15885 1.95933 5.75418 2.8979C4.34951 3.83647 3.25471 5.1705 2.60821 6.73129C1.96171 8.29207 1.79256 10.0095 2.12214 11.6664C2.45172 13.3234 3.26523 14.8453 4.45981 16.0399C5.65438 17.2345 7.17636 18.048 8.83328 18.3776C10.4902 18.7072 12.2076 18.538 13.7684 17.8915C15.3292 17.245 16.6632 16.1502 17.6018 14.7455C18.5404 13.3409 19.0413 11.6894 19.0413 10C19.0391 7.73533 18.1385 5.564 16.5371 3.96261C14.9357 2.36121 12.7644 1.46058 10.4997 1.45837ZM9.66634 5.62504C9.66634 5.40403 9.75414 5.19207 9.91042 5.03579C10.0667 4.8795 10.2787 4.79171 10.4997 4.79171C10.7207 4.79171 10.9327 4.8795 11.0889 5.03579C11.2452 5.19207 11.333 5.40403 11.333 5.62504V10.9C11.333 11.1211 11.2452 11.333 11.0889 11.4893C10.9327 11.6456 10.7207 11.7334 10.4997 11.7334C10.2787 11.7334 10.0667 11.6456 9.91042 11.4893C9.75414 11.333 9.66634 11.1211 9.66634 10.9V5.62504ZM10.4997 14.8584C10.2937 14.8584 10.0923 14.7973 9.92096 14.6828C9.74966 14.5684 9.61615 14.4057 9.5373 14.2153C9.45846 14.025 9.43783 13.8156 9.47803 13.6135C9.51822 13.4114 9.61743 13.2258 9.76311 13.0801C9.90879 12.9345 10.0944 12.8352 10.2965 12.7951C10.4985 12.7549 10.708 12.7755 10.8983 12.8543C11.0886 12.9332 11.2513 13.0667 11.3658 13.238C11.4803 13.4093 11.5413 13.6107 11.5413 13.8167C11.5393 14.085 11.4329 14.342 11.2447 14.5333C11.0565 14.7246 10.8013 14.8352 10.533 14.8417L10.4997 14.8584Z"
            />
          </svg>

          {error}
        </p>
      )}
    </label>
  );
};