/*
 * We have a database with all our pills and the data we started to take it
 * Also the number of days between intakes
 * We only need to calculate the days between the first intake and today to
 * know if today is a day for intake or not, for each pill
 */

// Use our own navigator for iOS and Android, in order to use, for iOS, the
// native NavigationGroup, and for Android, a custom Navigation controller
var ui = require('navigation');
var nav = ui.createNavigatorGroup();

Alloy.Globals.navBar = nav;

// ====================================================
if (OS_IOS) {
	// Create the iOS buttons with the proper style
	var btnInfo = Ti.UI.createButton({
		systemButton: Ti.UI.iPhone.SystemButton.INFO_DARK
	});
	var btnAdd = Ti.UI.createButton({
		systemButton: Ti.UI.iPhone.SystemButton.ADD
	});
} else {
	// Create the Android buttons with the proper text
	var btnInfo = Ti.UI.createButton({
		title: "i",
		width: 30,
		height: 30,
		color: 'white',
		borderRadius: 15,
	    borderWidth: 0,
	    borderColor: '#FFF',
	    backgroundImage: 'none',
	    backgroundGradient: {
	        type: 'linear',
	        colors: ['#AAA', '#777']
	    }
	});
	var btnAdd = Ti.UI.createButton({
		width: 40,
		title: "+"
	});
}

// Add the actions to the buttons
btnInfo.addEventListener('click', function() {
	// Show the info
	//alert(L("general_info"));
	var dialog = Ti.UI.createAlertDialog({
		message: L("general_info"),
		ok: "Ok",
		title: "Info"
	}).show();
});
btnAdd.addEventListener('click', function() {
	// Get the add pill controller
	var winAddPill = Alloy.createController('addPill').getView();
	// Open the new view in the nav bar
	nav.open(winAddPill, {animated: true});
});

// Attach buttons to the navBar
nav.setLeftButton($.pillsList, btnInfo);
nav.setRightButton($.pillsList, btnAdd);

// ====================================================
// Open the navBar
nav.open($.pillsList);
