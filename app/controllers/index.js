/*
 * We have a database with all our pills and the data we started to take it
 * Also the number of days between intakes
 * We only need to calculate the days between the first intake and today to
 * know if today is a day for intake or not, for each pill
 */

// Create a NavigationController which will drive our application
//var NavigationController = require('navigator');
//var navController = new NavigationController();

// Action when button add is clicked
function clickAddItem() {
	alert('Add Item');
}

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

// Add the add button for iOS
if (OS_IOS) {
    // Create the iOS button with the proper style
    var btnAdd = Ti.UI.createButton({
		systemButton: Ti.UI.iPhone.SystemButton.ADD
	});
	
	// Add the action to the button
	btnAdd.addEventListener('click', function()
	{
		// Get the add pill controller
		var winAddPill = Alloy.createController('addPill').getView();
		// Save a reference to the navBar, we will need it to autoclose the new window on add button click 
		winAddPill.navBar = $.navBar;
		//winAddPill.navBar = navController;
		// Open the new view in the nav bar
		$.navBar.open(winAddPill, {animated : true});
		//navController.open(winAddPill);
	});
	
	// Add the button to the nav bar
	$.pillsList.setRightNavButton(btnAdd);
}

$.index.open();
//navController.open($.pillsList);
