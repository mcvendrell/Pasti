// Read data from the db and put it on the tableView
function populateData() {
	var db = require('db');
	//var data = db.getPills();
	var data = db.getPillsWithStatus();
	$.table.setData(data);
}

// ====================================================
// Event to detect when the app comes from pause (backgrounded). Maybe the day has changed since 
// the last activation, check it and refresh on this case
function resumeResponseList(e) {
	Ti.API.info("RESUMED on list");
	current = util.dateToString(new Date());
	if (today != current) {
		today = current;
		Ti.App.fireEvent("app:dbUpdated");
	}
}
// Add the listener to the system
// Close this window will finish the app, but in other case we must manually remove this listener "onClose"
if (OS_ANDROID) {
	Ti.Android.currentActivity.addEventListener('resume', resumeResponseList);
} else {
	Ti.App.addEventListener('resume', resumeResponseList);
}

// ====================================================
// Add a new custom event to refresh the data on the table
// Will be triggered by any other controller just calling Ti.App.fireEvent
Ti.App.addEventListener('app:dbUpdated', populateData);

// ====================================================
// Add a click event to the rows
$.table.addEventListener('click', function(e) {
    //Ti.API.info('Row: ' + e.rowData.id);

	// Get the pill controller and pass the row data as args
	var winPill = Alloy.createController('pill', e.rowData).getView();
	// Open the new view in the nav bar
	Alloy.Globals.navBar.open(winPill, {animated: true});
});

// ====================================================
// On load, make an initial query
populateData();

// Save the current date, to check later on resume event
var util = require('util');
var today = util.dateToString(new Date());
