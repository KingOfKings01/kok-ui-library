import * as React from "react";
import styles from "./DropdownButton.module.css"; 


const ChevronDownIcon = ({ className }) => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 20 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.0805 11.5419C10.7988 11.8352 10.4168 12 10.0185 12C9.62014 12 9.23812 11.8352 8.95642 11.5419L0.458598 2.69022C0.315124 2.54587 0.200685 2.37322 0.121957 2.18231C0.0432295 1.99141 0.00178995 1.78609 5.67168e-05 1.57832C-0.00167652 1.37056 0.0363315 1.16452 0.111862 0.972218C0.187393 0.779919 0.298935 0.605214 0.439978 0.458297C0.581022 0.311381 0.748742 0.195195 0.933355 0.116519C1.11797 0.0378436 1.31577 -0.00174633 1.51523 5.90794e-05C1.71469 0.00186449 1.91181 0.0450295 2.09508 0.127035C2.27835 0.209041 2.44411 0.328245 2.58268 0.477692L10.0185 8.22309L17.4542 0.477692C17.7376 0.192664 18.117 0.034949 18.5109 0.0385141C18.9047 0.0420792 19.2815 0.206639 19.56 0.496752C19.8385 0.786865 19.9965 1.17932 19.9999 1.58958C20.0034 1.99985 19.852 2.3951 19.5783 2.69022L11.0805 11.5419Z"
      fill="#333333"
    />
  </svg>
);


export const DropdownButton= ({
  label = "Label",
  required = false,
  options,
  selected,
  onSelect,
  placeholder = "Choose an option",
}) => {
  const [open, setOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const popupRef = React.useRef<HTMLUListElement>(null);
  const [popupStyle, setPopupStyle] = React.useState({ top: 0, left: 0, width: 0 });

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  React.useEffect(() => {
    if (open && dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      setPopupStyle({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, [open]);

  const selectedOptionLabel = selected
    ? options.find((o) => o.value === selected)?.label
    : null;

  return (
    <div className={styles.dropdownContainer} ref={dropdownRef}>
      <span className={styles.label}>
        {label}
        {required && <span className={styles.requiredIndicator}>*</span>}
      </span>

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`${styles.dropdownButton} ${open ? styles.dropdownButtonOpen : styles.dropdownButtonClosed}`}
      >
        <span>
          {selectedOptionLabel ? (
            selectedOptionLabel
          ) : (
            <span className={styles.placeholder}>{placeholder}</span>
          )}
        </span>

        <ChevronDownIcon
          className={`${styles.chevronIcon} ${open ? styles.chevronIconOpen : ""}`}
        />
      </button>

      {open && (
        <ul
          ref={popupRef}
          style={{
            position: "absolute",
            top: popupStyle.top,
            left: popupStyle.left,
            width: popupStyle.width,
            zIndex: 100,
          }}
          className={styles.dropdownPopup}
        >
          {options.map((opt) => (
            <li
              key={opt.value}
              onClick={() => {
                onSelect(opt.value);
                setOpen(false);
              }}
              className={`${styles.dropdownOption} ${
                selected === opt.value ? styles.dropdownOptionSelected : ""
              }`}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};