var DateRange = require('../../src/date-range');

describe('DateRange@construct', function()
{
	it('should throw without parameters', function()
	{
		expect(function()
		{
			new DateRange();
		}).toThrow();
	});

	it('should throw without valid date parameters.', function()
	{
		expect(function()
		{
			new DateRange(new Date([]));
		}).toThrow();
	});

	it('should throw when start date is bigger then end date.', function()
	{
		expect(function()
		{
			new DateRange(new Date(2016, 0, 1), new Date(2015, 0, 1));
		}).toThrow();
	});

	it('should throw when start date is equal to end date.', function()
	{
		expect(function()
		{
			new DateRange(new Date(2016, 0, 1), new Date(2016, 0, 1));
		}).toThrow();
	});

	it('should ignore time.', function()
	{
		var start = new Date(2015, 0, 1, 7, 8, 9);

		var end = new Date(2016, 4, 1, 12, 34, 56);

		var range = new DateRange(start, end);

		expect(range.start.getSeconds()).toBe(0);
		expect(range.start.getMinutes()).toBe(0);
		expect(range.start.getHours()).toBe(0);

		expect(range.end.getSeconds()).toBe(0);
		expect(range.end.getMinutes()).toBe(0);
		expect(range.end.getHours()).toBe(0);
	});

	it('should throw when start and end are on the same date after removing time.', function()
	{
		var start = new Date(2015, 0, 1, 7, 8, 956);

		var end = new Date(2015, 0, 1, 12, 34, 56);

		expect(function()
		{
			new DateRange(start, end);
		}).toThrow();
	});
});

describe('DateRange@getTime', function()
{
	it('should return the miliseconds between start and end dates.', function()
	{
		var start = new Date(2015, 0, 1);

		var end = new Date(2015, 1, 1);

		var range = new DateRange(start, end);

		expect(range.getTime()).toBe(2678400000);
	});
});

describe('DateRange@countDays', function()
{
	it('should return the number days that are in the range.', function()
	{
		var start = new Date(2015, 0, 1);

		var end = new Date(2015, 1, 1);

		var range = new DateRange(start, end);

		expect(range.countDays()).toBe(32);
	});
});

describe('DateRange@getYears', function()
{
	var start = new Date(2005, 4, 1);

	var end = new Date(2017, 1, 1);

	var range = new DateRange(start, end);

	it('should return an array.', function()
	{
		expect(range.getYears() instanceof Array).toBe(true);
	});

	it('should return all years in the range.', function()
	{
		expect(range.getYears().length).toBe(13);
		expect(range.getYears()[0]).toBe(2005);
		expect(range.getYears()[5]).toBe(2010);
		expect(range.getYears()[12]).toBe(2017);
	});
});

describe('DateRange@getDates', function()
{
	it('should return all dates in the range.', function()
	{
		var start = new Date(2016, 5, 1);

		var end = new Date(2016, 5, 7);

		var range = new DateRange(start, end);

		var dates = range.getDates();

		expect(dates instanceof Array).toBe(true);
		expect(dates.length).toBe(7);

		expect(dates[0].getDate()).toBe(1);
		expect(dates[4].getDate()).toBe(5);
		expect(dates[6].getDate()).toBe(7);
	});
});

describe('DateRange@getSundays', function()
{
	it('should return the dates in the range that are a sunday.', function()
	{
		var start = new Date(2016, 5, 5);

		var end = new Date(2016, 5, 28);

		var range = new DateRange(start, end);

		var sundays = range.getSundays();

		expect(sundays instanceof Array).toBe(true);
		expect(sundays.length).toBe(4);

		expect(sundays[0].getDate()).toBe(5);
		expect(sundays[0].getMonth()).toBe(5);

		expect(sundays[3].getDate()).toBe(26);
		expect(sundays[3].getMonth()).toBe(5);
	});
});

describe('DateRange@getFridays', function()
{
	it('should return the dates in the range that are a friday.', function()
	{
		var start = new Date(2016, 5, 5);

		var end = new Date(2016, 5, 28);

		var range = new DateRange(start, end);

		var sundays = range.getFridays();

		expect(sundays instanceof Array).toBe(true);
		expect(sundays.length).toBe(3);

		expect(sundays[0].getDate()).toBe(10);
		expect(sundays[0].getMonth()).toBe(5);

		expect(sundays[2].getDate()).toBe(24);
		expect(sundays[2].getMonth()).toBe(5);
	});
});

describe('DateRange@contains', function()
{
	it('should return true if a date is in the range.', function()
	{
		var start = new Date(2016, 5, 5);

		var end = new Date(2016, 5, 28);

		var range = new DateRange(start, end);
		
		var date = new Date(2016, 5, 15);

		expect(range.contains(date)).toBe(true);
	});

	it('should return true if a DateRange is fully in the range.', function()
	{
		var range1 = new DateRange(
			new Date(2016, 0, 1), new Date(2016, 11, 28)
		);

		var range2 = new DateRange(
			new Date(2016, 3, 23), new Date(2016, 9, 13)
		);

		expect(range1.contains(range2)).toBe(true);
	});

	it('should return false if a DateRange is not fully in the range.', function()
	{
		var range1 = new DateRange(
			new Date(2016, 0, 1), new Date(2016, 5, 28)
		);

		var range2 = new DateRange(
			new Date(2016, 3, 23), new Date(2016, 9, 13)
		);

		expect(range1.contains(range2)).toBe(false);
	});

	it('should return false if a not date is in the range.', function()
	{
		var start = new Date(2016, 5, 5);

		var end = new Date(2016, 5, 28);

		var range = new DateRange(start, end);

		var date = new Date(2016, 6, 20);

		expect(range.contains(date)).toBe(false);
	});

	it('should return false when passed an invalid date.', function()
	{
		var start = new Date(2016, 5, 5);

		var end = new Date(2016, 5, 28);

		var range = new DateRange(start, end);

		expect(range.contains(null)).toBe(false);
		expect(range.contains(new Date(''))).toBe(false);
	});
});

describe('DateRange@indexOf', function()
{
	it('should return the index of a date in the range.', function()
	{
		var start = new Date(2016, 5, 5);

		var end = new Date(2016, 5, 28);

		var range = new DateRange(start, end);
		
		var date = new Date(2016, 5, 15);

		expect(range.indexOf(date)).toBe(10);
	});

	it('should return -1 when not found in the range.', function()
	{
		var start = new Date(2016, 5, 5);

		var end = new Date(2016, 5, 28);

		var range = new DateRange(start, end);

		var date = new Date(2016, 6, 20);

		expect(range.indexOf(date)).toBe(-1);
	});

	it('should return -1 when passed an invalid date.', function()
	{
		var start = new Date(2016, 5, 5);

		var end = new Date(2016, 5, 28);

		var range = new DateRange(start, end);

		expect(range.indexOf('')).toBe(-1);
	});
});

describe('DateRange@intersection', function()
{
	it('should return a DateRange over the intersecting dates.', function()
	{
		var range1 = new DateRange(
			new Date(2016, 0, 1), new Date(2016, 5, 28)
		);

		var range2 = new DateRange(
			new Date(2016, 3, 23), new Date(2016, 9, 13)
		);

		var intersect = range1.intersection(range2);

		expect(intersect instanceof DateRange).toBe(true);

		expect(intersect.start.getDate()).toBe(23);
		expect(intersect.start.getMonth()).toBe(3);

		expect(intersect.end.getDate()).toBe(28);
		expect(intersect.end.getMonth()).toBe(5);
	});

	it('should return false if they do not intersect', function()
	{
		var range1 = new DateRange(
			new Date(2016, 0, 1), new Date(2016, 5, 28)
		);

		var range2 = new DateRange(
			new Date(2016, 6, 23), new Date(2016, 9, 13)
		);

		expect(range1.intersection(range2)).toBe(false);
	});
});

describe('DateRange@doesIntersect', function()
{
	it('should return true if a range intersects a range.', function()
	{
		var range1 = new DateRange(
			new Date(2016, 0, 1), new Date(2016, 5, 28)
		);

		var range2 = new DateRange(
			new Date(2016, 3, 23), new Date(2016, 9, 13)
		);

		expect(range1.doesIntersect(range2)).toBe(true);
	});

	it('should return false if they do not intersect', function()
	{
		var range1 = new DateRange(
			new Date(2016, 0, 1), new Date(2016, 5, 28)
		);

		var range2 = new DateRange(
			new Date(2016, 6, 23), new Date(2016, 9, 13)
		);

		expect(range1.doesIntersect(range2)).toBe(false);
	});
});

describe('DateRange@getLeapYears', function()
{
	it('should return a list of years.', function()
	{
		var range = new DateRange(
			new Date(1900, 0, 1), new Date(2016, 5, 28)
		);

		expect(range.getLeapYears() instanceof Array).toBe(true);
	});

	it('should return years that are devidable by 4.', function()
	{
		var range = new DateRange(
			new Date(1900, 0, 1), new Date(2016, 5, 28)
		);

		var leapYears = range.getLeapYears();

		expect(leapYears.indexOf(1996)).not.toBe(-1);
		expect(leapYears.indexOf(2004)).not.toBe(-1);
		expect(leapYears.indexOf(1956)).not.toBe(-1);
	});

	it('should not return years that are devidable by 100.', function()
	{
		var range = new DateRange(
			new Date(1900, 0, 1), new Date(2016, 5, 28)
		);

		var leapYears = range.getLeapYears();

		expect(leapYears.indexOf(1900)).toBe(-1);
	});

	it('should return years that are devidable by 400.', function()
	{
		var range = new DateRange(
			new Date(1900, 0, 1), new Date(2016, 5, 28)
		);

		var leapYears = range.getLeapYears();

		expect(leapYears.indexOf(2000)).not.toBe(-1);
	});
});

describe('DateRange@getFridayThe13ths', function()
{
	it('should return a list of dates.', function()
	{
		var range = new DateRange(
			new Date(1900, 0, 1), new Date(2016, 5, 28)
		);

		expect(range.getFridayThe13ths() instanceof Array).toBe(true);
	});

	it('should return a list of dates.', function()
	{
		var range = new DateRange(
			new Date(1929, 0, 1), new Date(2016, 5, 28)
		);

		var fridays = range.getFridayThe13ths();

		var first = fridays.shift();

		expect(first.getFullYear()).toBe(1929);
		expect(first.getMonth()).toBe(8);
		expect(first.getDate()).toBe(13);
		
		var last = fridays.pop();

		expect(last.getFullYear()).toBe(2016);
		expect(last.getMonth()).toBe(4);
		expect(last.getDate()).toBe(13);
	});
});