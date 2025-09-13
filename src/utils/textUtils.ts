/**
 * Truncate a string at the next empty space after a given length
 *
 * @param {string} text - The text to truncate
 * @param {number} maxLength - The maximum length before truncation
 * @returns {string} - The truncated string with "..." at the end
 */
export const truncateText = (text: string, maxLength: number) => {

    if (!text) return '';
    if (text.length <= maxLength) return text;

    // Find the next space after maxLength
    let truncateIndex = text.indexOf(' ', maxLength);

    // If no space found after maxLength, truncate at maxLength
    if (truncateIndex === -1) {
        return `${text.substring(0, maxLength)}...`;
    }

    // Truncate at the space and add ...
    return `${text.substring(0, truncateIndex)}...`;
}
