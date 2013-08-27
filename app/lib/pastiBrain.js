/*
 * This module exposes all the logic to calculate:
 * - From a passed day and interval, the current week with the specific days to take the pill
 * - From a passed total days (from a date) and a total interval, if is a day to take the pill or not
 * - Also has vars to know the state for the current week and day 
 */

function Brain() {
	// Holds the seven week days (1 to 7, spanish format) with bool value
	this.week = new Array(8);
	// Represent, for the current day, if is a day to take the pill
	this.take = false;
}

/*
 * This function returns the modulus between the passed total days (from a date) 
 * and the interval the user wants to check. If the result is 0, then the interval
 * is complete (so, in this case, it represents that the user must take the pill)
 */
Brain.prototype.todayTake = function(days, interval) {
	return (Math.abs(days) % interval == 0 ? true : false);
};

/*
 * This function will use the configured pill data and will calculate the full week, marking
 * the days that the user must take the pill. The process will be:
 * 1. Calculate the spent days since the first take
 * 2. Get the current weekday
 * 3. Calculate for the current day if is a take day
 * 4. Configure the current week
 */
Brain.prototype.calculateWeek = function(firstDay, interval) {
	// For begginers like me: the "that" var is necessary to grant access to
	// "this" for the inner functions, because lack of binding.
	// It took me some hours to find the problem why I can't use "this"
	// on the inner function configureCurrentWeek()
	// For clarification, see this article: 
	// http://alistapart.com/article/getoutbindingsituations
	var that = this;
	var today = new Date();
	// Get the days between today and the starting day
	var util = require('util');
	var numDays = Math.abs(util.dateDiffInDays(today, firstDay));
	
	// Get the current weekday (Sun will be 7, not 0, spanish format)
	var currentWeekday = today.getDay();
	if (currentWeekday == 0) { currentWeekday = 7; }
	
	/*
	 * This function will configure our week array for each weekday. The week have 7 days
	 * and will be in spanish format (starting week on Monday, not on Sunday). The process will be:
	 * 1. From the current spent days, find out the spent days for monday on this week.
	 * 2. Save for monday if is a take day. 
	 * 3. From it, just calculate each next week day
	 */
	function configureCurrentWeek(numDays, currentWeekday, interval) {
		// Get the days between today and the monday.
		// For example, if today is Wed (value 3), and have passed 10 days, in Mon only
		// 8 days have passed, so 10 - (3 - 1) = 8
		var numDaysOnMonday = numDays - (currentWeekday - 1);

		// From here, configure each weekday on our week (remember, 1=Monday, 7=Sunday)
		for (var i=1; i <= 7; i++) {
    		that.week[i] = that.todayTake(numDaysOnMonday + (i - 1), interval);
	    }
	};
	
	// Calculate for the current day if is a take day
	this.take = this.todayTake(numDays, interval);
	
	// Configure the current week
	configureCurrentWeek(numDays, currentWeekday, interval);
};

exports.Brain = Brain;