import moment from 'moment';

export const FormatDate = (timeStamp: string | number | Date) => {

    return new Date(timeStamp).setHours(0,0, 0, 0);
};

export const formatDateForText = (date: moment.MomentInput) => {
    return moment(date).format('L')
}

export const formatTime = (timestamp: string | number | Date) => {
    const date = new Date(timestamp);
    const timeString = date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
    })
    return timeString;
}