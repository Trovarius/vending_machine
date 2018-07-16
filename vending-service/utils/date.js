module.exports = {
    AddDays(date, numDays){
        let result = new Date(date);
        result.setDate(result.getDate() + numDays);
        return result;
    }
}