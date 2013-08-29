// Get the args
var args = arguments[0] || {};

var util = require('util');
var firstDay = util.stringToDate(args.first);
var intervalDays = parseInt(args.interval);
var today = new Date();
// This var tell us if we are closing the window because we clicked delete button
// It is used in the close check
var closeByDelete = false;

// Add a the delete button
var btnDel = Ti.UI.createButton({
	id: "btnDelete",
	title: L("delete")
});
Alloy.Globals.navBar.setRightButton($.winPill, btnDel);

// Add the action to the delete button
btnDel.addEventListener('click', function() {
	// Del function will fire auto-refresh event inside
	var db = require('db');
	db.delPill(args.id);
	// Autoclose this win
	closeByDelete = true;
	Alloy.Globals.navBar.close($.winPill);
});

// Add detection of back button, to save actual values (user could change it)
//$.winPill.addEventListener('android:back', function(e) {
//    Ti.API.info("Log: The Android back button was pressed - DO SOMETHING!!!!");
//});

// When closing the window (can be with back button or Delete button), check for 
// new values to save or not (user could change values while consulting)
function closeCheck(e) {
	if (!closeByDelete) {
		var db = require('db');
		var id = parseInt(args.id);
		// Any change detected?
		var changes = false;
		
		Ti.API.info("Exiting by back button. Checking value changes...");
		
		// Check for changes on first date
		if (util.dateToString(firstDay) != (args.first)) {
			var ut = require('util');
			start = ut.dateToString(firstDay);

			Ti.API.info("Updating first_take...");
			db.updatePill(id, "first_take", start, false);
			changes = true;
		}
		// Check for changes on Interval
		if (intervalDays != parseInt(args.interval)) {
			Ti.API.info("Updating interval...");
			db.updatePill(id, "interval", intervalDays, false);
			changes = true;
		}
		// Any change? Then update the tableview
		if (changes){
			Ti.App.fireEvent("app:dbUpdated");
		} else {
			Ti.API.info("No changes.");
		}
	}
	
	Ti.App.removeEventListener('resume', resumeResponse);
}

// Change the first day (from stepper buttons or in the picker directly)
function changeFirstDay(e) {
	if (e.source.id == "btnSubFirst") {
	    firstDay.setDate(firstDay.getDate() - 1);
		$.dtPicker.value = firstDay;
    	refreshInterface();
	} else if (e.source.id == "btnAddFirst") {
	    firstDay.setDate(firstDay.getDate() + 1);
		$.dtPicker.value = firstDay;
    	refreshInterface();
	} else if (e.source.id == "dtPicker") {
		// With Android emulator there is not enough time to update
		// the interface (too slow?), so we must give some time to the 
		// system to get the new data
		if (OS_ANDROID) {
			setTimeout(function(){
				firstDay = e.source.value;
				refreshInterface();
				}, 200);
		} else {
			firstDay = e.source.value;
			refreshInterface();
		}
	}
}

// Change the interval for the next take (from stepper buttons)
function changeInterval(e) {  
	if (e.source.id == "btnSubDay") {
	    intervalDays -= 1;
	    if (intervalDays == 0) {
	    	intervalDays = 1;
	    }
	} else if (e.source.id == "btnAddDay") {
	    intervalDays += 1;
	    if (intervalDays > 31) {
	    	intervalDays = 31;
	    }
	}
	$.days.text = intervalDays;
	refreshInterface();
}

// Change the bgcolor and color of a label, depending if is active or not
function setDayStatus(label, active) {
	label.color = active ? "white" : "black";
	label.backgroundColor = active ? Alloy.Globals.blueColor : Alloy.Globals.greyColor;
}

// Refreshes all the interactive interface. Called at loading and when some parameter changes
function refreshInterface() {
	// Get the days between today and the starting day
	var days = Math.abs(util.dateDiffInDays(today, firstDay));
	
	// Configure the whole week (this will configure the brain vars)
	brain.calculateWeek(firstDay, intervalDays);
	
	//Ti.API.info('Week config: ' + brain.week);
		
	// Is today a take day?
	$.isDay.text = (brain.take ? L("is_day") : L("is_not_day"));
	setDayStatus($.isDay, brain.take);
	
	setDayStatus($.Mon, brain.week[1]);
	setDayStatus($.Tue, brain.week[2]);
	setDayStatus($.Wed, brain.week[3]);
	setDayStatus($.Thu, brain.week[4]);
	setDayStatus($.Fri, brain.week[5]);
	setDayStatus($.Sat, brain.week[6]);
	setDayStatus($.Sun, brain.week[7]);
}

// Load the pill data to the UI elements
$.winPill.title = args.name;
$.dtPicker.value = firstDay;
$.days.text = intervalDays;

// Set other fixed values:
$.dtPicker.locale = Titanium.Platform.locale;
// Today
$.todayDate.text = L("today_is") + ': ' + util.formatDate(today, 3);

// Get access to the logic
var Brain = require('pastiBrain').Brain,
	brain = new Brain();

// Configure the rest of the interface
refreshInterface();


function resumeResponse(e) {
	Ti.API.info("RESUMED on pill");
	//Ti.App.fireEvent("app:dbUpdated");
	refreshInterface();
}

Titanium.App.addEventListener('resume', resumeResponse);
if(Titanium.Platform.name == 'iPhone OS'){
	// Add the action to the delete button
	//Titanium.App.addEventListener('significanttimechange', function() {
		//Ti.API.info('Day change');
		//Ti.App.fireEvent("app:dbUpdated");
		//refreshInterface();
	//});
}