exports.createNavigatorGroup = function() {

    var me = {};

    if (OS_IOS) {   
        // Create the navigator, create a window for the navigator and add the navigator to the window.
        var navGroup = Titanium.UI.iPhone.createNavigationGroup();  
        var winNav = Titanium.UI.createWindow();
        winNav.add(navGroup);

        me.open = function(win) {
            if (!navGroup.window) {
                // First time call, add the window to the navigator and open the navigator window
                navGroup.window = win;
                winNav.open();
            } else {
                // All other calls, open the window through the navigator
                navGroup.open(win);
            }
        };

        me.setRightButton = function(win, button) {
            win.setRightNavButton(button);
        };

        me.setLeftButton = function(win, button) {
            win.setLeftNavButton(button);
        };

        me.close = function(win) {
            if (navGroup.window) {
                // Close the window on this nav
                navGroup.close(win);
            }
        };

    } else {
        var navViews = []; // A stack of navigation bars
        var navView;

        function pushNavBar() {
            navView = Ti.UI.createView({
                top: 0,
                height: 44,
                backgroundColor: '#BBB'
            });
            navViews.push(navView);
        };
        
        function popNavBar() {
            navViews.pop();
            navView = navViews[navViews.length - 1];
        };

        // Make sure we always have a navView available to prepare
        pushNavBar();

        me.open = function(win) {
            navView.add(Ti.UI.createLabel({
                text: win.title,
                color: 'black'
            }));
			
			/*
			// For second or more views, add a back button
            if (navViews.length >= 2) {
                var button = Ti.UI.createButton({
                    //title: '< ' + navViews[navViews.length - 2].win.title
                    title: '< ' + L('back')
                });
                me.addLeftButton(win, button);
                
                button.addEventListener('click', function() {
                    popNavBar();
                    win.close();
                });
            }
            */

            navView.win = win;
            win.add(navView);

            win.navBarHidden = true;
            win.open();

			// Prepare for the next window
            pushNavBar();
        };

        me.close = function(win) {
            if (navViews.length > 1) {
                // Close the window on this nav
                popNavBar();
                win.close();
            }
        };

		// Helper to add a left button
        me.addLeftButton = function(win, button) {
            button.top = 5;
            button.left = 5;
            navView.add(button);
        };
 
        me.setRightButton = function(win, button) {
            button.top = 5;
            button.right = 5;
            navView.add(button);
        };
    };

    return me;
};