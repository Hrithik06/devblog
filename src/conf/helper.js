// Parse the timestamp

// Get the day of the week in user's local timezone
const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
];
const dayOfWeek = (date) => daysOfWeek[date.getDay()];

// Format the date in user's local timezone
const formattedDate = (date) =>
    date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${dayOfWeek(date)} ${formattedDate(date)}`;
};
