/*
 * We have a database with all our pills and the data we started to take it
 * Also the number of days between intakes
 * We only need to calculate the days between the first intake and today to
 * know if today is a day for intake or not, for each pill
 */

// Create a NavigationController which will drive our application
//var NavigationController = require('navigator');
//var navController = new NavigationController();

/*
// Add the add button for Android (if possible)
if (OS_ANDROID) {
    $.index.addEventListener('focus', function() {
        if ($.index.activity) {
            var activity = $.index.activity;
             
            // Menu
            activity.invalidateOptionsMenu();
            activity.onCreateOptionsMenu = function(e) {
                var menu = e.menu;
                var menuItem1 = menu.add({
                    title: '+',
                    showAsAction: Ti.Android.SHOW_AS_ACTION_NEVER
                });
                menuItem1.addEventListener('click', openAddItem);
            };
             
            // Action Bar
            if (Alloy.Globals.Android.Api >= 11 && activity.actionBar) {      
                activity.actionBar.title = L('your_pills');
            }            
        }   
    });
}
*/
/*
// Add the stuff for iOS:
// - add a reference for the navBar for use in other controllers
// - add button for iOS
if (OS_IOS) {
	// Save a reference to the navBar, we will need it in many controllers 
	Alloy.Globals.navBar = $.navBar;
	
    // Create the iOS button with the proper style
    var btnAdd = Ti.UI.createButton({
		systemButton: Ti.UI.iPhone.SystemButton.ADD
	});
	
	// Add the action to the button
	btnAdd.addEventListener('click', function()
	{
		// Get the add pill controller
		var winAddPill = Alloy.createController('addPill').getView();
		// Open the new view in the nav bar
		$.navBar.open(winAddPill, {animated: true});
		//navController.open(winAddPill);
	});
	
	// Add the button to the nav bar
	$.pillsList.setRightNavButton(btnAdd);
}

$.index.open();
//navController.open($.pillsList);
*/

// Use our own navigator for iOS and Android, in order to use, for iOS, the
// native NavigationGroup, and for Android, a custom Navigation controller
var ui = require('navigation');
var nav = ui.createNavigatorGroup();

Alloy.Globals.navBar = nav;


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
		borderRadius: 25
	});
	var btnAdd = Ti.UI.createButton({
		title: "+"
	});
}
// Attach buttons to navBar
nav.setLeftButton($.pillsList, btnInfo);
nav.setRightButton($.pillsList, btnAdd);

// Add the action to the buttons
btnInfo.addEventListener('click', function()
{
	// Show the info
	alert(L("general_info"));
});
btnAdd.addEventListener('click', function()
{
	// Get the add pill controller
	var winAddPill = Alloy.createController('addPill').getView();
	// Open the new view in the nav bar
	nav.open(winAddPill, {animated: true});
});

nav.open($.pillsList);