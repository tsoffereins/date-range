(function(root)
{
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

		if (start >= end)
		{
			throw new Error('End date must be bigger then start date.')
		}

		this.start = Object.freeze(start);

		this.end = Object.freeze(end);
	}

	DateRange.prototype = Object.create(null);

	/**
	 * Convert the DateRange object to one without time.
	 * 
	 * @return void
	 */
	DateRange.prototype.timeless = function()
	{
		var start = new Date(
			this.start.getFullYear(),
			this.start.getMonth(),
			this.start.getDate()
		);

		var end = new Date(
			this.end.getFullYear(),
			this.end.getMonth(),
			this.end.getDate()
		);

		if (start >= end)
		{
			throw new Error('Can\'t convert to a timeless DateRange when start and end are on the same date.');
		}

		return new DateRange(start, end);
	};

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
	 * Get the number of whole seconds in the range.
	 * 
	 * @return number
	 */
	DateRange.prototype.getSeconds = function()
	{
		return Math.floor(this.getTime() / 1000);
	};

	/**
	 * Get the number of whole minutes in the range.
	 * 
	 * @return number
	 */
	DateRange.prototype.getMinutes = function()
	{
		return Math.floor(this.getSeconds() / 60);
	};

	/**
	 * Get the number of whole hours in the range.
	 * 
	 * @return number
	 */
	DateRange.prototype.getHours = function()
	{
		return Math.floor(this.getMinutes() / 60);
	};

	/**
	 * Get the number of whole days in the range.
	 * 
	 * @return number
	 */
	DateRange.prototype.getDays = function()
	{
		return Math.floor(this.getHours() / 24);
	};

	/**
	 * Get the number of whole weeks in the range.
	 * 
	 * @return number
	 */
	DateRange.prototype.getWeeks = function()
	{
		return Math.floor(this.getDays() / 7);
	};

	/**
	 * Get the number of whole years in the range.
	 * 
	 * @return number
	 */
	DateRange.prototype.getYears = function()
	{
		return Math.floor(this.getWeeks() / 52);
	};

	/**
	 * Get all dates in the range as timeless dates.
	 * 
	 * @return array
	 */
	DateRange.prototype.getDates = function()
	{
		var timeless = this.timeless();

		var n_days = timeless.getDays() + 1;

		var day_in_time = 1000 * 60 * 60 * 24;

		var dates = [];

		for (var i = 0; i < n_days; i++)
		{
			var time = timeless.start.getTime() + (day_in_time * i);

			var date = new Date();

			date.setTime(time);

			dates.push(date);
		}

		return dates;
	};

	var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

	days.forEach(function(day, index)
	{
		/**
		 * Get the dates in the range that are a [day].
		 * 
		 * @return array
		 */
		DateRange.prototype['get' + day + 's'] = function()
		{
			return this.getDates().filter(function(date)
			{
				return date.getDay() === index;
			});
		};

		/**
		 * Count the dates in the range that are a [day].
		 * 
		 * @return array
		 */
		DateRange.prototype['count' + day + 's'] = function()
		{
			return this['get' + day + 's']().length;
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
			return date.start >= this.start && date.end <= this.end;
		}
		else
		{
			return isValidDate(date) && date >= this.start && date <= this.end;			
		}
	};

	/**
	 * Get the index of the date in the range.
	 * 
	 * @param  Date  value
	 * @return number
	 */
	DateRange.prototype.indexOf = function(date)
	{
		if ( ! isValidDate(date)) return -1;

		var dates = this.getDates();

		for (var i = 0; i < dates.length; i++)
		{
			if (dates[i] >= date && dates[i] <= date)
			{
				return i;
			}
		}

		return -1;
	};

	/**
	 * Get the intersection between this and another DateRange.
	 * 
	 * @param  DateRange  range
	 * @return DateRange|boolean
	 */
	DateRange.prototype.intersection = function(range)
	{
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
		return range.start <= this.end && range.end >= this.start;
	};

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

	module.exports = DateRange;
})(this);