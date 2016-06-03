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
});

describe('DateRange@timeless', function()
{
	it('should return a DateRange with time to 00:00:00.', function()
	{
		var start = new Date(2015, 0, 1, 6, 12, 34);

		var end = new Date(2016, 0, 1, 23, 59, 59);

		var range = new DateRange(start, end);

		var timeless = range.timeless();

		expect(timeless instanceof DateRange).toBe(true);

		expect(timeless.start.getSeconds()).toBe(0);
		expect(timeless.start.getMinutes()).toBe(0);
		expect(timeless.start.getHours()).toBe(0);

		expect(timeless.end.getSeconds()).toBe(0);
		expect(timeless.end.getMinutes()).toBe(0);
		expect(timeless.end.getHours()).toBe(0);
	});

	it('should throw when start and end are on the same date.', function()
	{
		var start = new Date(2015, 0, 1, 6, 12, 34);

		var end = new Date(2015, 0, 1, 23, 59, 59);

		var range = new DateRange(start, end);

		expect(function()
		{
			range.timeless();
		}).toThrow();
	});
});

describe('DateRange@getTime', function()
{
	it('should return the miliseconds between start and end dates.', function()
	{
		var start = new Date(2015, 0, 1, 6, 12, 34);

		var end = new Date(2015, 1, 1, 23, 59, 59);

		var range = new DateRange(start, end);

		expect(range.getTime()).toBe(2742445000);
	});
});

describe('DateRange@getSeconds', function()
{
	it('should return the seconds between start and end dates.', function()
	{
		var start = new Date(2015, 0, 1, 6, 12, 23);

		var end = new Date(2015, 0, 1, 6, 12, 34);

		var range = new DateRange(start, end);

		expect(range.getSeconds()).toBe(11);
	});
});

describe('DateRange@getMinutes', function()
{
	it('should return the seconds between start and end dates.', function()
	{
		var start = new Date(2015, 0, 1, 6, 12, 34);

		var end = new Date(2015, 0, 1, 6, 59, 59);

		var range = new DateRange(start, end);

		expect(range.getMinutes()).toBe(47);
	});
});

describe('DateRange@getHours', function()
{
	it('should return the seconds between start and end dates.', function()
	{
		var start = new Date(2015, 0, 1, 23, 12, 34);

		var end = new Date(2015, 0, 2, 6, 59, 59);

		var range = new DateRange(start, end);

		expect(range.getHours()).toBe(7);
	});
});

describe('DateRange@getDays', function()
{
	it('should return the days between start and end dates.', function()
	{
		var start = new Date(2015, 0, 1, 6, 12, 34);

		var end = new Date(2015, 1, 1, 23, 59, 59);

		var range = new DateRange(start, end);

		expect(range.getDays()).toBe(31);
	});
});

describe('DateRange@getWeeks', function()
{
	it('should return the weeks between start and end dates.', function()
	{
		var start = new Date(2015, 0, 1, 6, 12, 34);

		var end = new Date(2015, 1, 7, 23, 59, 59);

		var range = new DateRange(start, end);

		expect(range.getWeeks()).toBe(5);
	});
});

describe('DateRange@getYears', function()
{
	it('should return the years between start and end dates.', function()
	{
		var start = new Date(2015, 4, 1, 6, 12, 34);

		var end = new Date(2017, 1, 1, 23, 59, 59);

		var range = new DateRange(start, end);

		expect(range.getYears()).toBe(1);
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

describe('DateRange@countFridays', function()
{
	it('should return the number dates in the range that are a friday.', function()
	{
		var start = new Date(2016, 5, 5);

		var end = new Date(2016, 5, 28);

		var range = new DateRange(start, end);

		expect(range.countFridays()).toBe(3);
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