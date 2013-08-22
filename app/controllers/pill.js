var diasDeSalto = 1;

// Action when button back is clicked (Android only)
function goBack() {
	// Close this window
	$.winPill.close();
}

function doClick1(e) {  
    alert("Restando!");
}

function doClick2(e) {  
    alert("Sumando!");
}

function substractDays(e) {  
    diasDeSalto -= 1;
    if (diasDeSalto == 0) {
    	diasDeSalto = 1;
    }
	$.days.text = diasDeSalto;
}

function addDays(e) {  
    diasDeSalto += 1;
    if (diasDeSalto > 31) {
    	diasDeSalto = 31;
    }
	$.days.text = diasDeSalto;
}

$.days.text = diasDeSalto;
//$.winPill.open();
