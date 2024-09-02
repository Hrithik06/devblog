import { convert as htmlToText } from 'html-to-text';

// Format the date in user's local timezone
const formattedDate = (date) =>
    date.toLocaleDateString(undefined, {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });

export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return formattedDate(date);
};

const options = {
    wordwrap: false,
    selectors: [{ selector: 'img', format: 'skip' }],
    preserveNewlines: false,
};
export const timeToRead = (content) => {
    const text = htmlToText(content, options);
    const wpm = 265;
    const words = text.trim().split(/\s+/).length;
    const time = Math.ceil(words / wpm);
    return time > 1 ? `${time} min read` : `<1 min read`;
};
