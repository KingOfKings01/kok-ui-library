// Input.tsx

import * as React from "react";
// Import the CSS Module
import styles from "./Input.module.css";


export const Input = ({
  type = "text",
  label = "Label",
  error = "",
  required = false,
  countryCode = "+91",
  onChange = () => {},
  className,
  ...props
}) => {
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const countryCodeRef = React.useRef<HTMLSpanElement>(null);

  // Determine the wrapper and country code classes based on error state
  const wrapperClasses = [
    styles.inputWrapper,
    error ? styles.inputWrapperError : "",
    className, // Allow external classes via className prop
  ].join(" ");

  const handleFocus = (e) => {
    // When the input is focused, apply the focused styles to the country code span
    if (countryCodeRef.current) {
      countryCodeRef.current.classList.add(styles.countryCodeSpanFocused);
    }

    // Since the main focus style is on the wrapper's :focus-within,
    // we don't strictly need to manually manipulate wrapperRef.current.style.border
    // unless you want a more complex focus effect not achievable with pure CSS.
    // For simplicity and adherence to CSS modules, we'll rely on the CSS
    // but the original code was:
    // if (wrapperRef.current) {
    //     wrapperRef.current.style.border = "2px solid #0241ED"; // blue border
    // }

    // If you need to keep the explicit border-setting for any reason:
    if (wrapperRef.current && !error) {
      wrapperRef.current.style.borderColor = "#0241ED";
    }
    // Call any external onFocus if it was passed in props
    if (props.onFocus) {
      props.onFocus(e);
    }
  };

  const handleBlur = (e) => {
    // When the input is blurred, remove the focused styles
    if (countryCodeRef.current) {
      countryCodeRef.current.classList.remove(styles.countryCodeSpanFocused);
    }

    // Reset the wrapper border manually if error state hasn't changed
    if (wrapperRef.current) {
      if (error) {
        wrapperRef.current.style.borderColor = "#EF4444"; // Red
      } else {
        wrapperRef.current.style.borderColor = "#D1D5DB"; // Gray-300
      }
    }
    // Call any external onBlur if it was passed in props
    if (props.onBlur) {
      props.onBlur(e);
    }
  };

  // We are forcing the type to "tel" when countryCode is present, matching the original logic
  const inputType = countryCode ? "tel" : type;

  return (
    <label className={styles.labelWrapper}>
      {label && (
        <span className={styles.labelSpan}>
          {label}
          {required && <span className={styles.requiredStar}>*</span>}
        </span>
      )}

      {/* The input container is where the border and background styles are applied */}
      <div ref={wrapperRef} className={wrapperClasses}>
        {countryCode && (
          // The countryCodeSpan styles are now managed by CSS module classes
          <span ref={countryCodeRef} className={styles.countryCodeSpan} id="country-code">
            {countryCode}
          </span>
        )}

        <input
          type={inputType}
          className={styles.inputElement}
          required={required}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={props.disabled}
          {...props}
        />
      </div>

      {error && (
        <p className={styles.errorText}>
          <svg width="20" height="20" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M13 1.89587C10.8038 1.89587 8.65691 2.54712 6.83084 3.76726C5.00477 4.98741 3.58152 6.72164 2.74107 8.75066C1.90062 10.7797 1.68072 13.0124 2.10918 15.1664C2.53764 17.3204 3.59521 19.2989 5.14815 20.8519C6.7011 22.4048 8.67967 23.4624 10.8337 23.8908C12.9877 24.3193 15.2203 24.0994 17.2494 23.259C19.2784 22.4185 21.0126 20.9953 22.2328 19.1692C23.4529 17.3431 24.1042 15.1962 24.1042 13C24.1013 10.0559 22.9305 7.23319 20.8486 5.15138C18.7668 3.06956 15.9441 1.89874 13 1.89587ZM11.9167 7.31254C11.9167 7.02522 12.0308 6.74967 12.234 6.54651C12.4371 6.34334 12.7127 6.22921 13 6.22921C13.2873 6.22921 13.5629 6.34334 13.766 6.54651C13.9692 6.74967 14.0833 7.02522 14.0833 7.31254V14.17C14.0833 14.4574 13.9692 14.7329 13.766 14.9361C13.5629 15.1392 13.2873 15.2534 13 15.2534C12.7127 15.2534 12.4371 15.1392 12.234 14.9361C12.0308 14.7329 11.9167 14.4574 11.9167 14.17V7.31254ZM13 19.3159C12.7322 19.3159 12.4703 19.2365 12.2477 19.0877C12.025 18.9389 11.8514 18.7274 11.7489 18.4799C11.6464 18.2325 11.6196 17.9602 11.6718 17.6975C11.7241 17.4348 11.8531 17.1936 12.0424 17.0042C12.2318 16.8148 12.4731 16.6858 12.7358 16.6336C12.9985 16.5813 13.2708 16.6081 13.5182 16.7106C13.7656 16.8131 13.9771 16.9867 14.1259 17.2094C14.2747 17.4321 14.3542 17.6939 14.3542 17.9617C14.3514 18.3105 14.2131 18.6446 13.9685 18.8933C13.7239 19.142 13.3921 19.2858 13.0433 19.2942L13 19.3159Z"
            />
          </svg>
          {error}
        </p>
      )}
    </label>
  );
};