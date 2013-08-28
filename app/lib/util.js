exports.stringToDate = function(dateString) {
	dateString = dateString || '';
	var matches = /(\d+)\/(\d+)\/(\d+)/.exec(dateString);
	if (matches && matches.length >= 4) {
		return new Date(matches[3], matches[1] - 1, matches[2]);	
	}
	return new Date();
};

exports.dateToString = function(date) {
	return (date.getMonth()+1) + '/' + date.getDate() + '/' + date.getFullYear();
};

exports.formatDate = function(myDate, model, sep) {
	// If not separator passed, default is "/"
	sep = (typeof sep !== 'undefined' ? sep : "/");

	// Weekdays and days in words
	var d_names = new Array(L("Sunday"), L("Monday"), L("Tuesday"), L("Wednesday"), L("Thursday"), L("Friday"), L("Saturday"));
	var d_short_names = new Array(L("Sun"), L("Mon"), L("Tue"), L("Wed"), L("Thu"), L("Fri"), L("Sat"));
	var m_names = new Array(L("January"), L("February"), L("March"), L("April"), L("May"), L("June"), 
		L("July"), L("August"), L("September"), L("October"), L("November"), L("December"));
	
    var weekday = myDate.getDay();
    var day = myDate.getDate();
    var month = myDate.getMonth() + 1;
    var year = myDate.getFullYear();
    var hours = myDate.getHours();
    var mins = myDate.getMinutes();
    var secs = myDate.getSeconds();

	if (hours < 10) { hours = "0" + hours; }; 
    if (mins < 10) { mins = "0" + mins; };
    if (secs < 10) { secs = "0" + secs; };
	
	var retval = "";
	switch (model) {
		case 1:	// standard dd/mm/yyyy
			retval = day + sep + month + sep + year;
			break;
		case 2: // standard dd/mm/yyyy hh:mi
			retval = day + sep + month + sep + year + " " + hours + ":" + mins;
			break;
		case 3: // Weekd (shorten), dd mmmm
			retval = d_short_names[weekday] + ", " + day + " " + m_names[month-1];
			break;
		case 4: // Weekd, dd mmmm
			retval = d_names[weekday] + ", " + day + " " + m_names[month-1];
			break;
		case 5: // Weekd (shorten), dd mmmm yyyy
			retval = d_short_names[weekday] + ", " + day + " " + m_names[month-1] + " " + year;
			break;
		case 6: // Weekd, dd mmmm yyyy
			retval = d_names[weekday] + ", " + day + " " + m_names[month-1] + " " + year;
			break;
	}
	
	return retval;
};

// Get difference between two dates. a and b are javascript Date objects
exports.dateDiffInDays = function(date1, date2) {
	// To transform milliseconds in days
	var _MS_PER_DAY = 1000 * 60 * 60 * 24;

	// Discard the time and time-zone information
	var utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
	var utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());

	return Math.floor((utc2 - utc1) / _MS_PER_DAY);
};