//alt1 base libs, provides all the commonly used methods for image matching and capture
//also gives your editor info about the window.alt1 api
import * as a1lib from "@alt1/base";
import { ImgRef } from "@alt1/base";

import compareImages from "resemblejs/compareImages";
import pixelmatch from "pixelmatch";

import ClueRewardReader from "./scripts/rewardreader";
import { ModalUIReader } from "./scripts/modeluireader";

import * as lsdb from './JSONs/LocalStorageCrystalInit.json';
import * as itemsAll from './JSONs/ItemsAndImagesCrystal.json';
import * as itemsAllLegacy from './JSONs/ItemsAndImagesCrystalLegacy.json';
import { SlowBuffer } from "buffer";

/* 
A couple of notes for development
- In order to adjust this plugin for other loot adjust two key things:
	* The JSONs, the initializer and the image lists
	* The Image or images that allow Alt1 to find the window 
- One would need to tweak various settings around to accomdate the loot window
- Value reader is also from the Clue Solver, so I'm not sure how it works, it may break.
*/

//tell webpack to add index.html and appconfig.json to output
require("!file-loader?name=[name].[ext]!./index.html");
require("!file-loader?name=[name].[ext]!./appconfig.json");

// TODO: FOR THE PROGRAMMERS AND DEBUGGERS
// Set this value to true or false to enable console log messages
var seeConsoleLogs = true;

var settingslist = ["CrystalLogger/Checked button", "CrystalLogger/Algorithm", "CrystalLogger/lagDetect", 
					"CrystalLogger/multiButtonPressDetect",  "CrystalLogger/hybridPrecision", 
					"CrystalLogger/noMenu", "CrystalLogger/RollbackDisplayLimit"]

var valuesAndCounts = ["CrystalLogger/TValue", "CrystalLogger/TCount", 
					   "CrystalLogger/PValue", "CrystalLogger/PCount", 
					   "CrystalLogger/KValue", "CrystalLogger/KCount", 
					   "CrystalLogger/AValue", "CrystalLogger/ACount"]

var rewardSlots = ["first_item", "second_item", "third_item", "fourth_item", "fifth_item", 
					"sixth_item", "seventh_item", "eigth_item", "ninth_item", "tenth_item",
					"eleventh_item", "twelfth_item"];

var listOfItemsT = [];
var listOfItemsTArray = [];
var listOfItemsLegacyT = [];
var listOfItemsLegacyTArray = [];
var listOfItemsP = [];
var listOfItemsPArray = [];
var listOfItemsLegacyP = [];
var listOfItemsLegacyPArray = [];
var listOfItemsK = [];
var listOfItemsKArray = [];
var listOfItemsLegacyK = [];
var listOfItemsLegacyKArray = [];
var listOfItemsA = [];
var listOfItemsAArray = [];
var listOfItemsLegacyA = [];
var listOfItemsLegacyAArray = [];

var items = JSON;

var legacy = false;
var displaybox = true;

var lastItems = [];
var lastQuants = [];
var lastValue = 0;

var lastReroll = [0, 0];

var autoCaptureInterval;

var noMenuInterval;

var opentabs = [true, true, true];

var lagDetected = false;

var buttonDisabletoggle = true;

var lagCounter = 0;

var insertVerif = [];

// NOTE: Adjust this for larger windows. I want 12 cause crystals.
var cap = 12

var rewardslist = ["taverley", "prifddinas", "triskelion", "alchemist"]

var imgs = a1lib.ImageDetect.webpackImages({
	crystalChest: require("./images/crystalChest.data.png"),
	crystalChestLegacy: require("./images/crystalChestLegacy.data.png"),
	triskelionTreasures: require("./images/triskelionTreasures.data.png"),
	triskelionTreasuresLegacy: require("./images/triskelionTreasuresLegacy.data.png"),
	alchemistsChest: require("./images/alchemistsChest.data.png"),
	alchemistsChestLegacy: require("./images/alchemistsChestLegacy.data.png")
});

// TODO: Consider adding an update price for all clues within history, current tier value
// TODO: Consider changing the coin icon depending on its quantity
// Maybe extend this with purple sweets, holy biscuits, and various seeds.
// TODO: Consider putting some functions in its own TS files for organization.


export async function initOnLoad() {
	if (window.alt1) {
		alt1.overLayClearGroup("disclaimer");
		alt1.overLayClearGroup("overlays");
		alt1.overLayClearGroup("icon");
		alt1.overLayClearGroup("lag");
		alt1.overLayClearGroup("nomenu");
		
		alt1.overLaySetGroup("overlays");
		alt1.overLayTextEx("Initializing CrystalLogger...", a1lib.mixColor(255, 144, 0), 20, Math.round(alt1.rsWidth / 2), 200, 50000, "", true, true);
	}

	if (seeConsoleLogs) console.log("Initializing plugin...");
	toggleLootDisplay("first_rewards")
	toggleLootDisplay("second_rewards")
	toggleLootDisplay("third_rewards")
	await init();

	if (window.alt1) {
		alt1.overLaySetGroup("disclaimer");
		alt1.overLayTextEx("Disclaimer: When using Autocapture,\nduplicate/back-to-back rewards WILL\n     need to be manually captured. ", a1lib.mixColor(255, 80, 80), 19, Math.round(alt1.rsWidth / 2), 270, 8000, "", true, true);
	}

	if (seeConsoleLogs) console.log("\nInitialization complete!");
}


export async function init() {
	buttonDisabler();

	// TODO: This is a fix for when the buttons are clicked once.
	// When clicked once, it does nothing but when clicked a second
	// time, it closes and works properly.
	// Figure out in toggleLootDisplay how to fix it. Might worry
	// about it in the next logger project...

	// Initializing LocalStorage items
	if (seeConsoleLogs) console.log("Initializing LocalStorage items...");

	if (seeConsoleLogs) console.log("Initializing radio buttons...");
	if (localStorage.getItem("CrystalLogger/Checked button") == null) { // Checked button init check
		if (seeConsoleLogs) console.log("Defaulting button to taverley...");
		let ele = document.getElementById("taverley") as HTMLInputElement;
		ele.checked = true;
		(document.getElementById('current_reward_span') as HTMLSpanElement).textContent = "Taverley";
		localStorage.setItem("CrystalLogger/Checked button", "taverley");
	}
	else { // If it does, set the button and span
		if (seeConsoleLogs) console.log("Setting previously set radio button: " + localStorage.getItem("CrystalLogger/Checked button") + "...");
		let temp = localStorage.getItem("CrystalLogger/Checked button");
		let ele = document.getElementById(temp) as HTMLInputElement;
		ele.checked = true;
		(document.getElementById('current_reward_span') as HTMLSpanElement).textContent = temp[0].toUpperCase() + temp.slice(1).toLowerCase();
	}

	if (seeConsoleLogs) console.log("Radio buttons initialized.");

	let tierSpans = document.getElementsByClassName("current_tier_button") as HTMLCollectionOf<HTMLSpanElement>;
	let tierSpansCaps = document.getElementsByClassName("current_tier_button_caps") as HTMLCollectionOf<HTMLSpanElement>;
	for (let i = 0; i < tierSpans.length; i++) {
		tierSpans[i].textContent = currentReward()[0];
	}
	for (let i = 0; i < tierSpansCaps.length; i++) {
		tierSpansCaps[i].textContent = currentRewardUpper();
	}


	if (localStorage.getItem("CrystalLogger/items") == null) {
		localStorage.setItem("CrystalLogger/items", JSON.stringify(lsdb))
	}

	for (let i = 0; i < valuesAndCounts.length; i++) {
		if (localStorage.getItem(valuesAndCounts[i]) == null) {
			localStorage.setItem(valuesAndCounts[i], "0");
		}
	}

	items = JSON.parse(localStorage.getItem("CrystalLogger/items"));


	if (seeConsoleLogs) console.log("LocalStorage items initialized.");


	if (localStorage.getItem("CrystalLogger/Algorithm") == null) { // Algorithim init check
		if (seeConsoleLogs) console.log("Defaulting Algorithm button to Hybrid...");
		localStorage.setItem("CrystalLogger/Algorithm", "hybrid");
	}

	if (localStorage.getItem("CrystalLogger/ItemList") == null) { // Item Referense list init check
		if (seeConsoleLogs) console.log("Defaulting ItemList to Organized List...");
		localStorage.setItem("CrystalLogger/ItemList", "orglist");
	}

	if (localStorage.getItem("CrystalLogger/autoCapture") == null) { // Autocapture check
		if (seeConsoleLogs) console.log("Defaulting autocapture to off...");
		localStorage.setItem("CrystalLogger/autoCapture", "false");
	}

	if (localStorage.getItem("CrystalLogger/lagDetect") == null) { // Lag Detection toggle check
		if (seeConsoleLogs) console.log("Defaulting lag detect to true...");
		localStorage.setItem("CrystalLogger/lagDetect", "true");
	}

	if (localStorage.getItem("CrystalLogger/multiButtonPressDetect") == null) { // Button double press detection
		if (seeConsoleLogs) console.log("Defaulting multi button press detect to false...");
		localStorage.setItem("CrystalLogger/multiButtonPressDetect", "false");
	}

	if (localStorage.getItem("CrystalLogger/noMenu") == null) { // No hover display box
		if (seeConsoleLogs) console.log("Defaulting no menu box to true");
		localStorage.setItem("CrystalLogger/noMenu","false");
	}
	else if (localStorage.getItem("CrystalLogger/noMenu") == "true") {
		if (seeConsoleLogs) console.log("Enabling no menu box");
		noMenuCheck();
	}

	if (localStorage.getItem("CrystalLogger/hybridPrecision") == null) { // Hybrid precision value
		if (seeConsoleLogs) console.log("Defaulting hybridPrecision to 0.7...");
		localStorage.setItem("CrystalLogger/hybridPrecision", "0.7");
	}

	if (localStorage.getItem("CrystalLogger/History") == null) { // History initializer
		if (seeConsoleLogs) console.log("Creating history");
		localStorage.setItem("CrystalLogger/History",JSON.stringify([]));
	}


	// This code should add the current date to your history log if it does not exist.
	// This snippet can be removed a few months in the future or for future projects with this code.
	// ~ 11/21/2022
	let history = JSON.parse(localStorage.getItem("TetraLogger/History"))
	if(history != null){
		for(let i = 0; i < history.length; i++){
			if(history[i][6] == undefined){
				history[i].push(await dateGetter())
			}
		}
		localStorage.setItem("TetraLogger/History",JSON.stringify(history))
	}

	
	if (localStorage.getItem("CrystalLogger/PrimaryKeyHistory") == null) { // Initialize primary key for history
		if (seeConsoleLogs) console.log("Defaulting PrimaryKeyHistory to 1");
		localStorage.setItem("CrystalLogger/PrimaryKeyHistory", "1");
	}

	
	if (localStorage.getItem("CrystalLogger/HistoryDisplayLimit") == null) { // Initialize history display limit
		if (seeConsoleLogs) console.log("Defaulting history display limit to 25");
		localStorage.setItem("CrystalLogger/HistoryDisplayLimit", "25");
	}
	updateItems();

	if (seeConsoleLogs) console.log("\n")

	// Set up image libraries
	await arraySetup();

	//Set display
	lootDisplay();
 
	//Set up settings
	settingsInit();

	//Set up history window
	historyInit();

	//Set up insert window
	insertInit();

	if (window.alt1) {
		alt1.overLayClearGroup("overlays");
		alt1.overLaySetGroup("overlays");
		alt1.overLayTextEx("CrystalLogger ready!", a1lib.mixColor(100, 255, 100), 20, Math.round(alt1.rsWidth / 2), 200, 2000, "", true, true);
	}
	
	buttonEnabler();
}


export async function cleardb(choice: any) {
	let keys = Object.keys(items);

	if (choice == 1) { // Nuclear reset all
		if (window.alt1) {
			alt1.overLayClearGroup("overlays");
			alt1.overLaySetGroup("overlays");
			alt1.overLayTextEx("Resetting CrystalLogger...", a1lib.mixColor(255, 144, 0), 20, Math.round(alt1.rsWidth / 2), 200, 4000, "", true, true);
		}

		let ls = Object.keys(localStorage)
		for(const i of ls){
			if(i.includes("CrystalLogger")){
				console.log("Removing all CrystalLogger stuff...")
				localStorage.removeItem(i)
			}
		}

		if (window.alt1) {
			alt1.overLayClearGroup("overlays");
			alt1.overLaySetGroup("overlays");
			alt1.overLayTextEx("CrystalLogger successfully reset! Restarting...", a1lib.mixColor(100, 255, 100), 20, Math.round(alt1.rsWidth / 2), 200, 4000, "", true, true);
		}
		await new Promise(resolve => setTimeout(resolve, 1000));
		location.reload();
	}
	else if (choice == 2) { // Full item db clear
		if (window.alt1) {
			alt1.overLayClearGroup("overlays");
			alt1.overLaySetGroup("overlays");
			alt1.overLayTextEx("Clearing all items from reward database...", a1lib.mixColor(255, 144, 0), 20, Math.round(alt1.rsWidth / 2), 200, 4000, "", true, true);
		}

		localStorage.removeItem("CrystalLogger/items");
		localStorage.removeItem("CrystalLogger/History");
		for (let i = 0; i < valuesAndCounts.length; i++) {
			localStorage.removeItem(valuesAndCounts[i]);
		}
		await init();

		if (window.alt1) {
			alt1.overLayClearGroup("overlays");
			alt1.overLaySetGroup("overlays");
			alt1.overLayTextEx("All items cleared successfully!", a1lib.mixColor(100, 255, 100), 20, Math.round(alt1.rsWidth / 2), 200, 4000, "", true, true);
		}
	}
	else if (choice == 3) { // Reset settings
		if (window.alt1) {
			alt1.overLayClearGroup("overlays");
			alt1.overLaySetGroup("overlays");
			alt1.overLayTextEx("Reseting settings to default...", a1lib.mixColor(255, 144, 0), 20, Math.round(alt1.rsWidth / 2), 200, 4000, "", true, true);
		}
		
		if (localStorage.getItem("CrystalLogger/noMenu") === "true") {
			localStorage.setItem("CrystalLogger/noMenu", "false");
			noMenuCheck();
		}
		for (let i = 0; i < settingslist.length; i++) {
			localStorage.removeItem(settingslist[i]);
		}

		await init();

		if (window.alt1) {
			alt1.overLayClearGroup("overlays");
			alt1.overLaySetGroup("overlays");
			alt1.overLayTextEx("Settings reset successfully!", a1lib.mixColor(100, 255, 100), 20, Math.round(alt1.rsWidth / 2), 200, 4000, "", true, true);
		}
	}
	else if (choice == 4) { // Current reward clear
		if (window.alt1) {
			alt1.overLayClearGroup("overlays");
			alt1.overLaySetGroup("overlays");
			alt1.overLayTextEx("Clearing " + currentRewardUpper() + " reward  from database...",
				a1lib.mixColor(255, 144, 0), 20, Math.round(alt1.rsWidth / 2), 200, 4000, "", true, true);
		}

		localStorage.setItem(currentReward()[1], "0");
		localStorage.setItem(currentReward()[2], "0");
		for (let i = 0; i < keys.length; i++) {
			items[keys[i]].quantity[currentReward()[0]] = 0;
		}
		updateItems()

		let lsHistory = JSON.parse(localStorage.getItem("CrystalLogger/History"));
		for (let i = lsHistory.length - 1; i >= 0; i--) {
			if (lsHistory[i][3][0] == currentReward()[0] || lsHistory[i][3][0] == currentReward()[0] + " [C] ") {
				lsHistory.splice(i, 1);
			}
		}
		localStorage.setItem("CrystalLogger/History",JSON.stringify(lsHistory));

		if (window.alt1) {
			alt1.overLayClearGroup("overlays");
			alt1.overLaySetGroup("overlays");
			alt1.overLayTextEx(currentRewardUpper() + " cleared successfully!",
				a1lib.mixColor(100, 255, 100), 20, Math.round(alt1.rsWidth / 2), 200, 4000, "", true, true);
		}
	}
	
	let ele = document.getElementById("history_body") as HTMLDivElement;
	let container = document.createElement("div") as HTMLDivElement;
	container.textContent = "There's nothing here to display. Start scanning!";
	container.setAttribute('class','nothingToDisplayContainer');
	ele.append(container);

	await historyClear();
	historyInit();

	(document.getElementById("number_of_rewards") as HTMLSpanElement).textContent = "0";
	(document.getElementById("value_of_rewards") as HTMLSpanElement).textContent = "0";
	(document.getElementById("average_of_rewards") as HTMLSpanElement).textContent = "0";
	let divs = document.getElementsByClassName("loot_display") as HTMLCollectionOf<HTMLDivElement>;
	for (let i = 0; i < divs.length; i++) {
		divs[i].textContent = "";
	}
	for (let i = 0; i < 4; i++) {
		for(let j = 0; j < 8; j++){
			if(rewardSlots[(i * 8) + j] == undefined){
				break;
			}
			(document.getElementById(rewardSlots[(i * 8) + j]) as HTMLDivElement).textContent = "";
		}
	}
	(document.getElementById("rewards_value") as HTMLSpanElement).textContent = "0";

	lastItems = [];
	lastQuants = [];
	lastValue = 0;
}



export async function changeClueTierSpan(id: string, event: Event) {
	// Set the clue_tier span for the checked box
	(document.getElementById("number_of_rewards") as HTMLDivElement).textContent = "0";
	(document.getElementById("value_of_rewards") as HTMLDivElement).textContent = "Loading...";
	(document.getElementById("average_of_rewards") as HTMLDivElement).textContent = "Loading...";



	buttonDisabler();
	if (window.alt1) {
		alt1.overLayClearGroup("overlays");
		alt1.overLaySetGroup("overlays");
		alt1.overLayTextEx("Loading " + (id[0] + id.slice(1).toLowerCase()) + " rewards...", a1lib.mixColor(255, 144, 0), 20, Math.round(alt1.rsWidth / 2), 200, 10000, "", true, true);
	}

	if (seeConsoleLogs) console.log("Setting button to " + (id[0].toUpperCase() + id.slice(1).toLowerCase()) + "...");
	(document.getElementById('current_reward_span') as HTMLSpanElement).textContent = (id[0].toUpperCase() + id.slice(1).toLowerCase());
	(document.getElementById(id) as HTMLInputElement).checked = true;
	localStorage.setItem("CrystalLogger/Checked button", id);

	let tierSpans = document.getElementsByClassName("current_tier_button") as HTMLCollectionOf<HTMLSpanElement>;
	let tierSpansCaps = document.getElementsByClassName("current_tier_button_caps") as HTMLCollectionOf<HTMLSpanElement>;
	for (let i = 0; i < tierSpans.length; i++) {
		tierSpans[i].textContent = currentReward()[0];
	}
	for (let i = 0; i < tierSpansCaps.length; i++) {
		tierSpansCaps[i].textContent = currentRewardUpper();
	}

	// Clear reward slots and value
	(document.getElementById("rewards_value") as HTMLSpanElement).textContent = "0";
	for (let i = 0; i < 9; i++) {
		(document.getElementById(rewardSlots[i]) as HTMLSpanElement).textContent = "";
	}

	// Set up image libraries
	await arraySetup();

	//Set display
	lootDisplay();
 
	//Set up settings
	settingsInit();

	//Set up history window
	historyClear();
	historyInit();

	//Set up insert window
	insertInit();

	if (window.alt1) {
		alt1.overLayClearGroup("overlays");
		alt1.overLaySetGroup("overlays");
		alt1.overLayTextEx((id[0].toUpperCase() + id.slice(1).toLowerCase()) + " rewards & images loaded!", a1lib.mixColor(100, 255, 100), 20, Math.round(alt1.rsWidth / 2), 200, 2000, "", true, true)
	}
	await buttonEnabler();
	lastReroll = [0, 0];
}


async function arraySetup() {
	listOfItemsT = itemsAll.taverley;
	listOfItemsLegacyT = itemsAllLegacy.taverley;
	listOfItemsP = itemsAll.prifddinas;
	listOfItemsLegacyP = itemsAllLegacy.prifddinas;
	listOfItemsK = itemsAll.triskelion;
	listOfItemsLegacyK = itemsAllLegacy.triskelion;
	listOfItemsA = itemsAll.alchemist;
	listOfItemsLegacyA = itemsAllLegacy.alchemist;

	listOfItemsTArray = [];
	listOfItemsLegacyTArray = [];
	listOfItemsPArray = [];
	listOfItemsLegacyPArray = [];
	listOfItemsKArray = [];
	listOfItemsLegacyKArray = [];
	listOfItemsAArray = [];
	listOfItemsLegacyAArray = [];
	
	let promises = [];
	for (let i = 0; i < listOfItemsT.length; i++) {
		listOfItemsTArray.push([listOfItemsT[i].name, listOfItemsT[i].base64, 0.0]);
		listOfItemsLegacyTArray.push([listOfItemsLegacyT[i].name, listOfItemsLegacyT[i].base64, 0.0]);
		promises.push(await _base64ToImageData(listOfItemsTArray[i][1], 32, 32).then(data => { 
			listOfItemsTArray[i].push(data);
		}));
		promises.push(await _base64ToImageData(listOfItemsLegacyTArray[i][1], 32, 32).then(data => { 
			listOfItemsLegacyTArray[i].push(data);
		}));
	}
	await Promise.all(promises);

	promises = [];
	for (let i = 0; i < listOfItemsP.length; i++) {
		listOfItemsPArray.push([listOfItemsP[i].name, listOfItemsP[i].base64, 0.0]);
		listOfItemsLegacyPArray.push([listOfItemsLegacyP[i].name, listOfItemsLegacyP[i].base64, 0.0]);
		promises.push(await _base64ToImageData(listOfItemsPArray[i][1], 32, 32).then(data => { 
			listOfItemsPArray[i].push(data);
		}));
		promises.push(await _base64ToImageData(listOfItemsLegacyPArray[i][1], 32, 32).then(data => { 
			listOfItemsLegacyPArray[i].push(data);
		}));
	}
	await Promise.all(promises);

	promises = [];
	for (let i = 0; i < listOfItemsK.length; i++) {
		listOfItemsKArray.push([listOfItemsK[i].name, listOfItemsK[i].base64, 0.0]);
		listOfItemsLegacyKArray.push([listOfItemsLegacyK[i].name, listOfItemsLegacyK[i].base64, 0.0]);
		promises.push(await _base64ToImageData(listOfItemsKArray[i][1], 32, 32).then(data => { 
			listOfItemsKArray[i].push(data);
		}));
		promises.push(await _base64ToImageData(listOfItemsLegacyKArray[i][1], 32, 32).then(data => { 
			listOfItemsLegacyKArray[i].push(data);
		}));
	}
	await Promise.all(promises);

	promises = [];
	for (let i = 0; i < listOfItemsA.length; i++) {
		listOfItemsAArray.push([listOfItemsA[i].name, listOfItemsA[i].base64, 0.0]);
		listOfItemsLegacyAArray.push([listOfItemsLegacyA[i].name, listOfItemsLegacyA[i].base64, 0.0]);
		promises.push(await _base64ToImageData(listOfItemsAArray[i][1], 32, 32).then(data => { 
			listOfItemsAArray[i].push(data);
		}));
		promises.push(await _base64ToImageData(listOfItemsLegacyAArray[i][1], 32, 32).then(data => { 
			listOfItemsLegacyAArray[i].push(data);
		}));
	}
	await Promise.all(promises);

	// TODO: This is a test to see if things exist in the ItemsAndImages
	// Just run this based on the array and you can check.
	// Blank should appear red in the console.
	/*
	let keys = Object.keys(items)
	console.log("TAVERLEY")
	for(let i = 0; i < listOfItemsT.length; i++){
		if(keys.includes(listOfItemsT[i].name))
			console.log(listOfItemsT[i].name, "in the list")
		else
			console.error(listOfItemsT[i].name, "not in the list")
	}
	console.log("PRIFF")
	for(let i = 0; i < listOfItemsP.length; i++){
		if(keys.includes(listOfItemsP[i].name))
			console.log(listOfItemsP[i].name, "in the list")
		else
			console.error(listOfItemsP[i].name, "not in the list")
	}
	console.log("TRISK")
	for(let i = 0; i < listOfItemsK.length; i++){
		if(keys.includes(listOfItemsK[i].name))
			console.log(listOfItemsK[i].name, "in the list")
		else
			console.error(listOfItemsK[i].name, "not in the list")
	}
	console.log("ALCH")
	for(let i = 0; i < listOfItemsA.length; i++){
		if(keys.includes(listOfItemsA[i].name))
			console.log(listOfItemsA[i].name, "in the list")
		else
			console.error(listOfItemsA[i].name, "not in the list")
	}
	*/
}


a1lib.on("alt1pressed", alt1pressedcapture);
function alt1pressedcapture() {
	if (buttonDisabletoggle == true) {
		if ((document.getElementById("docapturebutton") as HTMLDivElement).getAttribute("title") === ("Disabled while scanning. Please wait...")) {
			return;
		}
		else if ((document.getElementById("docapturebutton") as HTMLDivElement).getAttribute("title") === ("Disable autocapture to use this button")) {
			return;
		}
		else {
			capture(false);
		}
	}

}


export async function capture(autobool: boolean) {
	if (!window.alt1) {
		return;
	}
	if (!alt1.permissionPixel) {
		return;
	}

	if (localStorage.getItem("CrystalLogger/multiButtonPressDetect") === "true") {
		if (!autobool) {
			(document.getElementById("docapturebutton") as HTMLDivElement).setAttribute("onclick", "");
			(document.getElementById("docapturebutton") as HTMLDivElement).setAttribute("title", "Disabled while scanning. Please wait...");
			(document.getElementById("docapturebuttonwords") as HTMLDivElement).style.setProperty("text-decoration", "line-through");
			await new Promise(resolve => setTimeout(resolve, 200));
		}
	}

	let img = a1lib.captureHoldFullRs();

	const promises = [];
	promises.push(await findtrailComplete(img, autobool));
	await Promise.all(promises);
	if (seeConsoleLogs) console.log("Finished checking clue scroll");

	if (localStorage.getItem("CrystalLogger/multiButtonPressDetect") === "true") {
		if (!autobool) {
			await new Promise(resolve => setTimeout(function () {
				(document.getElementById("docapturebutton") as HTMLDivElement).setAttribute("onclick", "TEST.capture(false)");
				(document.getElementById("docapturebutton") as HTMLDivElement).setAttribute("title", "");
				(document.getElementById("docapturebuttonwords") as HTMLDivElement).style.removeProperty("text-decoration");
			}, 400));
		}
	}
}


async function findtrailComplete(img: ImgRef, autobool: boolean) {
	// If 3 rerolls..., default
	// Adjust this if you want to add more rerolls.
	if (lagCounter == 5) {
		autoDisableCheckAuto(event);
		if (window.alt1) {
			alt1.overLayClearGroup("overlays");
			alt1.overLayClearGroup("lag");
			alt1.overLayClearGroup("rect");
			alt1.overLaySetGroup("overlays");
			alt1.overLayTextEx("Too much lag or back to back loot detected.\n\n        Autocapture has been automatically\nturned off. Manually capture this clue or turn\n         autocapture back on and try again",
				a1lib.mixColor(255, 80, 80), 20, Math.round(alt1.rsWidth / 2), 200, 50000, "", true, true);
		}
		lagCounter = 0;
		return;
	}

	try {
		let loc;
		const imgCaptures = [img.findSubimage(imgs.crystalChest),
							 img.findSubimage(imgs.crystalChestLegacy),
							 img.findSubimage(imgs.triskelionTreasures),
							 img.findSubimage(imgs.triskelionTreasuresLegacy),
							 img.findSubimage(imgs.alchemistsChest),
							 img.findSubimage(imgs.alchemistsChestLegacy)	
							];

		if (currentReward()[0] == "taverley" || currentReward()[0] == "prifddinas"){
			if (imgCaptures[0][0] !== undefined) {
				loc = imgCaptures[0];
				if (seeConsoleLogs) console.log("Non-legacy crystal chest window");
				legacy = false;
			}
			else if (imgCaptures[1][0] !== undefined) {
				loc = imgCaptures[1];
				if (seeConsoleLogs) console.log("legacy crystal chest window");
				legacy = true;
			}
			else {
				return;
			}
		}
		else if (currentReward()[0] == "triskelion"){
			if (imgCaptures[2][0] !== undefined) {
				loc = imgCaptures[2];
				if (seeConsoleLogs) console.log("Non-legacy triskelion window");
				legacy = false;
			}
			else if (imgCaptures[3][0] !== undefined) {
				loc = imgCaptures[3];
				if (seeConsoleLogs) console.log("legacy triskelion window");
				legacy = true;
			}
			else {
				return;
			}
		}
		else if (currentReward()[0] == "alchemist"){
			if (imgCaptures[4][0] !== undefined) {
				loc = imgCaptures[4];
				if (seeConsoleLogs) console.log("Non-legacy alchemist window");
				legacy = false;
			}
			else if (imgCaptures[5][0] !== undefined) {
				loc = imgCaptures[5];
				if (seeConsoleLogs) console.log("legacy alchemist window");
				legacy = true;
			}
			else {
				return;
			}
		}
		else {
			console.log("nothing")
			return;
		}
		
		// TODO: Tweak these two values below if jagex adjusts the pixel placement of the items
		// Values to tweak in case jagex borks the item placement on the screen
		// x1, +1 = right, -1 = left
		// y1, +1 = up, -1 = down
		// Adjust top crops as well, for the x1 and y1 values for it
		// Consider making this an option in the settings.

		let xdefault: number
		let ydefault: number
		let xRect: number
		let yRect: number
		
		if(!legacy){
				xdefault = loc[0].x - 10;
				ydefault = loc[0].y + 29;
				xRect = loc[0].x - 27
				yRect = loc[0].y - 13
		}
		else{
			if (currentReward()[0] == "taverley"){
				xdefault = loc[0].x - 157;
				ydefault = loc[0].y + 29;
				xRect = loc[0].x - 176
				yRect = loc[0].y - 13
			}
			else if (currentReward()[0] == "prifddinas"){
				xdefault = loc[0].x - 157;
				ydefault = loc[0].y + 29;
				xRect = loc[0].x - 176
				yRect = loc[0].y - 13
			}
			else if (currentReward()[0] == "triskelion"){
				xdefault = loc[0].x - 129;
				ydefault = loc[0].y + 29;
				xRect = loc[0].x - 148
				yRect = loc[0].y - 13
			}
			else if (currentReward()[0] == "alchemist"){
				xdefault = loc[0].x - 143;
				ydefault = loc[0].y + 29;
				xRect = loc[0].x - 161
				yRect = loc[0].y - 13
			}
		}

		let x1 = xdefault
		let y1 = ydefault

		let crops = []
		let topCrops = []
		for(let i = 0; i < 4; i++){
			let croptemp = new Array<ImageData>(8)
			let toptemp = new Array<ImageData>(8)
			for(let j = 0; j < 8; j++){
				croptemp[j] = (img.toData(x1, y1, 32, 32));
				toptemp[j] = (img.toData(x1, y1 + 1, 32, 8));
				x1 += 32 + 23;
			}
			crops.push(croptemp);
			topCrops.push(toptemp);
			x1 = xdefault;
			y1 += 32 + 14
		}
		
		// Give me the total value!
		// If this breaks, value is obfuscated. Second way to scan it for validity.
		
		// FIXME: Try to rework this try/catch to an if/else block.
		let value = 0;
		let lastValueList = [];
		try {
			let rewardreader = new ClueRewardReader();  // Thanks Skillbert
			console.log(rewardreader)
			rewardreader.pos = ModalUIReader.find()[0]; // For these two functions
			console.log(rewardreader.read(img).value)
			value = rewardreader.read(img).value;
			let valueStr = value.toString();
			let valueList = [];

			for (let i = valueStr.length - 1; i > 0; i--) {
				valueList.push(valueStr);
				valueStr = valueStr.slice(0,-1);
			}

			let lastValueStr = lastValue.toString();
			for (let i = lastValueStr.length - 1; i > 0; i--) {
				lastValueList.push(lastValueStr);
				lastValueStr = lastValueStr.slice(0,-1);
			}
		} catch (e) {
			console.log(e)
			return;
		}

		if (autobool == true) {
			if (lastValue == 0) {
				if (seeConsoleLogs) console.log("value is zero");
			}
			else if (value == lastValue) {
				return;
			}
			else if (/*valueList.includes(lastValue.toString()) ||*/ lastValueList.includes(value.toString())) {
				return;
			}
		}

		alt1.overLayClearGroup("overlays");
		alt1.overLaySetGroup("rect");

		//TODO: Investigate this for changing tiers
		rectangleMaker(255, 144, 0, xRect, yRect, 60000)

		let prevValue = lastValue;
		lastValue = value;
		if (!lagDetected) {
			alt1.overLayClearGroup("overlays");
			alt1.overLayClearGroup("lag");
			alt1.overLayClearGroup("disclaimer");
			alt1.overLaySetGroup("lag");
			alt1.overLayTextEx("Capturing rewards...", a1lib.mixColor(255, 144, 0), 20, Math.round(alt1.rsWidth / 2), 200, 60000, "", true, true);
		}
		let itemResults = [];
		let promises = [];

		x1 = xdefault
		y1 = ydefault

		let notBlank = false; 
		for(let i = 0; i < 4; i++){
			let itemtemp = []
			for(let j = 0; j < 8; j++){
				if (window.alt1) {
					alt1.overLayClearGroup("icon");
					alt1.overLaySetGroup("icon");
				}
				if (displaybox) {
					// Keep an eye on this in case it incorrectly gives numbers...
					if (window.alt1) {
						alt1.overLayRect(a1lib.mixColor(255, 144, 0), x1, y1, 32, 32, 1000, 1);
						if(((i * 8) + j + 1) >= 20)
							alt1.overLayText(((i * 8) + j + 1).toString(), a1lib.mixColor(255, 144, 0, 255), 18, x1 - 1, y1, 1000)
						else if(((i * 8) + j + 1) >= 10)
							alt1.overLayText(((i * 8) + j + 1).toString(), a1lib.mixColor(255, 144, 0, 255), 18, x1 - 3, y1, 1000)
						else if(((i * 8) + j + 1) < 10)
							alt1.overLayText(((i * 8) + j + 1).toString(), a1lib.mixColor(255, 144, 0, 255), 18, x1 + 5, y1, 1000)
					}
				}
				x1 += 32 + 23
				promises.push(itemtemp.push(await compareItems(crops[i][j])));
				console.log(itemtemp[j])
				if (localStorage.getItem("CrystalLogger/lagDetect") == "true") {
					if (itemtemp[j] == "Blank") {
						notBlank = true;
					}
					else if (itemtemp[j] !== "Blank" && notBlank) {
						//Do a thing. This detects whether there was a break or not.
						if (window.alt1) {
							alt1.overLayClearGroup("overlays");
							alt1.overLayClearGroup("lag");
							alt1.overLaySetGroup("lag");
							alt1.overLayTextEx("Lag detected, rescanning...", a1lib.mixColor(255, 144, 0), 20, Math.round(alt1.rsWidth / 2), 200, 1500, "", true, true);
						}
						lagDetected = true;
						lastValue = 0;
						lagCounter++;
						capture(autobool);
						return;
					}
				}
			}
			itemResults.push(itemtemp)
			x1 = xdefault
			y1 += 32 + 14
		}

		if (localStorage.getItem("CrystalLogger/lagDetect") == "true") {
			for (let i = 0; i < itemResults.length; i++) {
				if (itemResults[itemResults.length - 1] !== "Blank") {
					break;
				}
				else if (itemResults[i] !== "Blank") {
					continue;
				}
				else {
					if (seeConsoleLogs) console.log(itemResults[i]);

					let newImg = a1lib.captureHoldFullRs();
					let loc2: any;
					let x = 0
					let y = 0
					
					// TODO: Investigate this for changing tiers
					if (!legacy) {
						loc2 = newImg.findSubimage(imgs.crystalChest);
					}
					else {
						loc2 = newImg.findSubimage(imgs.crystalChest);
					}

					x = xdefault
					y = ydefault

					let row = i / 4
					let col = i % 8
					x += (32 + 23) * col;
					y += (32 + 14) * row;

					if (window.alt1) {
						alt1.overLayClearGroup("overlays");
						alt1.overLaySetGroup("overlays");
						alt1.overLayTextEx("Checking last item for lag...", a1lib.mixColor(255, 144, 0), 20, Math.round(alt1.rsWidth / 2), 170, 1000, "", true, true);
						alt1.overLayClearGroup("icon");
						alt1.overLaySetGroup("icon");
						alt1.overLayRect(a1lib.mixColor(125, 194, 33), x, y, 32, 32, 2000, 1);
					}

					let lastcrop = newImg.toData(x - 1, loc2[0].y + 39, 32, 32);
					let lastresult = "";
					let promises2 = [];
					promises2.push(lastresult = await compareItems(lastcrop));
					await Promise.all(promises2);
					if (seeConsoleLogs) console.log(itemResults, i);
					if (seeConsoleLogs) console.log("Comparing", lastresult, "to", itemResults[i]);

					// Consider doing a value check in here...
					
					// TODO: If capture issues with lag checking happen look here...
					// I think this might be fixed, but idk
					let comparison = true;
					if (autobool) {
						try {
							let itemResultsNoBlanks = []
							for (let i = 0; i < itemResults.length; i++) {
								if (itemResults[i] !== "Blank") {
									itemResultsNoBlanks.push(itemResults[i]);
								}
								else {
									break;
								}
							}
							let lsHistory = JSON.parse(localStorage.getItem("CrystalLogger/History"))[JSON.parse(localStorage.getItem("CrystalLogger/History")).length-1][0];
							if (seeConsoleLogs) console.log("Checking arrays for equivalence:",JSON.parse(localStorage.getItem("CrystalLogger/History"))[JSON.parse(localStorage.getItem("CrystalLogger/History")).length-1][0], itemResultsNoBlanks);
							if (lsHistory.join(',') === itemResultsNoBlanks.join(',')) { // https://stackoverflow.com/a/6230314
								if (seeConsoleLogs) console.log(lsHistory.join(','),"and",itemResultsNoBlanks.join(','),"are the same...");
								if (seeConsoleLogs) console.log("They're the same. make it false.");
								comparison = false;
							}
						} catch (e) {
							console.log("Something broke.", e);
						}
					}

					let lagDetectValue = new ClueRewardReader();
					lagDetectValue.pos = ModalUIReader.find()[0];

					if (!comparison) {
						if (window.alt1) {
							alt1.overLayClearGroup("overlays");
							alt1.overLayClearGroup("lag");
							alt1.overLaySetGroup("lag");
							alt1.overLayTextEx("Lag detected, rescanning...", a1lib.mixColor(255, 144, 0), 20, Math.round(alt1.rsWidth / 2), 200, 60000, "", true, true);
						}
						lagDetected = true;
						lastValue = 0;
						lagCounter++;
						capture(autobool);
						return;
					} // TODO: Put some console log test statements in here...
					else if (lastresult === itemResults[i]) {
						break;
					}
					else if (parseInt(lastValueList[0]) === parseInt("lagDetectValue")) {
						break;
					}
					else {
						if (window.alt1) {
							alt1.overLayClearGroup("overlays");
							alt1.overLayClearGroup("lag");
							alt1.overLaySetGroup("lag");
							alt1.overLayTextEx("Lag detected, rescanning...", a1lib.mixColor(255, 144, 0), 20, Math.round(alt1.rsWidth / 2), 200, 60000, "", true, true);
						}
						lagDetected = true;
						lastValue = 0;
						lagCounter++;
						capture(autobool);
						return;
					}
				}
			}
		}
		await Promise.all(promises);

		lagCounter = 0

		// TODO: See if this even does anything
		//Maybe comment this out later idk
		let equalArrays = true;
		if (autobool) {
			if (lastItems.length == 0) {
				if (seeConsoleLogs) console.log("last item length is 0. Pass...");
			}
			else {
				for (let i = 0; i < itemResults.length; i++) {
					if (itemResults[i] !== lastItems[i]) {
						equalArrays = false;
						if (seeConsoleLogs) console.log("Equal arrays false");
					}
				}
				if (prevValue == value && !equalArrays) {
					if (window.alt1) {
						alt1.overLayClearGroup("overlays");
						alt1.overLaySetGroup("overlays");
						alt1.overLayTextEx("                 Reward misread.\nPause Autocapture (if on) and restart\n  plugin or rollback, and try again.",
							a1lib.mixColor(255, 80, 80), 20, Math.round(alt1.rsWidth / 2), 200, 5000, "", true, true);
					}
					lastValue = prevValue;
					if (seeConsoleLogs) console.log("equal arrays is false, setting last value to previous value");
					return;
				}
			}
		}

		// Give me the quantity of the items!
		let quantResults = [];
		promises = [];
		for (let i = 0; i < 4; i++) {
			for(let j = 0; j < 8; j++){
				if (itemResults[i][j] == "Blank") {
					break;
				}
				promises.push(quantResults.push(await readQuantities(topCrops[i][j])));
			}
		}
		await Promise.all(promises);
		if (seeConsoleLogs) (quantResults);

		itemResults = await itemChecker(itemResults, quantResults, value)

		// Send it to the LS!
		promises = [];
		// console.log("Adding to LS",itemResults, quantResults, value)
		promises.push(await submitToLS(itemResults, quantResults, value));
		await Promise.all(promises);

		// Record data for last reward
		lastItems = itemResults.slice();
		lastQuants = quantResults.slice();
		// console.log("Adding to history",lastValue, lastItems, lastQuants, currentReward())
		addHistoryToLs(lastValue, lastItems, lastQuants, currentReward());
		
		// Put the items and quantites on the display!
		(document.getElementById("rewards_value") as HTMLSpanElement).textContent = value.toLocaleString("en-US");
		for (let i = 0; i < 4; i++) {
			for(let j = 0; j < 8; j++){
				if(rewardSlots[(i * 8) + j] == undefined){
					break;
				}
				(document.getElementById(rewardSlots[(i * 8) + j]) as HTMLDivElement).textContent = "";
			}
		}

		for (let i = 0; i < 4; i++) {
			for (let j = 0; j < 8; j++){
				// Displaying in Rewards Capture
				if(itemResults[i][j] == "Blank"){
					break;
				}
				let nodevar = document.createElement("itembox") as HTMLDivElement;
				let imgvar = document.createElement("img") as HTMLImageElement;
				let quantvar = document.createElement("span") as HTMLSpanElement;

				nodevar = nodeMaker(parseInt(quantResults[(i * 8) + j]), itemResults[i][j], "recent")
				imgvar = imgMaker(itemResults[i][j], parseInt(quantResults[(i * 8) + j]))
				quantvar = quantMaker(parseInt(quantResults[(i * 8) + j]))

				nodevar.append(quantvar);
				nodevar.append(imgvar);
				(document.getElementById(rewardSlots[(i * 8) + j]) as HTMLDivElement).appendChild(nodevar);
			}
		}

		//Show it on the screen!
		lootDisplay();

		//Display the victory screen!!!
		if (window.alt1) {
			alt1.overLayClearGroup("overlays");
			alt1.overLayClearGroup("rect");
			alt1.overLayClearGroup("lag");
			alt1.overLaySetGroup("overlays");
			alt1.overLayTextEx(currentRewardUpper() + " rewards captured successfully!",
				a1lib.mixColor(100, 255, 100), 20, Math.round(alt1.rsWidth / 2), 200, 4000, "", true, true);
			//TODO: Investigate this for changing tiers
			rectangleMaker(0, 255, 0, xRect, yRect, 1000)
		}
		lagDetected = false;
	} catch (e) {
		if (window.alt1) {
			alt1.overLayClearGroup("overlays");
			alt1.overLayClearGroup("lag");
			alt1.overLayClearGroup("rect");
			alt1.overLaySetGroup("overlays");
			alt1.overLayTextEx("        A crash occured.\n\n     Remove any obstructions, \n check tier, open a reward, \nreload plugin or clear database and try again",
				a1lib.mixColor(255, 80, 80), 20, Math.round(alt1.rsWidth / 2), 200, 5000, "", true, true);
		}
		buttonEnabler();
		console.log(e);
		throw(e)
		return;
	}
}


function rectangleMaker(r: number, g:number, b:number, xRect:number, yRect:number, timer:number){
	if(!legacy){
		if (currentReward()[0] == "taverley"){
			alt1.overLayRect(a1lib.mixColor(r, g, b), xRect, yRect, imgs.crystalChest.width + 350, imgs.crystalChest.height + 291, timer, 2);
		}
		else if (currentReward()[0] == "prifddinas"){
			alt1.overLayRect(a1lib.mixColor(r, g, b), xRect, yRect, imgs.crystalChest.width + 350, imgs.crystalChest.height + 291, timer, 2);
		}
		else if (currentReward()[0] == "triskelion"){
			alt1.overLayRect(a1lib.mixColor(r, g, b), xRect, yRect, imgs.triskelionTreasures.width + 294, imgs.triskelionTreasures.height + 291, timer, 2);
		}
		else if (currentReward()[0] == "alchemist"){
			alt1.overLayRect(a1lib.mixColor(r, g, b), xRect, yRect, imgs.alchemistsChest.width + 323, imgs.alchemistsChest.height + 291, timer, 2);
		}
	}
	else{
		if (currentReward()[0] == "taverley"){
			alt1.overLayRect(a1lib.mixColor(r, g, b), xRect, yRect, imgs.crystalChestLegacy.width + 352, imgs.crystalChestLegacy.height + 291, timer, 2);
		}
		else if (currentReward()[0] == "prifddinas"){
			alt1.overLayRect(a1lib.mixColor(r, g, b), xRect, yRect, imgs.crystalChestLegacy.width + 352, imgs.crystalChestLegacy.height + 291, timer, 2);
		}
		else if (currentReward()[0] == "triskelion"){
			alt1.overLayRect(a1lib.mixColor(r, g, b), xRect, yRect, imgs.triskelionTreasuresLegacy.width + 297, imgs.triskelionTreasuresLegacy.height + 291, timer, 2);
		}
		else if (currentReward()[0] == "alchemist"){
			alt1.overLayRect(a1lib.mixColor(r, g, b), xRect, yRect, imgs.alchemistsChestLegacy.width + 324, imgs.alchemistsChestLegacy.height + 291, timer, 2);
		}
	}
}


async function itemChecker(itemResults:any[], quantResults:any[], value:number){
	let newItemResults = itemResults.slice()

	if (currentReward()[0] == "taverley"){
	}
	else if (currentReward()[0] == "prifddinas"){
		//if((quantResults[1] == 1 && quantResults[2] == 2) && itemResults[0][1] == "Dwarf weed seed" || itemResults[0][1] == "Torstol seed"){
		//	newItemResults[0][1] = "Dwarf weed seed"
		//	newItemResults[0][2] = "Torstol seed"
		//}
	}
	else if (currentReward()[0] == "triskelion"){
		// if((quantResults[2] == 3 && quantResults[3] == 3 && quantResults[4] == 3) && itemResults[0][2] == "Lantadyme seed" || itemResults[0][2] == "Torstol seed" || itemResults[0][2] == "Lantadyme seed"){
		// 	newItemResults[0][2] = "Lantadyme seed"
		// 	newItemResults[0][3] = "Torstol seed"
		// 	newItemResults[0][4] = "Dwarf weed seed"
		// }
		// else if((quantResults[3] == 3 && quantResults[4] == 3 && quantResults[5] == 3) && itemResults[0][3] == "Lantadyme seed" || itemResults[0][3] == "Torstol seed" || itemResults[0][3] == "Lantadyme seed"){
		// 	newItemResults[0][3] = "Lantadyme seed"
		// 	newItemResults[0][4] = "Torstol seed"
		// 	newItemResults[0][5] = "Dwarf weed seed"
		// }
		// else if((quantResults[2] == 10 && quantResults[3] == 15) && itemResults[0][2] == "Grimy torstol" || itemResults[0][2] == "Grimy snapdragon" || itemResults[0][2] == "Grimy lantadyme" || itemResults[0][2] == "Grimy dwarf weed" || itemResults[0][2] == "Grimy avantoe"){
		// 	newItemResults[0][2] = "Grimy torstol"
		// 	newItemResults[0][3] = "Grimy snapdragon"
		// 	newItemResults[0][4] = "Grimy lantadyme"
		// 	newItemResults[0][5] = "Grimy dwarf weed"
		// 	newItemResults[0][6] = "Grimy avantoe"
		// }
		// else if((quantResults[3] == 10 && quantResults[4] == 15) && itemResults[0][3] == "Grimy torstol" || itemResults[0][3] == "Grimy snapdragon" || itemResults[0][3] == "Grimy lantadyme" || itemResults[0][3] == "Grimy dwarf weed" || itemResults[0][3] == "Grimy avantoe"){
		// 	newItemResults[0][3] = "Grimy torstol"
		// 	newItemResults[0][4] = "Grimy snapdragon"
		// 	newItemResults[0][5] = "Grimy lantadyme"
		// 	newItemResults[0][6] = "Grimy dwarf weed"
		// 	newItemResults[0][7] = "Grimy avantoe"
		// }
	}
	else if (currentReward()[0] == "alchemist"){
		if(itemResults[0][0] == "Cadantine seed" || itemResults[0][0] == "Kwuarm seed" || itemResults[0][0] == "Marrentill seed"){
			let cadantinePrice: number
			let kwuarmPrice: number
			let marrentillPrice: number

			try {
				await fetch("https://api.weirdgloop.org/exchange/history/rs/latest?name=Cadantine seed")
  					.then(function(response) {
  					  return response.json();
  					})
  					.then(function(data) {
  					  cadantinePrice = data["Cadantine seed"].price * quantResults[0];
  					});
			} catch (e) {
				if (seeConsoleLogs) console.log("It failed... setting to 0...");
				cadantinePrice = 0
    		}

			try {
				await fetch("https://api.weirdgloop.org/exchange/history/rs/latest?name=Kwuarm seed")
  					.then(function(response) {
  					  return response.json();
  					})
  					.then(function(data) {
  					  kwuarmPrice = data["Kwuarm seed"].price * quantResults[0];
  					});
			} catch (e) {
				if (seeConsoleLogs) console.log("It failed... setting to 0...");
				kwuarmPrice = 0
    		}

			try {
				await fetch("https://api.weirdgloop.org/exchange/history/rs/latest?name=Marrentill seed")
  					.then(function(response) {
  					  return response.json();
  					})
  					.then(function(data) {
  					  marrentillPrice = data["Marrentill seed"].price * quantResults[0];
  					});
			} catch (e) {
				if (seeConsoleLogs) console.log("It failed... setting to 0...");
				marrentillPrice = 0
    		}

			console.log(value,cadantinePrice,kwuarmPrice,marrentillPrice)

			if(value >= cadantinePrice && value <= cadantinePrice){
				newItemResults[0][0] = "Cadantine seed"
			}
			else if(value >= kwuarmPrice && value <= kwuarmPrice){
				newItemResults[0][0] = "Kwuarm seed"
			}
			else if(value >= marrentillPrice && value <= marrentillPrice){
				newItemResults[0][0] = "Marrentill seed"
			}
		}
	}
	return newItemResults
}


async function compareItems(item: ImageData) {
	//TODO: Try to get Legacy to work better
	//Legacy works, but I don't have a lot of testing materials

	// Can't use all at once. Can only do one color at a time.
	// const yellow = { r: 255, g: 0, b: 0, a: 255};
	// const black1 = { r: 0, g: 0, b: 0, a: 255};
	// const black2 = { r: 0, g: 0, b: 1, a: 255};
	// const black3 = { r: 0, g: 0, b: 2, a: 255};
	// const legacytan = { r: 62, g: 53, b: 40, a: 255};
	// const rs3blue = { r: 10, g: 31, b: 41, a: 255};

	// let colors = [yellow, black1, black2, black3]
	// Just hold this for now just in case...

	// Remove blank if not blank
	//	{output: {ignoreAreasColoredWith: colors}}
	// 	Choices are: yellow, black1, black2, black3, legacytan, rs3blue
	// all, twoplus, orglist, orgminus

	let matches = [];
	if (currentReward()[0] == "taverley"){
		if (!legacy) {
			matches = listOfItemsTArray.slice();
		}
		else { // Legacy works. But I don't test with it often. I think its okay...
			matches = listOfItemsLegacyTArray.slice();
		}
	}
	else if (currentReward()[0] == "prifddinas"){
		if (!legacy) {
			matches = listOfItemsPArray.slice();
		}
		else { // Legacy works. But I don't test with it often. I think its okay...
			matches = listOfItemsLegacyPArray.slice();
		}
	}
	else if (currentReward()[0] == "triskelion"){
		if (!legacy) {
			matches = listOfItemsKArray.slice();
		}
		else { // Legacy works. But I don't test with it often. I think its okay...
			matches = listOfItemsLegacyKArray.slice();
		}
	}
	else if (currentReward()[0] == "alchemist"){
		if (!legacy) {
			matches = listOfItemsAArray.slice();
		}
		else { // Legacy works. But I don't test with it often. I think its okay...
			matches = listOfItemsLegacyAArray.slice();
		}
	}

	//Check if the item is blank first
	let imgdata = await compareImages(item, matches[0][1], { output: {}, ignore: "less" });
	matches[0][2] = imgdata.rawMisMatchPercentage;
	if (matches[0][2] == 0.00) {
		return "Blank";
	}
	matches.shift(); // Remove blank from the list

	let found = [];
	if (localStorage.getItem("CrystalLogger/Algorithm") == "resemblejs") {
		found = matches[0];
		const promises = [];

		for (let i = 0; i < matches.length; i++) {
			promises.push(await compareImages(item, matches[i][1], { output: {}, ignore: "less" }).then(data => {
				matches[i][2] = data.rawMisMatchPercentage;
			}));
			if (found[2] > matches[i][2]) {
				found = matches[i];
			}	
		}
		await Promise.all(promises);
	}

	else if (localStorage.getItem("CrystalLogger/Algorithm") == "pixelmatch") {
		/* List of items that do not identify in pure PixelMatch
			- Huge Plated Adamant Salvage identifies as Huge Plated Rune Salvage when using TwoPlus or All
		*/

		found = matches[0];
		const promises = [];
		for (let i = 0; i < matches.length; i++) {
			promises.push(matches[i][2] = pixelmatch(item.data, matches[i][3].data, null, item.width, item.height, {includeAA: true, threshold: 0.1 }));
			if (found[2] > matches[i][2]) {
				found = matches[i];
			}
		}
		await Promise.all(promises);
	}

	else if (localStorage.getItem("CrystalLogger/Algorithm") == "hybrid") {
		// First we check with Pixelmatch and get the comparison of everything to the item
		let promises = [];
		let total = 0;
		for (let i = 0; i < matches.length; i++) {
			promises.push(matches[i][2] = pixelmatch(item.data, matches[i][3].data, null, item.width, item.height, {includeAA: true, threshold: 0.1 }));
			total += matches[i][2];
		}

		// Then we get the average so we can remove half of the items that don't match
		let average = total / matches.length;
		let precision = parseFloat(localStorage.getItem("CrystalLogger/hybridPrecision")); //1 does nothing
		await Promise.all(promises);

		for (let i = matches.length-1; i >= 0; i--) {
			if (matches[i][2] > (average * precision)) {
				matches.splice(i,1);
			}
		}

		//Now we find the correct item with ResembleJS!
		promises = [];
		found = matches[0];
		for (let i = 0; i < matches.length; i++) {
			promises.push(await compareImages(item, matches[i][1], { output: {}, ignore: "less" }).then(data => {
				matches[i][2] = data.rawMisMatchPercentage;
			}));
			if (found[2] > matches[i][2]) {
				found = matches[i]
			}	
		}
		await Promise.all(promises);
	}
	return found[0];
}


async function readQuantities(item: ImageData) {
	// Instead of reading top to bottom individulally, 
	// Read from left to right Read left to right with all columns together
	// And since the height is always the same I dont have to worry about changing
	// the value of the width of the number.

	// Maybe consider this for optimizations :^?
	let itemCan = document.createElement("canvas") as HTMLCanvasElement;
	let itemCon = itemCan.getContext('2d');
	itemCan.width = item.width;
	itemCan.height = item.height;
	itemCon.putImageData(item, 0, 0);
	let itemImg = new Image();
	itemImg.src = itemCan.toDataURL("image/png");
	itemCon.drawImage(itemImg, 0, 0);
	let pixels = itemCon.getImageData(0, 0, item.width, item.height);
	let pixarr = [];
	let pixeldata = 0;
	for (let i = 0; i < 8; i++) {
		let arr2 = [];
		for (let j = 0; j < 32; j++) {
			let vals = { r: pixels.data[pixeldata], g: pixels.data[pixeldata + 1], b: pixels.data[pixeldata + 2], a: pixels.data[pixeldata + 3] };
			pixeldata += 4;
			arr2.push(vals);
		}
		pixarr.push(arr2);
	}

	let pixelCount = 0;
	let streak = 0;
	let longestStreak = 0;
	let yellowInCol = false;
	let noYellowStreak = 0;
	let numbers = "";

	for (let i = 0; i < pixarr[0].length; i++) {
		if (noYellowStreak == 3) {
			break;
		}

		for (let j = 0; j < pixarr.length; j++) {
			if (pixarr[j][i].r == 255 && pixarr[j][i].g == 255 && pixarr[j][i].b == 0 ||   // Yellow, Every screen has this
				pixarr[j][i].r == 255 && pixarr[j][i].g == 254 && pixarr[j][i].b == 0 ||   // Very slightly darker yellow, a screenie had this...
				pixarr[j][i].r == 254 && pixarr[j][i].g == 254 && pixarr[j][i].b == 0 ||   // Very slightly darker yellow, a screenie had this...
				pixarr[j][i].r == 253 && pixarr[j][i].g == 253 && pixarr[j][i].b == 0 ||   // Slightly darker yellow, for safety
				pixarr[j][i].r == 255 && pixarr[j][i].g == 255 && pixarr[j][i].b == 255) { // White, elites and masters only
				pixelCount++;
				streak++;
				noYellowStreak = 0;
				yellowInCol = true;
				if (streak > longestStreak) {
					longestStreak = streak;
				}
			}
			else {
				streak = 0;
			}
		}
		if (pixelCount == 0) {
			noYellowStreak++;
		}
		else if (yellowInCol == false) {
			if (pixelCount == 11) {
				if (longestStreak == 3) {
					numbers += "7";
				}
				else { // 9
					numbers += "1";
				}
			}
			else if (pixelCount == 13) {
				if (longestStreak == 3) {
					numbers += "3";
				}
				else {//if 6
					numbers += "4";
				}
			}
			else if (pixelCount == 14) {
				numbers += "0";
			}
			else if (pixelCount == 15) {
				if (longestStreak == 3) {
					numbers += "2";
				}
				else if (longestStreak == 4) {
					numbers += "5";
				}
				else if (longestStreak == 7) {
					numbers += "9";
				}
				else { //if 8
					numbers += "000";
					pixelCount = 0;
					break;
				}
			}

			else if (pixelCount == 18) {
				numbers += "6";
			}
			else { // if pixelCount == 19
				numbers += "8";
			}

			longestStreak = 0;
			pixelCount = 0;
			noYellowStreak++;
		}
		yellowInCol = false;
	}
	if (pixelCount > 5) {
		numbers += "0";
	}
	if (numbers != "") {
		return numbers;
	}
	else {
		return "1";
	}
}


async function submitToLS(item: any[], quant: any[], value: any) {
	//Add items to database
	if (seeConsoleLogs) console.log("Adding to database...");
	console.log(item, quant, value)
	for (let i = 0; i < 4; i++) {
		for(let j = 0; j < 8; j++){
			// If you get null or undefined here, check if one of your rewards doesn't exist in LocalStorage or LocalStorageInit
			// Or maybe the name might be incorrectly written in, idk
			// console.log("checking if in array", item[i]);
			if(item[i][j] == "Blank" || item[i][j] == undefined){
				break;
			}

			let tempQuant = quant[(i * 8) + j].slice();
			console.log("tempQuant", tempQuant)
			if (quant[(i * 8) + j].includes('k')) {
				tempQuant = tempQuant.slice(0, -1);
				tempQuant += "000";
			}

			// console.log(item[i][j], items[item[i][j]].quantity, tempQuant)
			  
			items[item[i][j]].quantity[currentReward()[0]] = parseInt(items[item[i][j]].quantity[currentReward()[0]]) + parseInt(tempQuant);
			updateItems();

			// console.log(items[item[i][j]].quantity[currentReward()[0]])
		}
	}

	// Increase value and count
	localStorage.setItem(currentReward()[1], JSON.stringify((JSON.parse(localStorage.getItem(currentReward()[1])) + value)));
	localStorage.setItem(currentReward()[2], JSON.stringify((JSON.parse(localStorage.getItem(currentReward()[2])) + 1)));

	return true;
}


async function addHistoryToLs(value: number, item: any, quants: any, reward: any) {
	// The order of how History items are logged
	// Index 0: Items (Array)
	// Index 1: Quantities (Array)
	// Index 2: Value
	// Index 3: "Reward" or "Reward [C] "
	// Index 4: reward count
	// Index 5: History Primary Key
	// Index 6: Date and time captured
	let itemsArr = []
	for (let i = 0; i < item.length; i++) {
		for (let j = 0; j < item[i].length; j++) {
			console.log("Checking if",item[i][j],"is equal to","Blank")
			if(item[i][j] !== "Blank" || item[i][j] != undefined){
				itemsArr.push(item[i][j])
			}
		}
	}
	
	for (let i = 0; i < quants.length; i++) {
		if (quants[i].includes('k')) {
			quants[i] = quants[i].slice(0, -1);
			quants[i] += "000";
		}
	}

	let currentDateTime = await dateGetter()
	
	let previous = [itemsArr, quants, value, reward, localStorage.getItem(currentReward()[2]), localStorage.getItem("CrystalLogger/PrimaryKeyHistory"), currentDateTime];
	let temp = JSON.parse(localStorage.getItem("CrystalLogger/History"))
	temp.push(previous);

	localStorage.setItem("CrystalLogger/History", JSON.stringify(temp));
	localStorage.setItem("CrystalLogger/PrimaryKeyHistory", JSON.stringify(parseInt(localStorage.getItem("CrystalLogger/PrimaryKeyHistory")) + 1));

	await historyClear();
	historyInit();
}


function lootDisplay() {
	//Set Number of clues and Current and Average values
	(document.getElementById("number_of_rewards") as HTMLSpanElement).textContent = parseInt(JSON.parse(localStorage.getItem(currentReward()[2]))).toLocaleString("en-US");
	(document.getElementById("value_of_rewards") as HTMLSpanElement).textContent = parseInt(JSON.parse(localStorage.getItem(currentReward()[1]))).toLocaleString("en-US");
	console.log(Math.round(parseInt(JSON.parse(localStorage.getItem(currentReward()[2]))) / parseInt(JSON.parse(localStorage.getItem(currentReward()[1])))).toLocaleString("en-US"))
	if (parseInt(JSON.parse(localStorage.getItem(currentReward()[2]))) != 0) {
		(document.getElementById("average_of_rewards") as HTMLSpanElement).textContent = Math.round(parseInt(JSON.parse(localStorage.getItem(currentReward()[1]))) / parseInt(JSON.parse(localStorage.getItem(currentReward()[2])))).toLocaleString("en-US");
	}
	else {
		(document.getElementById("average_of_rewards") as HTMLSpanElement).textContent = "0";
	}

	//Set the icons in the tabs
	tabDisplay();
}


function tabDisplay() {
	let keys = Object.keys(items);
	let divs = document.getElementsByClassName("loot_display") as HTMLCollectionOf<HTMLDivElement>;
	for (let i = 0; i < divs.length; i++) {
		divs[i].textContent = "";
	}
	for (let i = 0; i < keys.length; i++) {
		// TODO: Interesting tidbit: Comment out this if block to display every item, 
		// but quantities will be undefined for the given tier if it doesn't exist in it.
		if (items[keys[i]].quantity[currentReward()[0]] == undefined || items[keys[i]].quantity[currentReward()[0]] == 0) {
			continue;
		}
		console.log(keys[i])
		let ele = document.getElementById(items[keys[i]].tab + "_loot") as HTMLDivElement;
		let nodevar = document.createElement("itembox");
		let imgvar = document.createElement("img");
		let quantvar = document.createElement("span");


		nodevar = nodeMaker(parseInt(items[keys[i]].quantity[currentReward()[0]]), keys[i], "tab");
		nodevar.style.order = orderChecker(parseInt(items[keys[i]].order), keys[i]).toString();
		
		// This if else only exists for when I comment out the above if block.
		// Nice for viewing all of the loot.
		if (items[keys[i]].quantity[currentReward()[0]] == undefined) {
			quantvar = quantMaker(0);
			imgvar = imgMaker(keys[i], 0);
		}
		else {
			quantvar = quantMaker(items[keys[i]].quantity[currentReward()[0]]);
			imgvar = imgMaker(keys[i], items[keys[i]].quantity[currentReward()[0]]);
		}

		nodevar.append(quantvar);
		nodevar.append(imgvar);
		ele.append(nodevar);
	}
}


async function historyClear() {
	removeChildNodes(document.getElementById("history_body") as HTMLDivElement);
}


function historyInit() {
	let lsHistory = JSON.parse(localStorage.getItem("CrystalLogger/History"))

	let title = document.getElementById("history_tier_caps") as HTMLDivElement;
	title.textContent = currentRewardUpper();

	let quantity = document.getElementById("history_quantity") as HTMLDivElement;
	quantity.textContent = localStorage.getItem("CrystalLogger/HistoryDisplayLimit");

	if (lsHistory.length == 0) {
		let ele = document.getElementById("history_body");
		let container = document.createElement("div") as HTMLDivElement;
		container.textContent = "There's nothing to display. Start scanning!"
		container.setAttribute('class','nothingToDisplayContainer')
		ele.append(container);
	}
	else {
		let index = parseInt(localStorage.getItem(currentReward()[2]));
		let limit = 0;
		for (let i = lsHistory.length - 1; i >= 0 ; i--) { //Navigating lsHistory
			if (limit < parseInt(localStorage.getItem("CrystalLogger/HistoryDisplayLimit"))) {
				let temp = lsHistory[i];
				if (temp[3][0].replace(" [C] ","") === currentReward()[0]) {
					let ele = document.getElementById("history_body") as HTMLDivElement;
					let container = document.createElement("div") as HTMLDivElement;
					container.setAttribute("class", "historyDisplayContainer");
					container.setAttribute('id','container' + temp[5]);

					let dateBox = document.createElement("div") as HTMLDivElement;
					let dateImg = document.createElement("div") as HTMLDivElement;
					
					dateBox.setAttribute('class', 'dateBox')
					dateImg.setAttribute('class', 'dateImage')
					dateImg.setAttribute('title', 'Date Captured: ' + temp[6])
				
					dateBox.append(dateImg)
					container.append(dateBox)

					if (temp[3][0].includes(" [C] ")) {
						let customSpan = document.createElement("span") as HTMLSpanElement;
						customSpan.setAttribute("class", "customSpan");
						customSpan.setAttribute("title", "Custom reward manually inserted.");
						customSpan.textContent = " [C] ";
						let countText = currentRewardUpper() + " reward: " + index;

						let count = document.createElement("div") as HTMLDivElement;
						count.innerHTML = countText;
						count.setAttribute('class', 'historyCount');
						count.append(customSpan);
						container.append(count);
					}
					else {
						let count = document.createElement("div") as HTMLDivElement;
						count.textContent = currentRewardUpper() + " reward: " + index;
						count.setAttribute('class', 'historyCount');
						container.append(count);
					}

					let value = document.createElement("div") as HTMLDivElement;
					value.textContent = "Reward Value: " + temp[2].toLocaleString("en-US");
					value.setAttribute('class','historyValue');
					container.append(value);

					let TPcheck = false
					for (let j = 0; j < 4; j++) { // Navigating temp
						for(let k = 0; k < 8; k++){
							if(temp[0][(j * 8) + k] == "Blank" || temp[0][(j * 8) + k] == undefined){
								if(TPcheck){
									break;
								}
								for(let l = (j * 8) + k; l < cap; l++){
									let nodevar = document.createElement("itembox") as HTMLDivElement;
									let imgvar = document.createElement("img") as HTMLImageElement;
									let quantvar = document.createElement("span") as HTMLSpanElement;

									imgvar = imgMaker("Transparent", temp[1][(j * 8) + k]);
									nodevar.setAttribute("class", "node_history");
									nodevar.removeAttribute("title");
									quantvar.textContent = "";
								
									nodevar.append(imgvar);
									nodevar.append(quantvar);
									container.append(nodevar);
								}
								TPcheck = true
								break;
							}

							let nodevar = document.createElement("itembox") as HTMLDivElement;
							let imgvar = document.createElement("img") as HTMLImageElement;
							let quantvar = document.createElement("span") as HTMLSpanElement;
						
							// Note for later. Figure out why insert isnt displaying properly...
						
							if (temp[1][(j * 8) + k] === undefined) {
								imgvar = imgMaker("Transparent", temp[1][(j * 8) + k]);
								nodevar.setAttribute("class", "node_history");
								nodevar.removeAttribute("title");
								quantvar.textContent = "";
							}
							else {
								imgvar = imgMaker(temp[0][(j * 8) + k], temp[1][(j * 8) + k]);
								nodevar = nodeMaker(parseInt(temp[1][(j * 8) + k]), temp[0][(j * 8) + k], "history");
								quantvar = quantMaker(temp[1][(j * 8) + k]);
							}
						
							nodevar.append(imgvar);
							nodevar.append(quantvar);
							container.append(nodevar);
						}
					}
				
					let buttonbox = document.createElement("div") as HTMLDivElement;
					let button = document.createElement("div") as HTMLDivElement;
					buttonbox.setAttribute('class','buttonboxHistory');
					buttonbox.setAttribute('id','container'+temp[5]+'buttonbox');
					button.setAttribute('class','nisbutton historyButtonStyle');
					button.setAttribute('id','container'+temp[5]+'button');
					button.setAttribute('onClick','TEST.rollbackVeri("container'+temp[5]+'button")');
					button.textContent = "Delete";

					buttonbox.append(button);
					container.append(buttonbox);
					ele.append(container);
					index--;
					limit++;
				}
			}
			else {
				break;
			}
		}

		if (index == parseInt(localStorage.getItem(currentReward()[2]))) {
			let ele = document.getElementById("history_body") as HTMLDivElement;
			let container = document.createElement("div") as HTMLDivElement;
			container.textContent = "There's nothing to display. Start scanning!";
			container.setAttribute('class','nothingToDisplayContainer');
			ele.append(container);
		}
	}
}


export function rollbackVeri(id: any) {
	let buttonbox = document.getElementById(id+"box") as HTMLDivElement;
	let button = document.getElementById(id) as HTMLDivElement;
	buttonbox.removeChild(button);

	let buttonYes = document.createElement("div") as HTMLDivElement;
	let buttonNo = document.createElement("div") as HTMLDivElement;

	buttonbox.setAttribute('class','buttonBoxHistoryVerify');

	buttonYes.setAttribute('class','nisbutton buttonVerif');
	buttonYes.setAttribute('onclick','TEST.rollbackYes("'+id+'")');
	buttonYes.textContent = "Yes";

	buttonNo.setAttribute('class','nisbuttonblue buttonVerif');
	buttonNo.setAttribute('onclick','TEST.rollbackNo("'+id+'")');
	buttonNo.textContent = "No";

	buttonbox.append(buttonYes, buttonNo);
}


export function rollbackYes(id: any) {
	if (window.alt1) {
		alt1.overLayClearGroup("overlays");
		alt1.overLaySetGroup("overlays");
		alt1.overLayTextEx("Rolling back reward...", a1lib.mixColor(255, 144, 0), 20, Math.round(alt1.rsWidth / 2), 200, 2000, "", true, true);
	}
	if (seeConsoleLogs) console.log("Rolling back reward from history...");

	let container = document.getElementById(id.replace('button', '')) as HTMLDivElement;
	container.remove();

	let pKey = parseInt(id.replace('container','').replace('button',''));

	let lsHistory = JSON.parse(localStorage.getItem("CrystalLogger/History"));
	let temp = [];
	for (let i = 0; i < lsHistory.length; i++) {
		if (lsHistory[i][5] == pKey) {
			temp = lsHistory[i];
			lsHistory.splice(i, 1);
			localStorage.setItem("CrystalLogger/History",JSON.stringify(lsHistory));
			break;
		}
	}
	
	for (let i = 0; i < temp[0].length; i++) {
		console.log(temp[0][i])
		if(temp[0][i] == "Blank"){
			break;
		}
		items[temp[0][i]].quantity[currentReward()[0]] = items[temp[0][i]].quantity[currentReward()[0]] - parseInt(temp[1][i]);
		updateItems();
	}

	// Decrease value and count
	localStorage.setItem(currentReward()[1], JSON.stringify(JSON.parse(localStorage.getItem(currentReward()[1])) - temp[2]));
	localStorage.setItem(currentReward()[2], JSON.stringify(JSON.parse(localStorage.getItem(currentReward()[2])) - 1));

	if (seeConsoleLogs) console.log("Removed",temp,":",pKey,"from LS");
	if (pKey == ((parseInt(localStorage.getItem("CrystalLogger/PrimaryKeyHistory"))) - 1)) {
		(document.getElementById("rewards_value") as HTMLDivElement).textContent = "0";
		for (let i = 0; i < 4; i++) {
			for(let j = 0; j < 8; j++){
				if(rewardSlots[(i * 8) + j] == undefined){
					break;
				}
				(document.getElementById(rewardSlots[(i * 8) + j]) as HTMLDivElement).textContent = "";
			}
		}
	}

	let historyCount = document.getElementsByClassName('historyCount') as HTMLCollectionOf<HTMLDivElement>;
	let index = parseInt(localStorage.getItem(currentReward()[2]));
	for (let i = 0; i < parseInt(localStorage.getItem(currentReward()[2])); i++) {
		if (i >= parseInt(localStorage.getItem("CrystalLogger/RollbackDisplayLimit"))) {
			break;
		}
		if (historyCount[i] == undefined) {
			continue;
		}
		historyCount[i].textContent = "Casket reward: " + index;
		index--;
	}

	historyClear();
	historyInit();
	lootDisplay();

	if (window.alt1) {
		alt1.overLayClearGroup("overlays");
		alt1.overLaySetGroup("overlays");
		alt1.overLayTextEx("Previous rewards rolled back successfully!", a1lib.mixColor(100, 255, 100), 20, Math.round(alt1.rsWidth / 2), 200, 2000, "", true, true);
	}
}


export function rollbackNo(id: any) {
	let buttonbox = document.getElementById(id+"box") as HTMLDivElement;
	removeChildNodes(buttonbox);
	buttonbox.setAttribute('class','buttonboxHistory');
	
	let button = document.createElement("div") as HTMLDivElement;
	button.setAttribute('class','nisbutton historyButtonStyle');
	button.setAttribute('id', id);
	button.setAttribute('onClick','TEST.rollbackVeri("'+id+'")');
	button.textContent = "Delete";

	buttonbox.append(button);
}


export function insertInitEx() {
	insertInit();
}


async function insertInit() {
	let keys = Object.keys(items);
	let list = [["Blank", "~Nothing~", 0]];
	for (let i = 0; i < keys.length; i++) {
		if (items[keys[i]].tier.includes(currentReward()[0])) {
			list.push([keys[i], keys[i], items[keys[i]].order]);
		}
	}

	list.sort(function (a: any, b: any) { // https://stackoverflow.com/a/16097058
		if (a[2] === b[2]) return 0;
		else return (a[2] < b[2]) ? -1 : 1;
	});

	let itemBoxes = document.getElementsByClassName("items") as HTMLCollectionOf<HTMLSelectElement>;
	let quantBoxes = document.getElementsByClassName("item_quants") as HTMLCollectionOf<HTMLInputElement>;
	let valueBox = document.getElementById("value_input") as HTMLInputElement;
	valueBox.value = "0";

	for (let i = 0; i < itemBoxes.length; i++) {
		removeChildNodes(itemBoxes[i]) ;
		quantBoxes[i].value = "0";

		for (let j = 0; j < list.length; j++) {
			let option = document.createElement('option') as HTMLOptionElement;
			option.value = list[j][0].toString();
			option.textContent = list[j][1].toString();
			option.setAttribute('class', "insert_options");
			itemBoxes[i].append(option);
		}
	}
}


export async function fetchFromGE() {
	if (window.alt1) {
		alt1.overLayClearGroup("overlays");
		alt1.overLaySetGroup("overlays");
		alt1.overLayTextEx("Fetching prices from GE...",a1lib.mixColor(255, 144, 0), 20, Math.round(alt1.rsWidth / 2), 200, 40000, "", true, true);
	}

	let itemsList = []
	let quants = []
	let itemDivs = document.getElementsByClassName("items") as HTMLCollectionOf<HTMLSelectElement>
	let quantDivs = document.getElementsByClassName("item_quants") as HTMLCollectionOf<HTMLInputElement>

	for (let i = 0; i < itemDivs.length; i++) {
		if (itemDivs[i].options[itemDivs[i].selectedIndex].value == "Blank") {
			continue;
		}
		// OpenLogger relics.
		if (["Saradomin page", "Guthix page", "Zamorak page", "Armadyl page", "Bandos page", "Ancient page"].includes(itemDivs[i].options[itemDivs[i].selectedIndex].value)) {	
			itemsList.push((itemDivs[i].options[itemDivs[i].selectedIndex].value) + " 1");
		}
		else if (["Ourg tower-goblin cower shield (damaged)"].includes(itemDivs[i].options[itemDivs[i].selectedIndex].value)) {
			itemsList.push((itemDivs[i].options[itemDivs[i].selectedIndex].value).replace("-","/"));
		}
		else {   
			itemsList.push((itemDivs[i].options[itemDivs[i].selectedIndex].value));
		}
		quants.push(parseInt(quantDivs[i].value));
	}
	if (seeConsoleLogs) console.log("Fetched items from GE are", itemsList, "quants are", quants);

	if (itemsList.length == 0) {
		if (window.alt1) {
			alt1.overLayClearGroup("overlays");
			alt1.overLaySetGroup("overlays");
			alt1.overLayTextEx("Nothing selected to fetch.\nTry selecting some items.",
				a1lib.mixColor(255, 144, 0), 20, Math.round(alt1.rsWidth / 2), 200, 4000, "", true, true);
		}
		if (seeConsoleLogs) console.log("No items...");
		return;
	}

	let prices = [];
	for (let i = 0; i < itemsList.length; i++) {
		try {
			await fetch("https://api.weirdgloop.org/exchange/history/rs/latest?name=" + itemsList[i].replace("+","%2B").replace("+","%2B"))
  				.then(function(response) {
  				  return response.json();
  				})
  				.then(function(data) {
  				  prices.push(data[itemsList[i]].price);
  				});
		} catch (e) {
			if (seeConsoleLogs) console.log(          "It failed... setting to 0...", itemsList[i], itemsList[i].replace("+","%2B").replace("+","%2B"));
			prices.push(0);
    	}
	}

	let grandTotal = 0;
	for (let i = 0; i < itemsList.length; i++) {
		if (itemsList[i] == "Coins") {
			grandTotal += quants[i];
		}
		else {
			grandTotal += (quants[i] * prices[i]);
		}
	}
	let ele = document.getElementById("value_input") as HTMLInputElement;
	ele.value = grandTotal + "";

	if (window.alt1) {
		alt1.overLayClearGroup("overlays");
		alt1.overLaySetGroup("overlays");
		alt1.overLayTextEx("Prices fetched successfully!",
			a1lib.mixColor(100, 255, 100), 20, Math.round(alt1.rsWidth / 2), 200, 4000, "", true, true);
	}
}

export async function verifyInsert(event: Event) {
	if (seeConsoleLogs) console.log("Collecting info from insert...");
	let itemsList = [];
	let quants = [];
	let totalPrice = parseInt((document.getElementById("value_input") as HTMLInputElement).value);
	let itemDivs = document.getElementsByClassName("items") as HTMLCollectionOf<HTMLSelectElement>;
	let quantDivs = document.getElementsByClassName("item_quants") as HTMLCollectionOf<HTMLInputElement>;

	removeChildNodes(document.getElementById("value_input") as HTMLDivElement);

	for (let i = 0; i < 4; i++) {
		for (let j = 0; j < 8; j++) {
			if(itemDivs[(i * 8) + j] == undefined){
				break;
			}
			if (itemDivs[(i * 8) + j].options[itemDivs[(i * 8) + j].selectedIndex].value == "Blank") {
				continue;
			}
			itemsList.push(itemDivs[(i * 8) + j].options[itemDivs[(i * 8) + j].selectedIndex].value);
			quants.push(parseInt(quantDivs[(i * 8) + j].value));
		}
	}
	if (seeConsoleLogs) console.log("items verifying are", itemsList, "quants are", quants);

	console.log(itemsList.length)
	if (itemsList.length == 0) {   
		if (window.alt1) {
			alt1.overLayClearGroup("overlays");
			alt1.overLaySetGroup("overlays");
			alt1.overLayTextEx("Nothing selected to insert.\n\u200a\u200aTry selecting some items.",
				a1lib.mixColor(255, 144, 0), 20, Math.round(alt1.rsWidth / 2), 200, 4000, "", true, true);
		}
		if (seeConsoleLogs) console.log("No items...");
		event.stopPropagation();
		return;
	}

	let curr = (parseInt(localStorage.getItem(currentReward()[2])) + 1).toString();
	let ele = document.getElementById("insertVerif_body") as HTMLDivElement;
	let container = document.createElement("div") as HTMLDivElement;
	container.setAttribute("class", 'historyDisplayContainer');
	container.setAttribute('id','container' + curr);

	let dateBox = document.createElement("div") as HTMLDivElement;
	let dateImg = document.createElement("div") as HTMLDivElement;
	
	dateBox.setAttribute('class', 'dateBox')
	dateImg.setAttribute('class', 'dateImage')
	dateImg.setAttribute('title', 'Date Captured: ' + (await dateGetter()))

	dateBox.append(dateImg)
	container.append(dateBox)

	let customSpan = document.createElement("span") as HTMLSpanElement;
	customSpan.setAttribute("class", "customSpan");
	customSpan.setAttribute("title", "Custom clue manually inserted.");
	customSpan.textContent = " [C] ";

	let countText = currentReward()[0] + " rewards" + ": " + curr;
	let count = document.createElement("div") as HTMLDivElement;
	count.innerHTML = countText;
	count.setAttribute('class','historyCount');
	count.setAttribute('title', 'Date Captured: ' + await dateGetter())
	count.append(customSpan);
	container.append(count);

	let value = document.createElement("div") as HTMLDivElement;
	value.textContent = "Reward Value: " + totalPrice.toLocaleString("en-US");
	value.setAttribute('class','historyValue');
	value.setAttribute('title', 'Date Captured: ' + await dateGetter())
	container.append(value);

	let TPcheck = false
	for (let j = 0; j < 4; j++) { // Navigating temp
		for(let k = 0; k < 8; k++){
			if(itemsList[(j * 8) + k] == "Blank" || itemsList[(j * 8) + k] == undefined){
				if(TPcheck){
					break;
				}
				for(let l = (j * 8) + k; l < cap; l++){
					let nodevar = document.createElement("itembox") as HTMLDivElement;
					let imgvar = document.createElement("img") as HTMLImageElement;
					let quantvar = document.createElement("span") as HTMLSpanElement;

					imgvar = imgMaker("Transparent", quants[(j * 8) + k]);
					nodevar.setAttribute("class", "node_history");
					nodevar.removeAttribute("title");
					quantvar.textContent = "";

					nodevar.append(imgvar);
					nodevar.append(quantvar);
					container.append(nodevar);
				}
				TPcheck = true
				break;
			}

			let nodevar = document.createElement("itembox") as HTMLDivElement;
			let imgvar = document.createElement("img") as HTMLImageElement;
			let quantvar = document.createElement("span") as HTMLSpanElement;

			// Note for later. Figure out why insert isnt displaying properly...

			if (quants[(j * 8) + k] === undefined) {
				imgvar = imgMaker("Transparent", quants[(j * 8) + k]);
				nodevar.setAttribute("class", "node_history");
				nodevar.removeAttribute("title");
				quantvar.textContent = "";
			}
			else {
				imgvar = imgMaker(itemsList[(j * 8) + k], quants[(j * 8) + k]);
				nodevar = nodeMaker(parseInt(quants[(j * 8) + k]), itemsList[(j * 8) + k], "history");
				quantvar = quantMaker(quants[(j * 8) + k]);
			}

			nodevar.append(imgvar);
			nodevar.append(quantvar);
			container.append(nodevar);
		}
	}
	
	let buttonbox = document.createElement("div") as HTMLDivElement;
	let button = document.createElement("div") as HTMLDivElement;
	buttonbox.setAttribute('class','buttonboxHistory');
	buttonbox.setAttribute('id','container'+ curr +'buttonbox');
	button.setAttribute('class','nisbutton historyButtonStyle');
	button.setAttribute('id','container'+ curr +'button');
	button.textContent = "Sample";
	
	let customTier = currentReward();
	customTier[0] += " [C] ";
	insertVerif = [itemsList, quants, totalPrice, customTier];

	buttonbox.append(button);
	container.append(buttonbox);
	ele.append(container);

	if (seeConsoleLogs) console.log("Insert collected");
}

export function insertToDB() {
	if (window.alt1) {
		alt1.overLayClearGroup("overlays");
		alt1.overLaySetGroup("overlays");
		alt1.overLayTextEx("Submitting custom " + currentReward()[0] + "reward to Database...",
			a1lib.mixColor(255, 144, 0), 20, Math.round(alt1.rsWidth / 2), 200, 40000, "", true, true);
	}

	console.log(insertVerif)

	let itemsList = insertVerif[0];
	let itemsList2D = []
	for(let i = 0; i < 4; i++){
		let templist = []
		for(let j = 0; j < 8; j++){
			if(itemsList[(i * 8) + j] == undefined)
				itemsList.push("Blank")
			templist.push(itemsList[(i * 8) + j])
		}
		itemsList2D.push(templist)
	}
	console.log(itemsList2D)

	let quants = [];
	for (let i = 0; i < insertVerif[1].length; i++) {
		quants.push(insertVerif[1][i].toString());
	}

	console.log(quants)

	let value = insertVerif[2];
	let tier = insertVerif[3];
	
	insertInit();
	submitToLS(itemsList2D, quants, parseInt(value));
	addHistoryToLs(parseInt(value), itemsList2D, quants, tier);
	lootDisplay();

	if (window.alt1) {
		alt1.overLayClearGroup("overlays");
		alt1.overLaySetGroup("overlays");
		alt1.overLayTextEx("Custom " + currentReward()[0] + " rewards submitted successfully!",
			a1lib.mixColor(100, 255, 100), 20, Math.round(alt1.rsWidth / 2), 200, 4000, "", true, true);
	}
}


export function settingsInit() {
	if (seeConsoleLogs) console.log("Initializing settings...");

	if (seeConsoleLogs) console.log("Setting previously set radio button for Algorithm: " + localStorage.getItem("CrystalLogger/Algorithm") + "...");
	let temp = localStorage.getItem("CrystalLogger/Algorithm");
	let ele = document.getElementById(temp) as HTMLInputElement;
	ele.checked = true;

	if (seeConsoleLogs) console.log("Setting previously set radio button for lagDetect: " + localStorage.getItem("CrystalLogger/lagDetect") + "...");
	if (localStorage.getItem("CrystalLogger/lagDetect") == "true") {
		ele = document.getElementById("lagon") as HTMLInputElement;
		ele.checked = true;
	}
	else if (localStorage.getItem("CrystalLogger/lagDetect") == "false") {
		ele = document.getElementById("lagoff") as HTMLInputElement;
		ele.checked = true;
	}

	if (seeConsoleLogs) console.log("Setting previously set radio button for MultiButtonPressDetect: " + localStorage.getItem("CrystalLogger/multiButtonPressDetect") + "...");
	if (localStorage.getItem("CrystalLogger/multiButtonPressDetect") == "true") {
		ele = document.getElementById("multion") as HTMLInputElement;
		ele.checked = true;
	}
	else if (localStorage.getItem("CrystalLogger/multiButtonPressDetect") == "false") {
		ele = document.getElementById("multioff") as HTMLInputElement;
		ele.checked = true;
	}

	if (seeConsoleLogs) console.log("Setting previously set radio button for noMenu: " + localStorage.getItem("CrystalLogger/noMenu") + "...");
	if (localStorage.getItem("CrystalLogger/noMenu") == "true") {
		ele = document.getElementById("menuon") as HTMLInputElement;
		ele.checked = true;
	}
	else if (localStorage.getItem("CrystalLogger/noMenu") == "false") {
		ele = document.getElementById("menuoff") as HTMLInputElement;
		ele.checked = true;
	}
	
	if (seeConsoleLogs) console.log("Setting previously set radio button for hybridPrecision: " + localStorage.getItem("CrystalLogger/hybridPrecision") + "...");
	ele = document.getElementById("hybrid_precision") as HTMLInputElement;
	ele.value = localStorage.getItem("CrystalLogger/hybridPrecision");
	
	if (seeConsoleLogs) console.log("Setting previously set radio button for HistoryDisplayLimit: " + localStorage.getItem("CrystalLogger/HistoryDisplayLimit") + "...");
	ele = document.getElementById("history_display_limit") as HTMLInputElement;
	ele.value = localStorage.getItem("CrystalLogger/HistoryDisplayLimit");

	if (seeConsoleLogs) console.log("Settings initialized!");
}


export async function saveSettings(alg: string, lag: string, multi: string, menu: string, precision: string, limit: string) {
	buttonDisabler();
	if (seeConsoleLogs) console.log("Saving settings...");
	if (window.alt1) {
		alt1.overLayClearGroup("overlays");
		alt1.overLaySetGroup("overlays");
		alt1.overLayTextEx("Saving settings...", a1lib.mixColor(255, 144, 0), 20, Math.round(alt1.rsWidth / 2), 200, 50000, "", true, true);
	}
	localStorage.setItem("CrystalLogger/Algorithm", alg);
	localStorage.setItem("CrystalLogger/lagDetect", lag);
	localStorage.setItem("CrystalLogger/hybridPrecision", precision);
	localStorage.setItem("CrystalLogger/HistoryDisplayLimit", limit);

	if (localStorage.getItem("CrystalLogger/multiButtonPressDetect") !== multi) {
		localStorage.setItem("CrystalLogger/multiButtonPressDetect", multi);
		if (seeConsoleLogs) console.log("Adjusting saved values")
		if (multi === "true") {
			if (localStorage.getItem("CrystalLogger/autoCapture") === "true") {
				(document.getElementById("docapturebutton") as HTMLDivElement).setAttribute("onclick", "");
				(document.getElementById("docapturebutton") as HTMLDivElement).setAttribute("title", "Disable autocapture to use this button");
				(document.getElementById("docapturebuttonwords") as HTMLDivElement).style.setProperty("text-decoration", "line-through");
			}
		}
		else if (multi === "false") {
			if (localStorage.getItem("CrystalLogger/autoCapture") === "true") {
				(document.getElementById("docapturebutton") as HTMLDivElement).setAttribute("onclick", "TEST.capture(false)");
				(document.getElementById("docapturebutton") as HTMLDivElement).setAttribute("title", "");
				(document.getElementById("docapturebuttonwords") as HTMLDivElement).style.removeProperty("text-decoration");
			}
			else {
				(document.getElementById("docapturebutton") as HTMLDivElement).setAttribute("onclick", "TEST.capture(false)");
				(document.getElementById("docapturebutton") as HTMLDivElement).setAttribute("title", "");
				(document.getElementById("docapturebuttonwords") as HTMLDivElement).style.removeProperty("text-decoration");
			}
		}
	}

	if (localStorage.getItem("CrystalLogger/noMenu") !== menu) {
		localStorage.setItem("CrystalLogger/noMenu", menu);
		noMenuCheck();
	}

	historyClear();
	historyInit();
	settingsInit();
	await arraySetup();
	buttonEnabler()
	
	if (window.alt1) {
		alt1.overLayClearGroup("overlays"); 
		alt1.overLaySetGroup("overlays");
		alt1.overLayTextEx("Settings saved!", a1lib.mixColor(100, 255, 100), 20, Math.round(alt1.rsWidth / 2), 200, 2000, "", true, true);
	}
	if (seeConsoleLogs) console.log("Settings saved!");
}


export function autoDisableCheckAuto(event: Event) {
	if ((document.getElementById("toggleunlocktrack") as HTMLDivElement).classList.contains("enabled")) {
		toggleCapture(event);
	}
}


export function toggleCapture(event: Event) {
	if ((document.getElementById("toggleunlocktrack") as HTMLDivElement).classList.contains("enabled")) {
		(document.getElementById("toggleunlocktrack") as HTMLDivElement).classList.remove("enabled");
		localStorage.setItem("CrystalLogger/autoCapture", "false");
		if (window.alt1) {
			alt1.overLayClearGroup("overlays");
			alt1.overLaySetGroup("overlays");
			alt1.overLayTextEx("Autocapture disabled!", a1lib.mixColor(100, 255, 100), 20, Math.round(alt1.rsWidth / 2), 200, 2000, "", true, true);
		}
	}
	else {
		(document.getElementById("toggleunlocktrack") as HTMLDivElement).classList.add("enabled");
		localStorage.setItem("CrystalLogger/autoCapture", "true");
		if (window.alt1) {
			alt1.overLayClearGroup("overlays");
			alt1.overLaySetGroup("overlays");
			alt1.overLayTextEx("Autocapture enabled!", a1lib.mixColor(100, 255, 100), 20, Math.round(alt1.rsWidth / 2), 200, 2000, "", true, true);
		}
	}
	autoCheck();

	if (event != undefined) {
		event.stopPropagation();
	}
}


function autoCheck() {
	if (localStorage.getItem("CrystalLogger/autoCapture") === "true") {
		if (localStorage.getItem("CrystalLogger/multiButtonPressDetect") === "true") {
			(document.getElementById("docapturebutton") as HTMLDivElement).setAttribute("onclick", "");
			(document.getElementById("docapturebutton") as HTMLDivElement).setAttribute("title", "Disable autocapture to use this button");
			(document.getElementById("docapturebuttonwords") as HTMLDivElement).style.setProperty("text-decoration", "line-through");
		}
		autoCaptureInterval = window.setInterval(async function () {
			let promises = [];
			promises.push(await autoCallCapture());
			await Promise.all(promises);
		}, 600);
	}
	else {
		if (localStorage.getItem("CrystalLogger/multiButtonPressDetect") === "true") {
			(document.getElementById("docapturebutton") as HTMLDivElement).setAttribute("onclick", "TEST.capture(false)");
			(document.getElementById("docapturebutton") as HTMLDivElement).setAttribute("title", "");
			(document.getElementById("docapturebuttonwords") as HTMLDivElement).style.removeProperty("text-decoration");
		}
		window.clearInterval(autoCaptureInterval);
		autoCaptureInterval = null;
	}
}


function autoCallCapture() {
	capture(true);
}


function noMenuCheck() {
	if (localStorage.getItem("CrystalLogger/noMenu") === "true") {
		noMenuInterval = window.setInterval(async function () {
			let img = a1lib.captureHoldFullRs();
			//TODO: Investigate this for changing tiers
			let loc = img.findSubimage(imgs.crystalChest);

			let rewardreader = new ClueRewardReader();
			rewardreader.pos = ModalUIReader.find()[0];
			let value = rewardreader.read(img).value;
			let length = value.toString().length
			let comma = Math.floor(length / 3)
			if (seeConsoleLogs) console.log("Highlighting value...")
			
			if (window.alt1) {
				alt1.overLayClearGroup("nomenu");
				alt1.overLaySetGroup("nomenu");
				//TODO: Investigate this for changing tiers, the image used in width and height
				alt1.overLayRect(a1lib.mixColor(255, 50, 50), loc[0].x + 301 - (5 * length) + (1 * comma), loc[0].y + 218, 2 + (8 * length) + (4 * comma), imgs.crystalChest.height + 6, 60000, 2);
				alt1.overLayTextEx("NO MENUS HERE", a1lib.mixColor(255, 50, 50), 10, loc[0].x + 301, loc[0].y + 242, 3000, "", true, true);
			}
			
		}, 1000);
	}
	else {
		if (window.alt1) {
			alt1.overLayClearGroup("nomenu");
		}
		window.clearInterval(noMenuInterval);
		noMenuInterval = null;
	}
}


export function exporttocsv() {
	if (window.alt1) {
		alt1.overLayClearGroup("overlays");
		alt1.overLaySetGroup("overlays");
		alt1.overLayTextEx("Generating CSV...", a1lib.mixColor(255, 144, 0), 20, Math.round(alt1.rsWidth / 2), 200, 2000, "", true, true);
	}

	let csvinfo = [];
	csvinfo.push(["Item", "Taverley", "Prifddinas", "Triskelion", "Alchemist"]);
	
	let lsHistory = JSON.parse(localStorage.getItem("CrystalLogger/History"))
	let keys = Object.keys(items);
	let currOrder = 1;
	if (seeConsoleLogs) console.log("Generating CSV...");
	if (seeConsoleLogs) console.log("Getting values and counts...");

	let tCount = localStorage.getItem("CrystalLogger/TCount")
	let tValue = localStorage.getItem("CrystalLogger/TValue")
	let pCount = localStorage.getItem("CrystalLogger/PCount")
	let pValue = localStorage.getItem("CrystalLogger/PValue")
	let kCount = localStorage.getItem("CrystalLogger/KCount")
	let kValue = localStorage.getItem("CrystalLogger/KValue")
	let aCount = localStorage.getItem("CrystalLogger/ACount")
	let aValue = localStorage.getItem("CrystalLogger/AValue")
	csvinfo.push(["Total Count", tCount, pCount, kCount, aCount]);
	csvinfo.push(["Total Value", tValue, pValue, kValue, aValue]);

	if (seeConsoleLogs) console.log("Getting item quantities...")
	for (let i = 0; i < keys.length; i++) {
		for (let j = 0; j < keys.length; j++) {
			if (items[keys[j]].order == currOrder.toString()) {
				let val = items[keys[j]];
				let one = val.quantity.taverley;
				let two = val.quantity.prifddinas;
				let three = val.quantity.triskelion;
				let four = val.quantity.alchemist;
				if (one == undefined || one == "0") { // .toLocaleString("en-US")
					one = "";
				} 
				else { 
					one = one.toString()
				}
				if (two == undefined || two == "0") {
					two = "";
				} 
				else { 
					two = two.toString()
				}
				if (three == undefined || three == "0") {
					three = "";
				} 
				else { 
					three = three.toString()
				}
				if (four == undefined || four == "0") {
					four = "";
				} else { 
					four = four.toString()
				}
				csvinfo.push([keys[j], one, two, three, four]);
				currOrder++;
				break;
			}
		}
	}
	csvinfo.push([])
	csvinfo.push([])
	csvinfo.push(["Captured Rewards History", 'Parse tier at " : " and " [C] "', '"Parse date and time at "", " "', 'Parse items at " x "'])
	csvinfo.push(["Rewards Tier & Count", "Reward Value", "Date and Time recorded", "Item 1", "Item 2", "Item 3", "Item 4", "Item 5", "Item 6", "Item 7", "Item 8", "Item 9", "Item 10", "Item 11", "Item 12"])
	console.log(lsHistory)
	if (seeConsoleLogs) console.log("Setting history in csv...")

	let taverley = 1
	let prifddinas = 1
	let triskelion = 1
	let alchemist = 1
	for (let i = 0; i < lsHistory.length; i++) {
		if(lsHistory[i][3][0].replace(" [C] ", "") == ("taverley")){
			lsHistory[i][4] = taverley;
			taverley++;
		}
		else if(lsHistory[i][3][0].replace(" [C] ", "") == ("prifddinas")){
			lsHistory[i][4] = prifddinas;
			prifddinas++;
		}
		else if(lsHistory[i][3][0].replace(" [C] ", "") == ("triskelion")){
			lsHistory[i][4] = triskelion;
			triskelion++;
		}
		else if(lsHistory[i][3][0].replace(" [C] ", "") == ("alchemist")){
			lsHistory[i][4] = alchemist;
			alchemist++;
		}
		let temp = [lsHistory[i][3][0] + " : " + lsHistory[i][4], lsHistory[i][2]]
		for (let j = 0; j < 4; j++) {
			for(let k = 0; k < 8; k++){
				if(lsHistory[i][0][(j * 8) + k] == undefined || lsHistory[i][0][(j * 8) + k] === "Blank"){
					temp.push("")
				}
				else {
					temp.push(lsHistory[i][1][(j * 8) + k].toString() + " x " + lsHistory[i][0][(j * 8) + k].toString())
				}
			}
		}
		csvinfo.push(temp)
	}
	localStorage.setItem("CrystalLogger/History", JSON.stringify(lsHistory))

	const d = new Date();
	let hour = "0" + d.getHours().toString()
	let minute = "0" + d.getMinutes().toString()
	let second = "0" + d.getSeconds().toString()
	let month = "0" + (d.getMonth() + 1).toString()
	let day = "0" + d.getDate().toString()
	let csvContent = "";
	csvinfo.forEach(function (i) {
		let row = i.join(",");
		csvContent += row + "\r\n";
	});

	let filename = "CrystalLogger CSV " + (d.getFullYear() + "-" + month.slice(-2) + "-" + day.slice(-2) + "--" + hour.slice(-2) + "-" + minute.slice(-2) + "-" + second.slice(-2)) + ".csv";
	let encodedUri = "data:text/csv;charset=utf-8,%EF%BB%BF" + encodeURI(csvContent);
	let link = document.createElement("a") as HTMLAnchorElement;
	link.setAttribute("href", encodedUri);
	link.setAttribute("download", filename);
	document.body.appendChild(link); // Required for FF
	link.click();
	if (window.alt1) {
		alt1.overLayClearGroup("overlays");
		alt1.overLaySetGroup("overlays");
		alt1.overLayTextEx("CSV Generated!", a1lib.mixColor(100, 255, 100), 20, Math.round(alt1.rsWidth / 2), 200, 2000, "", true, true);
	}
}


function nodeMaker(quant: number, item: string, attribute:string) {
	let nodevar = document.createElement("itembox") as HTMLDivElement
	if (attribute === "tab") {
		nodevar.setAttribute("class", "node_tab")
		nodevar.setAttribute('style', 'order: ' + orderChecker(parseInt(items[item].order), item) + ';');
	}
	else if (attribute === "history") {
		nodevar.setAttribute("class", "node_history")
	}
	else if (attribute === "recent") {
		nodevar.setAttribute("class", "node_recent")
	}
	nodevar.setAttribute('title', quant.toLocaleString("en-US") + " x " + item)
	return nodevar

}


function imgMaker(item: string, quant:number) {
	let imgvar = document.createElement("img") as HTMLImageElement;
	if(false){
		//FIXME: Add items into here, namely farming seeds.
	}
	else{
		imgvar.src = encodeURI("./images/items/" + item.replace("/","-") + ".png");
	}

	imgvar.setAttribute('style', 'margin:auto;');
	imgvar.ondragstart = function() { return false; };
	return imgvar
}


function quantMaker(quant: number) {
	let quantvar = document.createElement("span") as HTMLSpanElement
	if (quant > 9999999 || quant < -9999999) {
		quantvar.setAttribute('class', 'quant_green_text');
		quantvar.textContent = Math.trunc(quant / 1000000).toString() + "M";
	}
	else if (quant > 99999 || quant > 9999 || quant < -9999 || quant < -99999) {
		quantvar.setAttribute('class', 'quant_white_text');
		quantvar.textContent = Math.trunc(quant / 1000).toString() + "k";
	}
	else {
		quantvar.setAttribute('class', 'quant_yellow_text');
		quantvar.textContent = quant + "";
	}
	return quantvar
}


async function dateGetter(){
	const d = new Date();
	let hour = "0" + d.getUTCHours().toString()
	let minute = "0" + d.getUTCMinutes().toString()
	let second = "0" + d.getUTCSeconds().toString()
	let month = "0" + (d.getUTCMonth() + 1).toString()
	let day = "0" + d.getUTCDate().toString()
	let currentDate = hour.slice(-2) + ":" + minute.slice(-2) + ":" + second.slice(-2) + ", " + d.getUTCFullYear() + "/" + month.slice(-2) + "/" + day.slice(-2) + " UTC"
	return currentDate
}


function removeChildNodes(div: any) { // https://stackoverflow.com/a/40606838
	while (div.firstChild) {
        div.firstChild.remove();
    }
}


function _base64ToImageData(buffer: string, width: any, height: any) { // https://stackoverflow.com/questions/68495924
    return new Promise(resolve => {
  	  	let image = new Image();
  	  	image.addEventListener('load', function (e) {
  	  	  	let canvasElement = document.createElement('canvas') as HTMLCanvasElement;
  	  	  	canvasElement.width = width;
  	  	  	canvasElement.height = height;
  	  	  	let context = canvasElement.getContext('2d');
  	  	  	context.drawImage(e.target as HTMLVideoElement, 0, 0, width, height);
  	  	  	resolve(context.getImageData(0, 0, width, height));
  	  	});
  	  	image.src = buffer;
  	});
}


export function toggleLootDisplay(id: string) {
	let lootdisplay = Array.from(document.getElementsByClassName('loot_display') as HTMLCollectionOf<HTMLElement>);
	let tab = document.getElementById(id) as HTMLInputElement;

	if (id == "first_rewards") {
		lootdisplay[0].style.display = (lootdisplay[0].style.display == 'flex') ? 'none' : 'flex';
		tab.style.textDecoration = (lootdisplay[0].style.display == 'flex') ? 'none' : 'line-through';
		tab.title = (lootdisplay[0].style.display == 'flex') ? 'Click here to hide broadcast rewards' : 'Click here to show broadcast rewards';
		opentabs[0] = (lootdisplay[0].style.display == 'flex') ? true : false;
	}
	else if (id == "second_rewards") {
		lootdisplay[1].style.display = (lootdisplay[1].style.display == 'flex') ? 'none' : 'flex';
		tab.style.textDecoration = (lootdisplay[1].style.display == 'flex') ? 'none' : 'line-through';
		tab.title = (lootdisplay[1].style.display == 'flex') ? 'Click here to hide miscellaneous rewards' : 'Click here to show miscellaneous rewards';
		opentabs[1] = (lootdisplay[1].style.display == 'flex') ? true : false;
	}
	else if (id == "third_rewards") {
		lootdisplay[2].style.display = (lootdisplay[2].style.display == 'flex') ? 'none' : 'flex';
		tab.style.textDecoration = (lootdisplay[2].style.display == 'flex') ? 'none' : 'line-through';
		tab.title = (lootdisplay[2].style.display == 'flex') ? 'Click here to hide miscellaneous rewards' : 'Click here to show miscellaneous rewards';
		opentabs[2] = (lootdisplay[2].style.display == 'flex') ? true : false;
	}
	if (seeConsoleLogs) console.log(opentabs)

	let truecount = 0;
	for (let i = 0; i < opentabs.length; i++) {
		if (opentabs[i] == true) {
			truecount++;
		}
	}
	if (seeConsoleLogs) console.log(truecount)

	let minH = 0;
	if (truecount == 3) {
		minH = 33;
	}
	// Tinker with this. 
	// If you want to change the min heights for each thing, 
	// change variables starting below here
	if (truecount == 2) {
		minH = 40;
	}
	if (truecount == 1) {
		minH = 75;
	}

	let minHval = (minH + "%").toString()

	// Currently circumventing truecount checker
	minHval = "80px"

	if (opentabs[0]) {
		Array.from(document.getElementsByClassName('first') as HTMLCollectionOf<HTMLElement>)[0].style.minHeight = minHval;
	}
	else {
		Array.from(document.getElementsByClassName('first') as HTMLCollectionOf<HTMLElement>)[0].style.minHeight = "8%";
	}

	if (opentabs[1]) {
		Array.from(document.getElementsByClassName('second') as HTMLCollectionOf<HTMLElement>)[0].style.minHeight = minHval;
	}
	else {
		Array.from(document.getElementsByClassName('second') as HTMLCollectionOf<HTMLElement>)[0].style.minHeight = "8%";
	}

	if (opentabs[2]) {
		Array.from(document.getElementsByClassName('third') as HTMLCollectionOf<HTMLElement>)[0].style.minHeight = minHval;
	}
	else {
		Array.from(document.getElementsByClassName('third') as HTMLCollectionOf<HTMLElement>)[0].style.minHeight = "8%";
	}
}


function updateItems() {
	localStorage.setItem("CrystalLogger/items", JSON.stringify(items))
}


function orderChecker(order: number, item: string) {
	// TODO: Determine order here if needed 

	return order
}


function buttonDisabler() {
		if (localStorage.getItem("CrystalLogger/autoCapture") !== "true") {
			(document.getElementById("docapturebutton") as HTMLDivElement).setAttribute("title", "Currently disabled to due initialization, settings being saved, or autocapture");
			(document.getElementById("docapturebuttonwords") as HTMLDivElement).style.setProperty("text-decoration", "line-through");
			(document.getElementById("docapturebutton") as HTMLDivElement).setAttribute("onclick", "");
		}
		(document.getElementById("toggleunlocktrack") as HTMLDivElement).setAttribute("onclick", "");
		let radiobuttons = document.getElementsByClassName("rewards_level") as HTMLCollectionOf<HTMLInputElement>;
		for(let i = 0; i < radiobuttons.length; i++){
			radiobuttons[i].disabled = true
		}
		(document.getElementById("taverley") as HTMLDivElement).setAttribute("onclick", "");
		(document.getElementById("prifddinas") as HTMLDivElement).setAttribute("onclick", "");
		(document.getElementById("triskelion") as HTMLDivElement).setAttribute("onclick", "");
		(document.getElementById("alchemist") as HTMLDivElement).setAttribute("onclick", "");
		(document.getElementById("label_taverley") as HTMLDivElement).setAttribute("onclick", "");
		(document.getElementById("label_prifddinas") as HTMLDivElement).setAttribute("onclick", "");
		(document.getElementById("label_triskelion") as HTMLDivElement).setAttribute("onclick", "");
		(document.getElementById("label_alchemist") as HTMLDivElement).setAttribute("onclick", "");
		buttonDisabletoggle = false
}


function buttonEnabler() {
	if (localStorage.getItem("CrystalLogger/autoCapture") !== "true") {
		(document.getElementById("docapturebutton") as HTMLDivElement).setAttribute("title", "");
		(document.getElementById("docapturebuttonwords") as HTMLDivElement).style.removeProperty("text-decoration");
		(document.getElementById("docapturebutton") as HTMLDivElement).setAttribute("onclick", "TEST.capture(false)");
	}
	(document.getElementById("toggleunlocktrack") as HTMLDivElement).setAttribute("onclick", "TEST.toggleCapture(event)");
	let radiobuttons = document.getElementsByClassName("rewards_level") as HTMLCollectionOf<HTMLInputElement>;
	for(let i = 0; i < radiobuttons.length; i++){
		radiobuttons[i].disabled = false
	}
	(document.getElementById("taverley") as HTMLDivElement).setAttribute("onclick", "TEST.changeClueTierSpan('taverley', event);");
	(document.getElementById("prifddinas") as HTMLDivElement).setAttribute("onclick", "TEST.changeClueTierSpan('prifddinas', event);");
	(document.getElementById("triskelion")as HTMLDivElement).setAttribute("onclick", "TEST.changeClueTierSpan('triskelion', event);");
	(document.getElementById("alchemist")  as HTMLDivElement).setAttribute("onclick", "TEST.changeClueTierSpan('alchemist', event);");
	(document.getElementById("label_taverley") as HTMLDivElement).setAttribute("onclick", "TEST.changeClueTierSpan('taverley', event);");
	(document.getElementById("label_prifddinas") as HTMLDivElement).setAttribute("onclick", "TEST.changeClueTierSpan('prifddinas', event);");
	(document.getElementById("label_triskelion") as HTMLDivElement).setAttribute("onclick", "TEST.changeClueTierSpan('triskelion', event);");
	(document.getElementById("label_alchemist") as HTMLDivElement).setAttribute("onclick", "TEST.changeClueTierSpan('alchemist', event);");
	buttonDisabletoggle = true
}


function currentReward() {
	let currButton = "";
	for (let i = 0; i < rewardslist.length; i++) {
		if ((document.getElementById(rewardslist[i]) as HTMLInputElement).checked) {
			currButton = rewardslist[i];
			if (currButton == 'taverley') {
				return [currButton, "CrystalLogger/TValue", "CrystalLogger/TCount"];
			}
			else if (currButton == 'prifddinas') {
				return [currButton, "CrystalLogger/PValue", "CrystalLogger/PCount"];
			}
			else if (currButton == 'triskelion') {
				return [currButton, "CrystalLogger/KValue", "CrystalLogger/KCount"];
			}
			else if (currButton == 'alchemist') {
				return [currButton, "CrystalLogger/AValue", "CrystalLogger/ACount"];
			}
		}
	}
}


function currentRewardUpper() {
	return (currentReward()[0][0].toUpperCase() + currentReward()[0].slice(1).toLowerCase())
}

//print text world
//also the worst possible example of how to use global exposed exports as described in webpack.config.json

//output.insertAdjacentHTML("beforeend", `
//	<div>paste an image of rs with homeport button (or not)</div>
//	<div onclick='TEST.capture()'>Click to capture if on alt1</div>`
//);

//check if we are running inside alt1 by checking if the alt1 global exists
if (window.alt1) {
	//tell alt1 about the app
	//this makes alt1 show the add app button when running inside the embedded browser
	//also updates app settings if they are changed
	alt1.identifyAppUrl("./appconfig.json");
}