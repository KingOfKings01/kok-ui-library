import * as React from "react";
import styles from "./FileUpload.module.css";



const UploadIcon = ({ className }) => (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M2.66667 21.6666C1.93333 21.6666 1.30578 21.4057 0.784 20.8839C0.262222 20.3621 0.000888889 19.7341 0 18.9999V16.3333C0 15.9555 0.128 15.639 0.384 15.3839C0.64 15.1288 0.956444 15.0008 1.33333 14.9999C1.71022 14.999 2.02711 15.127 2.284 15.3839C2.54089 15.6408 2.66844 15.9573 2.66667 16.3333V18.9999H18.6667V16.3333C18.6667 15.9555 18.7947 15.639 19.0507 15.3839C19.3067 15.1288 19.6231 15.0008 20 14.9999C20.3769 14.999 20.6938 15.127 20.9507 15.3839C21.2076 15.6408 21.3351 15.9573 21.3333 16.3333V18.9999C21.3333 19.7333 21.0724 20.3613 20.5507 20.8839C20.0289 21.4066 19.4009 21.6675 18.6667 21.6666H2.66667ZM9.33333 5.46659L6.83333 7.96659C6.56667 8.23326 6.25022 8.36126 5.884 8.35059C5.51778 8.33992 5.20089 8.20081 4.93333 7.93326C4.68889 7.66659 4.56089 7.35548 4.54933 6.99992C4.53778 6.64437 4.66578 6.33326 4.93333 6.06659L9.73333 1.26659C9.86667 1.13326 10.0111 1.03903 10.1667 0.983922C10.3222 0.928811 10.4889 0.900812 10.6667 0.899923C10.8444 0.899034 11.0111 0.927034 11.1667 0.983922C11.3222 1.04081 11.4667 1.13503 11.6 1.26659L16.4 6.06659C16.6667 6.33326 16.7947 6.64437 16.784 6.99992C16.7733 7.35548 16.6453 7.66659 16.4 7.93326C16.1333 8.19992 15.8169 8.33903 15.4507 8.35059C15.0844 8.36214 14.7676 8.23415 14.5 7.96659L12 5.46659V14.9999C12 15.3777 11.872 15.6946 11.616 15.9506C11.36 16.2066 11.0436 16.3341 10.6667 16.3333C10.2898 16.3324 9.97333 16.2044 9.71733 15.9493C9.46133 15.6941 9.33333 15.3777 9.33333 14.9999V5.46659Z" fill="#333333" />
    </svg>

);

const ErrorIcon = ({ className }) => (
    <svg width="20" height="20" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M12.9999 1.89575C..." fill="currentColor" />
    </svg>
);


export const FileUpload = ({
    label = "Label",
    required = false,
    error = "",
    accept = "application/pdf",
    maxSizeMB = 5,
    onFileSelect,
    className = "",
}) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [fileName, setFileName] = React.useState<string | null>(null);

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];

        if (!file) {
            setFileName(null);
            onFileSelect?.(null);
            return;
        }

        const isValidType = accept.split(",").some(type => file.type.includes(type.trim().replace(/\*\/(\w+)$/, '')));
        const isValidSize = file.size <= maxSizeMB * 1024 * 1024;

        if (isValidType && isValidSize) {
            setFileName(file.name);
            onFileSelect?.(file);
        } else {
            setFileName(null);
            onFileSelect?.(null);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.currentTarget.classList.remove(styles.dragOver); // Remove visual ring
        const file = e.dataTransfer.files?.[0];
        if (file) {
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            if (inputRef.current) {
                inputRef.current.files = dataTransfer.files;
                // Trigger the change handler
                handleFileChange({ target: inputRef.current });
            }
        }
    };

    const displayAccepts = accept
        .split(',')
        .map(type => {
            const parts = type.trim().split('/');
            return parts.length > 1 ? parts[1].toUpperCase().replace("JPEG", "JPG") : parts[0].toUpperCase();
        })
        .join('/')
        .replace(/\*\//g, ''); 

    const rootClasses = `${styles.fileUploadRoot} ${className}`;
    const dropzoneClasses = `${styles.dropZone} ${error ? styles.dropZoneError : styles.dropZoneDefault}`;

    return (
        <label htmlFor="file-upload" className={rootClasses}>
            {label && (
                <span className={styles.label}>
                    {label}
                    {required && <span className={styles.requiredIndicator}>*</span>}
                </span>
            )}

            <div
                className={dropzoneClasses}
                onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add(styles.dragOver); }}
                onDragLeave={(e) => { e.currentTarget.classList.remove(styles.dragOver); }}
                onDrop={handleDrop}
                tabIndex={0}
            >
                <div className={styles.contentWrapper}>
                    <div className={styles.uploadButtonSection}>
                        <UploadIcon className={styles.uploadIcon} />
                        <span className={styles.uploadButtonText}>
                            {fileName ? 'Change File' : 'Upload File'}
                        </span>
                    </div>

                    <div className={styles.fileTypeIndicator}>{displayAccepts}</div>

                    {fileName && <div className={styles.fileNameDisplay}>{fileName}</div>}
                </div>

                <input
                    id="file-upload"
                    ref={inputRef}
                    type="file"
                    accept={accept}
                    onChange={handleFileChange}
                    className={styles.hiddenInput}
                />
            </div>

            <p className={styles.hintText}>
                {fileName
                    ? `File selected: ${fileName}`
                    : `Click to upload or drag the file here (Max ${maxSizeMB}MB)`
                }
            </p>

            {error && (
                <p className={styles.errorMessage}>
                    <ErrorIcon className={styles.errorIcon} />
                    {error}
                </p>
            )}
        </label>
    );
};