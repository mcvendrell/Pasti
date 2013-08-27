// Read data from the db and put it on the tableView
function populateData() {
	var db = require('db');
	var data = db.getPills();			
	$.table.setData(data);
}

// Add a new custom event to refresh the data on the table
// Will be triggered by any other controller just calling Ti.App.fireEvent
Ti.App.addEventListener('dbUpdated', populateData);

// Add a click event to the rows
$.table.addEventListener('click', function(e) {
	// Get the pill controller
    //Ti.API.info('Row: ' + e.rowData.id);

	var winPill = Alloy.createController('pill', e.rowData).getView();
	// Open the new view in the nav bar
	Alloy.Globals.navBar.open(winPill, {animated: true});
});

// On load, make an initial query
populateData();
