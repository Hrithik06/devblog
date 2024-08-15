// Parse the timestamp

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
