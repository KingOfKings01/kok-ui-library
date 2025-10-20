import React from "react";
import styles from "./SideNavigationBar.module.css";

// Map theme styles to CSS Module classes
const themeClasses = {
  blue: {
    activeBg: styles.blueActiveBg,
    activeText: styles.blueActiveText,
    activeBorder: styles.blueActiveBorder,
    inactiveText: styles.blueInactiveText,
    hoverText: styles.blueHoverText,
    hoverBg: styles.blueHoverBg,
  },
  green: {
    activeBg: styles.greenActiveBg,
    activeText: styles.greenActiveText,
    activeBorder: styles.greenActiveBorder,
    inactiveText: styles.greenInactiveText,
    hoverText: styles.greenHoverText,
    hoverBg: styles.greenHoverBg,
  },
};

export const SideNavigationBar = ({
  items,
  activeItemId,
  onItemClick,
  theme = "blue",
  className = "",
}) => {
  const themeStyles = themeClasses[theme];

  return (
    <nav className={`${styles.nav} ${className}`}>
      <ul className={styles.navList}>
        {items.map((item, index) => {
          const isActive = item.id === activeItemId;

          const buttonClasses = [
            styles.navButton,
            isActive
              ? // Active Classes
                themeStyles.activeBg + ' ' + themeStyles.activeText
              : // Inactive Classes
                `${styles.inactiveButton} ${themeStyles.inactiveText} ${themeStyles.hoverBg} ${themeStyles.hoverText}`,
          ].join(' ').trim();

          const sideLineClasses = `${styles.sideLine} ${themeStyles.activeBorder}`;

          return (
            <li className={styles.navListItem} key={item.id}>
              <button
                onClick={() => onItemClick(item.id)}
                className={buttonClasses}
              >
                {isActive && <span className={sideLineClasses} />}
                <span className={styles.buttonLabel}>{item.label}</span>
              </button>

              {/* The HR divider for md:divide-y */}
              {index < items.length - 1 && (
                <hr className={styles.separator} />
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};