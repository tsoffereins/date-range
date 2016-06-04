(function(root)
{
	/**
	 * The number of miliseconds a day lasts.
	 * 
	 * @type number
	 */
	var dayTime = 1000 * 60 * 60 * 24;

	/**
	 * Construct a new DateRange.
	 *
	 * @param  Date  start
	 * @param  Date  end
	 * @return void
	 */
	var DateRange = root.DateRange = function(start, end)
	{		
		if ( ! isValidDate(start) || ! isValidDate(end))
		{
			throw new Error('Arguments should be valid dates.');
		}

		// We dont want time in our date range, because it will make calculation so much 
		// more inaccurate. Besides, this is a 'date' range, not 'date-time'. This also 
		// creates new dates to prevent references from outside.
		start = cloneDate(start);

		end = cloneDate(end);

		if (start >= end)
		{
			throw new Error('End date must be bigger then start date.');
		}

		this.start = start;

		this.end = end;
	};

	DateRange.prototype = Object.create(null);

	/**
	 * Get the number of miliseconds in the range.
	 * 
	 * @return number
	 */
	DateRange.prototype.getTime = function()
	{
		return this.end.getTime() - this.start.getTime();
	};

	/**
	 * Get the number of days in the range.
	 * 
	 * @return number
	 */
	DateRange.prototype.countDays = function()
	{
		return (this.getTime() / dayTime) + 1;
	};

	/**
	 * Get all years in the range.
	 * 
	 * @return array
	 */
	DateRange.prototype.getYears = function()
	{
		var startYear = this.start.getFullYear();

		var nYears = this.end.getFullYear() - startYear + 1;

		return times(nYears, function(index)
		{
			return startYear + index;
		});
	};

	/**
	 * Get all dates in the range.
	 * 
	 * @return array
	 */
	DateRange.prototype.getDates = function()
	{
		var startTime = this.start.getTime();

		return times(this.countDays(), function(index)
		{
			var date = new Date();

			date.setTime(startTime + (dayTime * index));

			return date;
		});
	};

	/**
	 * All days of the week.
	 * 
	 * @type array
	 */
	var days = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday'
	];

	days.forEach(function(day, index)
	{
		/**
		 * Get the dates in the range that are a [day].
		 * 
		 * @return array
		 */
		DateRange.prototype['get' + day + 's'] = function()
		{
			var nDays = this.countDays();

			var dates = [];

			for (var i = 0; i < nDays;)
			{
				var date = new Date();

				date.setTime(
					this.start.getTime() + (dayTime * i)
				);

				if (( ! dates.length && date.getDay() == index) || dates.length)
				{
					dates.push(date);
				}

				i += (dates.length) > 0 ? 7 : 1;
			}

			return 	dates;
		};
	});

	/**
	 * Determine if a date is in the range.
	 * 
	 * @param  Date|DateRange  date
	 * @return boolean
	 */
	DateRange.prototype.contains = function(date)
	{
		if (date instanceof DateRange)
		{
			return (date.start >= this.start) && (date.end <= this.end);
		}
		else
		{
			return isValidDate(date) && (date >= this.start) && (date <= this.end);
		}
	};

	/**
	 * Get the index of a date in the range.
	 * 
	 * @param  Date  value
	 * @return number
	 */
	DateRange.prototype.indexOf = function(date)
	{
		if ( ! this.contains(date)) return -1;

		return (date.getTime() - this.start.getTime()) / dayTime;
	};

	/**
	 * Get the intersection between this and another DateRange.
	 * 
	 * @param  DateRange  range
	 * @return DateRange|boolean
	 */
	DateRange.prototype.intersection = function(range)
	{
		if ( ! isDateRange(range)) return false;

		var start = max([this.start, range.start]);
		
		var end = min([this.end, range.end]);

		if (start >= end) return false;
		
		return new DateRange(start, end);
	};

	/**
	 * Determine if a range intersects this range.
	 * 
	 * @param  DateRange  range
	 * @return boolean
	 */
	DateRange.prototype.doesIntersect = function(range)
	{
		return isDateRange(range) && (range.start <= this.end) && (range.end >= this.start);
	};

	/**
	 * Get all leap years in the range.
	 * 
	 * @return array
	 */
	DateRange.prototype.getLeapYears = function()
	{
		return this.getYears().filter(function(year)
		{
			return (year % 4 === 0) && ((year % 100 !== 0) || (year % 400 === 0));
		});
	};

	/**
	 * Get all friday the 13ths in the range.
	 * 
	 * @return array
	 */
	DateRange.prototype.getFridayThe13ths = function()
	{
		return this.getFridays().filter(function(date)
		{
			return date.getDate() == 13;
		});
	};

	/**
	 * Clone a date.
	 * 
	 * @param  Date  date
	 * @return Date
	 */
	function cloneDate(date)
	{
		return new Date(
			date.getFullYear(),
			date.getMonth(),
			date.getDate()
		);
	}

	/**
	 * Determine if a value is a valid Date.
	 * 
	 * @param  mixed  value
	 * @return boolean
	 */
	function isValidDate(value)
	{
		return value instanceof Date && value != 'Invalid Date';
	}

	/**
	 * Determine if a value is a DateRange.
	 * 
	 * @param  mixed  value
	 * @return boolean
	 */
	function isDateRange(value)
	{
		return value instanceof DateRange;
	}

	/**
	 * Get the lowest value from a list.
	 * 
	 * @param  number  n
	 * @param  function  predicate
	 * @return array
	 */
	function times(n, predicate)
	{
		var array = [];

		for (var i = 0; i < n; i++)
		{
			array.push(predicate(i));
		}

		return array;
	}

	/**
	 * Get the lowest value from a list.
	 * 
	 * @param  array  values
	 * @return mixed
	 */
	function min(values)
	{
		return values.reduce(function(lowest, value)
		{
			return lowest && value < lowest ? value : lowest;
		});
	}

	/**
	 * Get the highest value from a list.
	 * 
	 * @param  array  values
	 * @return mixed
	 */
	function max(values)
	{
		return values.reduce(function(highest, value)
		{
			return highest && value > highest ? value : highest;
		});
	}

	if (typeof module !== 'undefined')
	{
		module.exports = DateRange;
	}
})(this);