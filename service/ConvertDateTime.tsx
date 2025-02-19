import moment from 'moment';

export const FormatDate = (timeStamp: string | number | Date) => {

    return new Date(timeStamp);
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

export const getDatesRange = (startDate, endDate)=> {
    const start = moment(new Date(startDate), 'MM/DD/YYYY');
    const end = moment(new Date(endDate), 'MM/DD/YYYY');
    console.log(start, end);
    const dates = [];
    while(start.isSameOrBefore(end)){
        dates.push(start.format('MM/DD/YYYY'));
        start.add(1, 'days');
        console.log(start);
    }
    console.log(dates)
    return dates;
} 

export const generateDateConfig = () => {
    const dateArray = [];
  
    for (let i = 0; i < 7; i++) {
      const currentDate = moment().add(i, "days");
  
      dateArray.push({
        date: currentDate.date(), // Extracts only the date (day of the month)
        weekDay: currentDate.format("ddd"), // Extracts short form of weekday (e.g., Fri)
        cdate: currentDate.format("YYYY-MM-DD"), // Full formatted date
      });
    }
  
    return dateArray;
  };