const calculateTime = (timestamp) => {
    let date = new Date(Date.now() - timestamp);

    let days = date.getDate();
    if (days) {
        return days + " days ago";
    }
    let hours = date.getHours();
    if (hours) {
        return hours;
    }
    let minutes = date.getMinutes();
    if (minutes) {
        return minutes + " minutes ago";
    }
    return "few seconds ago"
}

export default calculateTime;