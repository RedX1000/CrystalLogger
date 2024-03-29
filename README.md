# CrystalLogger
### An open-source Alt1 Plugin designed for tracking Crystal key, Crystal Triskelion, and Alchemists chest rewards.
#### Report bugs or questions, message me 🙂 -> Discord: RedX1000#3655
#### RuneApps forum page: https://runeapps.org/forums/viewtopic.php?id=1493

* *NOTE: When reporting a crash, please take a screenshot of the reward window and reward capture history send it to me. Use Windows Key + Shift + S, Lightshot, or Gyazo to take the screenshot to avoid distortion.*
<br><br>

### Table of Contents
* [Description](#description)
* [How to install](#how-to-install)
* [Consider sending a donation!](#consider-sending-a-donation)
* [Instructions on how to use](#instructions-on-how-to-use)
    * [Capture Rewards](#capture-rewards)
    * [AutoCapture](#autocapture)
    * [Export to CSV](#export-to-csv)
    * [History (Rollback)](#history-rollback)
    * [Insert](#insert)
    * [Clear Options menu](#clear-options-menu)
    * [Toggleable loot tabs](#toggleable-loot-tabs)
    * [Information & Updates](#information--updates)
    * [Home button](#home-button)
* [Settings](#settings) 
    * [Image Searching Algorithm](#image-searching-algorithm)
    * [Miscellaneous Toggles](#miscellaneous-toggles)
* [Additional Information](#additional-information)
    * [Move to bank/inventory popup is annoying](#move-the-rewards-window-out-of-the-way-of-the-items-moved-to-bankinventory-popup-when-opening-rewards)
    * [Things to avoid accidentally covering when scanning](#when-scanning-rewards-do-not-cover-these-spots-on-a-reward-screen)
    * [Avoiding menus causing multi-capturing](#avoiding-menus-causing-multi-capturing-a-few-tips-on-where-to-avoid-having-menus-appearing-over-the-value)
    * [Accessing `localStorage`](#this-plugin-stores-data-using-localstorage-within-alt1-therefore-it-can-remember-all-of-the-loot-you-have-gotten-between-sessions-unless-it-is-cleared-to-access-it)
    * [CrystalLogger is flexy!](#crystallogger-can-be-stretched-out-widthwise-to-display-more-of-the-loot-in-its-display-as-the-top-is-flexy-and-if-you-compress-the-bottom-you-can-have-a-minimal-box-for-only-seeing-scanned-items)
    * [Potential or planned updates](#potential-or-planned-updates)
    * [Special thanks](#special-thanks) <br><br>

### Description
This application was created to provide players with a way to easily record their crystal chest, crystal triskelion, and alchemist chest rewards during an opening, and to allow users to share their crystal chest, crystal criskelion, and alchemist chest rewards data with others. <br><br>

__CrystalLogger works out of the box, so you don't have to adjust any settings if you don't want to.__ Manually capture and/or press the lock to autocapture rewards to begin logging! <br><br>

### How to install
 Copy and paste this link in your browser to install CrystalLogger to Alt1 automatically <br>
`alt1://addapp/https://redx1000.github.io/CrystalLogger/appconfig.json` <br>

 Or use direct link <br>
 https://redx1000.github.io/CrystalLogger <br><br>
To install with the direct link
1. Copy the direct link.
2. Open Alt1 applications and open the browser.
3. Paste link in URL bar and press enter.
4. Click Add App on the top of the page.
5. Accept permissions and click confirm. <br><br>

![CrystalLogger Tall](/Readme%20Images/CrystalLogger%20Tall.png "CrystalLogger Tall") <br><br>

### Consider sending a donation!
The Logger projects are passion project and I have future plans to use these plugins as a base for future loggers<br>
Consider sending a small donation in this direction🙂.<br>

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/L4L7EERT9)  <br><br>

# Instructions on how to use
### Selecting Reward Being Opened
* By selecting one of the radio buttons corresponding to the reward you're opening, it will tune CrystalLogger to that specific reward.
* By default, Taverley is selected, but CrystalLogger remembers the last selected reward.
* There is only support for Taverley, Prifddinas, Triskelion, and Alchemist rewards.
* List of things affected by changing the reward selection:
    1. Rewards display
    2. Clear Options Menu clearing current reward
    3. History display of captured clues
    4. Insert menu <br><br>

### Capture Rewards
1. Select the reward you're opening with the radio buttons in the top-left corner of the window (Taverley, Prifddinas, Triskelion, Alchemist).
    * Make sure the CrystalLogger rewards window is not covered in order to get a correct reading; list of things to not obfuscate at [Additional Information](#additional-information) and [Avoiding menus causing multi-capturing](#avoiding-menus-causing-multi-capturing-a-few-tips-on-where-to-avoid-having-menus-appearing-over-the-value).
2. Press the Capture button, press Alt+1, or enable Autocapture to record the reward interface.
3. Wait a bit, recording can be less than 600ms or over 5 seconds seconds depending on the amount of rewards in the window and the image searching algorithmn used (Some users experience longer times than usual. Tweak with the settings or DM me if this happens).
4. Rewards appear in the CrystalLogger interface with the value, and a dynamic display that updates when new rewards come in, the total number of rewards logged, and the total and average value for the number of logged rewards. Captured rewards are also saved within the [history](#history-rollback) for review and deletion. <br><br>

### Autocapture
* Rewards can be automatically captured by clicking on the lock (Closed == On, Open == Off).
* This is turned off by default. Click the lock to enable it.
* When opening settings or Clear Options Menu buttons, autocapture is automatically disabled.
* <u><b>Because duplicate rewards are common when opening rewards, sometimes manually capturing rewards is required if CrystalLogger does not autocapture due to the value being the same.</b></u>
* **Be careful to not cover details in the reward window**, specifically "Current Reward Value: X" coins, and the rewards. There is code in place to help avoid this for values, but it can happen if 2 values from the left are left uncovered. If this happens for items, perform a [rollback](#history-rollback).
* List of things to not hover over below at [Additional Information](#additional-information) and [Avoiding menus causing multi-capturing](#avoiding-menus-causing-multi-capturing-a-few-tips-on-where-to-avoid-having-menus-appearing-over-the-value).
* Easy way to fix a misread is to disable autocapture, rolling it back and recapturing it. 
* If some items are not reading correctly when capturing, it is most likely caused by icons loading in. Check to see if [lag detection](#miscellaneous-toggles) settings are on in the CrystalLogger [settings](#settings) and manually roll it back. The rewards should be automatically recaptured.
* If CrystalLogger reads the incorrect items displayed on screen, roll it back and try again. If it reads incorrectly again adjust your [image searching algorithm](#image-searching-algorithm) settings and try again. Feel free to reach out to my DMs on Discord for any questions on this.
* In the event of a multi-capture from not obfuscating the value, pause Autocapture, perform a rollback, and open the next reward, then re-enable autocapture.<br><br>

### Export to CSV
* Export to CSV will create a comma separated value file of the your rewards and capture history from `localStorage` and allows the user to download the file.
* This will be useful for storing data long term or for crowdsourcing data, i.e. Recording crystal chest, triskelion, or alchemist chest drop-rates or clan opening events.<br>
![CSV Example](/Readme%20Images/CSV%20demo.png "CSV Example") <br>
![CSV Example](/Readme%20Images/CSV%20History%20demo.png "CSV History Example; Open image to see details") <br><br>

### History (Rollback)
* History will open a menu that displays every captured reward that can be rolled back and deleted.
* By default, History will the display the last 25 items you've captured. This can be adjusted in the [Settings](#settings) under History Display Limit. 
* Rollbacks performed in History will remove the given reward items quantities, its value, and its counter.
* When you click "Delete", verification buttons "Yes" and "No" will appear in it's place. Upon clicking yes, the given entry will be deleted from `localStorage` and the display will update to reflect this. If the deleted entry is the first in the list, the recently captured rewards display will clear itself. Clicking "No" will revert the button back to "Delete".<br>
* These displayed rewards persist between sessions, so rewards can be rolled back from `localStorage` at any time.
* This is great if you accidentally scan a reward twice, trigger a multi-capture, or if CrystalLogger incorrectly identifies an item or value (Ways to mitigate multi-capture from value obfuscation jump to [Avoiding menus causing multi-capturing](#avoiding-menus-causing-multi-capturing-a-few-tips-on-where-to-avoid-having-menus-appearing-over-the-value).) <br>
![History Example](/Readme%20Images/HistorySample.png "History Example") <br><br>

### Insert
* Insert allows users to directly manipulate `localStorage` by allowing users to add or subtract items by manually creating a new entry to be inserted into the database.
* To remove items from `localStorage`, make the value and quantities of items negative before inserting.
* The Fetch GE button uses the Runescape Wiki's APIs for pulling the current price of the selected items and autofills the reward value based on the item prices and quantity.
* Entries inserted into `localStorage` are marked in the History menu with a <span style="color:red; font-size: 11px; font-family: trajan-pro-3;">[C]</span> which means "Custom".
* To insert items into `localStorage`:
    * Select the items you want to enter into the database.
    * Set the quantity of items you are trying to add.
    * Set the value manually or by selecting the "Fetch GE" button.
    * Click confirm and review the verification page.
    * Click confirm to add it into `localStorage`. <br><br>

### Clear Options Menu
* Clear Options Menu has multiple choices that determine the scope of how much you want to delete from the database of items.
* There are confirm windows for each option except Refresh page.
1. Reset Settings: Sets settings back to default settings. Default settings are marked with an asterisk or in hover-over text.
2. Clear currently selected tier: Clears the database of quantities, values, and clue counts from the currently selected tier.
3. Clear all items from database: Clears the database of quantities and values of items and rewards.
3. Completely reset CrystalLogger: Nuclear option, **COMPLETELY** resets CrystalLoggers settings and database. This is a recommended last option for troubleshooting. A value within `localStorage` may or may not change between updates (I try not to), and if it turns out that it breaks it, give this a try, otherwise reach out to me on Discord and we'll chat about it 🙂. 
4. Refresh page: Refreshes the plugin webpage, does not delete anything.  <br><br>

### Toggleable loot tabs
* Click on the loot tab title to hide the loot, and click it again to show the loot.
* Hidden tabs will be strikethroughed, and the space below it will be hidden.
* Hovering over it will give a tooltip on whether you can hide or show the loot. <br><br>

### Information & Updates
* Information & Updates displays the following:
    * The latest news about the plugin.
    * TetraLogger's repository link.
    * My discord information.
    * My Ko-fi donation link.
* I recommend checking here occasionally if anything gets updated regarding TetraLogger.<br><br>

### Home button
* The Home button takes you to the LoggerSuite homepage.
* LoggerSuite is the all-in-one plugin homepage for the other loggers including this one.
* There's an install link on the page, feel free to add it!<br><br>

## Settings
* Settings allow for user choice of Algorithm for icon recognition and miscellaneous settings toggles.
* Hover over the corresponding buttons title to learn more about what it does. <br><br>

### Image Searching Algorithm
1. ResembleJS: Image recognition library using [`ResembleJS`](https://github.com/rsmbl/Resemble.js) that compares entire images and returns a percentage value. It is slow, but it is very accurate. 
2. Pixelmatch: Image recognition library using [`Pixelmatch`](https://github.com/mapbox/pixelmatch) that compares images pixel by pixel for and returns a percentage value. It is very fast, but can be less accurate than ResembleJS.
    * Pixelmatch may have an issue where some items read incorrectly as it did in OpenLogger. If this happens, try using Hybrid or ResembleJS or send me a DM on Discord if you run into other misreads with this configuration. 
3. Hybrid: A mix of the two. Pixelmatch runs first then ResembleJS. Great balance of speed and accuracy. Enabled by default.
    * Hybrid precision can be adjusted using Hybrid Alg Precision setting in the settings menu, listed below. <br><br>

### Miscellaneous Toggles
1. Lag Detection: Determines whether lag should be detected when scanning rewards. When on, it will try to rescan it again. In the event that it does not capture everything due to lag, perform a rollback and try again.
2. Multi button prevention: Prevents the user from accidentally multi-logging rewards by disabling the capture button when autocapture is on and when the plugin is trying to capture rewards. However, due to the increased number of duplicates encountered in crystal chests, triskelions, and alchemist chests, this is turned off by default.
3. No Menu Highlighter: Displays a box where the user should prevent menus appearing at all costs while AutoCapture is on. A menu appearing in this area could potentially cause a double capture, but it is rollback-able. More information on how to avoid a multi-capture, [click here](#avoiding-menus-causing-multi-capturing-a-few-tips-on-where-to-avoid-having-menus-appearing-over-the-value).
4. Hybrid Alg Precision: Allows the user to adjust the precision of the Hybrid image recognition algorithm.
    * The lower the value, the higher the precision. The higher the precision, the faster it runs, but the less accurate it could potentially be, and vice versa. 
    * Default value is 0.7, minimum value is 0.1, maximum value is 1.0. Setting this value higher or lower than this will be auto-capped.
6. History Display Limit: Limits the number of latest captured rewards displayed within the History menu. Default value is 25, minimum value is 0. <br><br>

# Additional information
* ### Move the rewards window out of the way of the "Items Moved To Bank/Inventory" popup when opening rewards.
    &emsp; ![Items moved to bank popup](/Readme%20Images/ItemsMovedToBank.png "Items moved to bank popup")
    &emsp; ![Items moved to inventory popup](/Readme%20Images/ItemsMovedToInventory.png "Items moved to inventory popup")
    * The above images pop up in the middle of the screen every time "Bank All" or "Take All" is pressed. This can cause incorrect readings and can prevent CrystalLogger from functioning when on the screen 
    * Best way to avoid this is to have the loot window out of the way of these popups for a smooth experience. 
    * We can only pray that Jagex lets us move these popups someday. ![Prayge](/Readme%20Images/Prayge.png "Prayge") <br><br>

* ### When scanning rewards, do not cover these spots on a reward screen.
    * EOC rewards display: <br>![EOC rewards display](/Readme%20Images/rewardsample.png "EOC Rewards")
    * Legacy rewards display: <br>![EOC rewards display](/Readme%20Images/rewardsamplelegacy.png "Legacy Rewards")
    * EOC Crystal Chest in the corner:&nbsp;&nbsp; ![EOC Crystal Chest in the corner](/dist/images/crystalChest.data.png "Crystal Chest")
    * Legacy Crystal Chest on the top of the screen:&nbsp;&nbsp; ![Legacy Crystal Chest on the top of the screen](/dist/images/crystalChestLegacy.data.png "Crystal Chest Legacy")
    * EOC Triskelion Treasures in the corner:&nbsp;&nbsp; ![EOC Triskelion Treasures in the corner](/dist/images/triskelionTreasures.data.png "Triskelion Treasures")
    * Legacy Triskelion Treasures on the top of the screen:&nbsp;&nbsp; ![Legacy Triskelion Treasures on the top of the screen](/dist/images/triskelionTreasuresLegacy.data.png "Triskelion Treasures Legacy")
    * EOC Alchemist's Chest in the corner:&nbsp;&nbsp; ![EOC Alchemist's Chest in the corner](/dist/images/alchemistsChest.data.png "Alchemist's Chest")
    * Legacy Alchemist's Chest on the top of the screen:&nbsp;&nbsp; ![Legacy Alchemist's Chest on the top of the screen](/dist/images/alchemistsChestLegacy.data.png "Alchemist's Chest Legacy")
    * Top left corner of EOC loot window:&nbsp;&nbsp; ![Top left corner of EOC loot window](/dist/images/eoctopleft.data.png "EOC Top left")
    * Bottom left corner of EOC loot window:&nbsp;&nbsp; ![Bottom left corner of EOC loot window](/dist/images/eocbotleft.data.png "EOC Bottom left")
    * Exit button of EOC loot window:&nbsp;&nbsp; ![Exit button of EOC loot window](/dist/images/eocx.data.png "EOC Exit button")
    * Top left corner of Legacy loot window:&nbsp;&nbsp; ![Top left corner of Legacy loot window](/dist/images/legacytopleft.data.png "Legacy Top left")
    * Bottom left corner of Legacy loot window:&nbsp;&nbsp; ![Bottom left corner of Legacy loot window](/dist/images/legacybotleft.data.png "Legacy Bottom left")
    * Exit button of Legacy loot window:&nbsp;&nbsp; ![Exit button of Legacy loot window](/dist/images/legacyx.data.png "Legacy Exit button")
    * EOC Current Reward Value <u><b><i>[INCLUDING NUMBERS](#a-few-tips-on-where-to-avoid-having-menus-appearing-over-the-value)</i></b></u>:&nbsp;&nbsp; ![EOC Current Reward Value INCLUDING NUMBERS](/dist/images/RewardValue.data.png "EOC Current Reward Value")
    * Legacy Current Reward Value <u><b><i>[INCLUDING NUMBERS](#a-few-tips-on-where-to-avoid-having-menus-appearing-over-the-value)</i></b></u>:&nbsp;&nbsp; ![Legacy Current Reward Value INCLUDING NUMBERS](/dist/images/RewardValueLegacy.data.png "Legacy Current Reward Value")
    * **Everything else is free game to cover. More details below about preventing multi-capturing over the value** <br><br>

* ### Avoiding menus causing multi-capturing: A few tips on where to avoid having menus appearing over the value
    * It IS **_NOT_** safe to have a menu pop up if covering ONLY the value itself. CrystalLogger WILL capture if you cover up the value such that ONLY the value is covered up like this <span style="font-size: 9px;">(I know this is a clue reward screenie, but rule still applies 🤫)</span>:<br>![Menu covering only the value](/Readme%20Images/menu%20screen1.png "Menu covering only value")

    * It **_IS_** safe to hover over or right click items as long as the menu resulting from it can cover the "Current Reward Value" text, but try to avoid it. A few examples of safe menus:<br>
    ![Hover-over menu covering both value and 'Current Reward Value'"](/Readme%20Images/menu%20screen2.png "Hover-over menu covering both value and 'Current Reward Value'")<br>
    ![Right click menu covering only the 'Current Reward Value'"](/Readme%20Images/menu%20screen3.png "Right click menu covering only 'Current Reward Value'")
    * In the event that a capture is auto-triggered due to this, roll it back in the [History menu](#history-rollback) <br><br>

* ### This plugin stores data using `localStorage` within Alt1, therefore it can remember all of the loot you have gotten between sessions unless it is cleared. To access it:

    1. Right click the plugin anywhere <br>
    2. Click "Inspect element" <br>
    3. Click the "Application" tab <br>
    4. On the left-hand side, under "Storage", click "Local Storage" <br>
    5. Click the link under "Local Storage" <br>
        - To Clear `localStorage` completely it can be done in one of two ways: <br>   
            1. Select "Completely Reset CrystalLogger" in the Clear Options Menu and select "Reset Everything" (Easiest best choice). <br>
            2. Within `localStorage`, filter by "CrystalLogger" and remove every entry that starts with "CrystalLogger". <br><br>

* ### CrystalLogger can be stretched out widthwise to display more of the loot in its display, as the top is flexy, and if you compress the bottom, you can have a minimal box for only seeing scanned items: 
    ![CrystalLogger Tall Top](/Readme%20Images/CrystalLogger%20Tall%20Top.png "CrystalLogger Tall Top") <br>
    ![CrystalLogger Wide Top](/Readme%20Images/CrystalLogger%20Wide%20Top.png "CrystalLogger Wide Top") <br>
    ![CrystalLogger Wide](/Readme%20Images/CrystalLogger%20Wide.png "CrystalLogger Wide") <br><br>

### Potential or planned updates
* None here! Maybe there are a few on the other projects...
<!--* Better legacy interface support; I don't test with it much. Legacy interface can log clues and perform lag detection checks, but I do not have a reroll window detection set for legacy mode, and I would need to iron out any bugs or kinks that appear. Use at your own risk.-->
<br><br>

### Special thanks
* Skillbert, for creating Alt1 and providing the tools and libraries to create third-party applications.
* Dala/Daladen, for providing me with an insight and reference into how the Summit Clue Logger worked to help write the original OpenLogger project and general web dev help.
* Athabastyx, for the technical help and Javascript insight. OpenLogger was my first JS/TS project and Atha helped a lot with helping me understand new functions, libraries, and how to optimize things better.
* All the people I've reached out to and have provided help regarding JS/TS and Alt1 plugin questions through the [Runeapps Discord channel](https://discord.com/invite/G3SbcS8) and DMs.
* Everyone reaching out to report bugs and make suggestions. <br><br>
