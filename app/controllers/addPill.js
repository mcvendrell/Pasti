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
// When closing the window remove the listeners
function closeCheck(e) {
	// Remove the event for this window, once it is not needed
	if (OS_ANDROID){
        $.win.removeEventListener('android:back', closeWindowByBackButton);
	}
}

// ====================================================
// Event to close by code the window. We need to do this way so we can remove the event on window close
function closeWindowByBackButton(e) {
	Alloy.Globals.navBar.close($.win);
}
// Add detection of back button for Android
// We need to close manually the window to avoid the back button
// to close all the program (because our controller is creating all
// the new windows without especifying win.navBarHidden, in order to allow
// the Android Activity to work properly)
// NOTE: manually detecting the back button press overrides its behavior, so nothing happens
$.win.addEventListener('android:back', closeWindowByBackButton);

// ====================================================
// Add picker function to the date textfield on iOS
if (OS_IOS) {
	setupPickerTextField($.txtStart, Ti.UI.PICKER_TYPE_DATE);
}
