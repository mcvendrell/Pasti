// This is for iOS systems only, and will attach a datepicker to a textfield
// When the passed textfield is clicked, this function will launch a modal window
// with a datepicker to the user, and will get the resulting date in a proper format
function setupPickerTextField(textField, pickerType, data) {
	//textField.editable = false;
	// To put an image button to distinct this field, uncomment.
	// textField.rightButton = Ti.UI.createButton({
		// style: Ti.UI.iPhone.SystemButton.DISCLOSURE,
		// transform: Ti.UI.create2DMatrix().rotate(90)
	// });
	// textField.rightButtonMode = Ti.UI.INPUT_BUTTONMODE_ALWAYS;

	textField.addEventListener('focus', function(e) {
		e.source.blur();
		require('semiModalPicker').semiModalPicker({
			textField: textField,
			value: textField.value,
			type: pickerType,
			data: data
		}).open({animated:true});
	});
};

// Action for the button
function submitForm() {
	var name = $.txtName.value;
	var days = $.txtDays.value;
	var start = $.txtStart.value;
	
	// All fields must be filled
    if (name == '' || days == '' || start == '' ) {
        alert(L("fill_all_fields"));
    } else {
    	// Refresh the data on the listPills view
    	var Alloy = require('alloy');
    	var db = Ti.Database.open(Alloy.Globals.dbname);
    	db.execute("INSERT INTO pills (name, first_take, interval) VALUES (?,?,?)", name, start, days);
    	
    	// Refresh the main screen with the new data
    	Alloy.Globals.refreshPills();
    	
		if (OS_IOS) {
			// on iOS we are on a navBar
	    	$.win.navBar.close($.win);
		} else {
			// On Android we only opened a new window, just close it
			$.win.close();
		}
    };
};

// Add picker function to the date textfield on iOS
if (OS_IOS) {
	setupPickerTextField($.txtStart, Ti.UI.PICKER_TYPE_DATE);
}