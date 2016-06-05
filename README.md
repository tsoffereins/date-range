# Date range
A JavaScript value object for a date range.

## Installation

###Bower
'bower install date-range'

### NPM
'npm install date-range'

## Usage

### Defining a DateRange
A DateRange is a value object and can be instantiated like any other data type. It requires 2 valid dates.

'''javascript
var range = new DateRange(new Date(1996, 5, 30), new Date(2016, 4, 6));
'''

DateRange does not take time into account and will assign itself dates with 00:00:00. When the first date is bigger than the second date an error will be thrown. This could be usefull for validation.

### Reading data
From a DateRange you can get all kinds of interesting information about the timespan.

'''javascript
// Get the number of miliseconds in the timespan.
console.log(range.getTime()); // logs e.g. 837362400000

// Count the number of days in the timespan.
console.log(range.countDays()); // logs e.g. 5278
'''

It is also possible to list the years or only the leap years in the range.

'''javascript
console.log(range.getYears()); logs [1996, 1997, 1998, ...]

console.log(range.getLeapYears()); logs [1996, 2000, 2004, ...]
'''

For creating calendars it might be usefull to list all dates in a range or only the mondays, thursdays of even all friday-the-13ths.

'''javascript
// List all dates in the range as Date-objects.
console.log(range.getDates()); logs [date, date, date, ...]

// List all dates in the range that are a monday.
console.log(range.getMondays()); logs [date, date, date, ...]

// List all dates in the range that are a saturday.
console.log(range.getSaturdays()); logs [date, date, date, ...]

// List all dates in the range that are a friday-the-13th.
console.log(range.getFridayThe13ths()); logs [date, date, date, ...]
'''

### Performing calculations
A DateRange is perfectly useful for calculation. You can check if a specific date is in the range, at which index, or even if another DateRange is in or intersects with the range.

'''javascript
// Determine if a date is in the range.
var date = new Date(2002, 1, 26);

console.log(range.contains(date)); // logs true

console.log(range.indexOf(date)); // logs 2890

// Determine if a date range is fully in the range.
var range2 = new DateRange(new Date(2015, 0, 3), new Date(2017, 11, 4));

console.log(range.contains(range2)); // logs false

// Determine if a range intersects with the range.
console.log(range.doesIntersect(range2)); // logs true
'''

If you are interested in the intersecting range of 2 date ranges you can use intersection. This returns a new DateRange over the intersecting dates. 
'''javascript
console.log(range.intersection(range2); // logs DateRange
'''

## Support

You can reach me via Twitter: @tsoffereins

Please file issues here at GitHub.
