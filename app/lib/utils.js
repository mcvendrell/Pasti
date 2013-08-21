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

