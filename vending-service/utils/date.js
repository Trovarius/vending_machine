module.exports = {
    AddDays(date, numDays){
        var result = new Date(date);
        result.setDate(result.getDate() + numDays);
        return result;
    }
}