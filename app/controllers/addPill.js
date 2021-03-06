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
	// Get the form values
	var name = $.txtName.value;
	var days = $.txtDays.value;
	if (OS_IOS) {
		var start = $.txtStart.value;
	} else {
		var start = $.pikStart.value;
		if (start != '') {
			var ut = require('util');
			start = ut.dateToString(start);
		}
	}
	
	// All fields must be filled
    if (name == '' || days == '' || start == '' ) {
        alert(L("fill_all_fields"));
    } else {
    	// Save data
		var db = require('db');
		// Add function will fire auto-refresh event inside
		db.addPill(name, start, parseInt(days));			
    	
    	Alloy.Globals.navBar.close($.win);
    };
};

// ====================================================
// Add picker function to the date textfield on iOS
if (OS_IOS) {
	setupPickerTextField($.txtStart, Ti.UI.PICKER_TYPE_DATE);
}
