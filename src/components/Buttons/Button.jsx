import * as React from "react";
import "./Button.css";

export const Button = ({
  children,
  variant = "primary",
  size = "m",
  ...props
}) => {
  const classes = [
    "base",
    `size-${size}`,
    variant,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};
