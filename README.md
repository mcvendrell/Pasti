##Personal project PASTI by Manuel Conde Vendrell

This project is done to learn programming on Titanium/Appcelerator with the new Alloy MVC framework.
It's done actually with Titanium 3.1.2 and Alloy 1.2.0 versions.

Since Alloy 1.2.0 version, you can now use L() for internacionalization also in the XML code (before, only on JS and TSS code)  

This program is easy to understand and maybe a good starting point for others to learn the basics of Titanium. It is profusely commented on the code, so I hope it will help the newbies (like me with Titanium).

Will cover the next aspects:

- Alloy MVC "way of life".
- Database (to store all the user pills).
- CommonJS (in the lib folder we will have our own controllers to be available to all the program).
- Internacionalization (translation to EN and ES).
- iOS / Android working versions. 
- Use of the next "complex" components: 
    TableView
	NavigationGroup (for iOS)
	custom NavigationBar (for Android) inside a View
	Forms (with different DatePicker for iOS and Android)
- iOS/Android activity to manage pause/resume events.
- Daychange detection (using resume event to verify a date change).
- Custom Android back button management to disable selfclose in a lightweigth window.

Codestrong!

----------------------------------
####Now, the purpose of the program.

I must take some different pills on my current life, but not daily, one can be taken every 2 days, other can be every 3 days, etc. Usually I remember it, because it is every 2 days, but sometimes I forget if I took the pill yesterday. Then I need a way to remember it.

This is the purpose of the program, to view easily if I need to take my pill today or not. Or for various pills.

So the logic is the next: for every pill in the list, knowing the day I started to take the pill and the interval of days to take the next, calculate for today if I must take the pill or not. This is the easy part. The hard part is an screen to show the current week with the days marked for the selected pill to be taked.

With all this in mind, the plan is:

- An starting screen with a list of all the pills for the user and an add button.
- An screen to add the new pills with a back button (on iOS, the navBar makes the button automatically).
- An screen to show the current week for the selected pill in which the user can edit the pill data.

Those simple 3 screens have enough work to learn a lot of basic concepts for Alloy framework (there is not too much Alloy examples out there because Alloy is relatively new) 

----------------------------------
####Screenshots:
![iPhone Main](https://raw.github.com/mcvendrell/Pasti/master/screenshots/iPhone-Main.PNG)
![Android Main](https://raw.github.com/mcvendrell/Pasti/master/screenshots/Android-Main.PNG)
![iPhone Screen 1](https://raw.github.com/mcvendrell/Pasti/master/screenshots/iPhone-Add.PNG)
![Android Screen 1](https://raw.github.com/mcvendrell/Pasti/master/screenshots/Android-Add.PNG)
![iPhone Screen 2](https://raw.github.com/mcvendrell/Pasti/master/screenshots/iPhone-Pill.PNG)
![Android Screen 2](https://raw.github.com/mcvendrell/Pasti/master/screenshots/Android-Pill.PNG)

####License:

I'm using the MIT license, which I find free enough with only the need of attribution to the autor.

----------------------------------
####Stuff our legal folk make us say:

Appcelerator, Appcelerator Titanium and associated marks and logos are 
trademarks of Appcelerator, Inc. 

Titanium is Copyright (c) 2008-2013 by Appcelerator, Inc. All Rights Reserved.

Titanium is licensed under the Apache Public License (Version 2). Please
see the LICENSE file for the full license.
