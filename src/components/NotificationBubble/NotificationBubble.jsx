import * as React from "react";
import styles from "./NotificationBubble.module.css";



const SvgTail = ({ corner }) => {
    let tailClass = styles.tailDefault;
    if (corner.startsWith("bottom")) {
        tailClass = styles.tailBottom;
    }

    return (
        <svg
            width="24"
            height="17"
            viewBox="0 0 24 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`${styles.tail} ${tailClass}`}
        >
            <path d="M10.4465 1.24061C11.2478 0.137397 12.8939 0.141838 13.6892 1.24936L22.726 13.8334C23.6762 15.1566 22.7306 17 21.1015 17H2.92454C1.29053 17 0.34608 15.1467 1.30634 13.8247L10.4465 1.24061Z" fill="currentColor" />
        </svg>
    );
};

export const NotificationBubble = ({
    message,
    align = "left",
    corner = "bottom-right",
    theme = "blue",
    className = "",
}) => {
    const bubbleClasses = [
        styles.messageBox,
        styles[`theme-${theme}`],
        styles[`align-${align}`],
        className,
    ].join(" ");

    const tailClasses = [
        styles.tailContainer,
        styles[`corner-${corner}`],
    ].join(" ");

    return (
        <div className={bubbleClasses}>
            <span>{message}</span>
            <div className={tailClasses}>
                <SvgTail corner={corner} />
            </div>
        </div>
    );
};