/*
 * We have a database with all our pills and the data we started to take it
 * Also the number of days between intakes
 * We only need to calculate the days between the first intake and today to
 * know if today is a day for intake or not, for each pill
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
		// Open the new view in the nav bar
		$.navBar.open(winAddPill, {animated : true});
	});
	
	// Add the button to the nav bar
	$.pillsList.setRightNavButton(btnAdd);
}

$.index.open();
