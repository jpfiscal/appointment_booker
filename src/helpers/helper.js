function convertToDate(rawDate){
    if (rawDate){
        //create date object
        const date = new Date(rawDate);
        //Extract year, month and date
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        //format date to YYYY-MM-DD
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
    } else {
        return undefined;
    }
    
}

export { convertToDate };