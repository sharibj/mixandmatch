const BLACK = "#000000";
const ORANGE = "#ffa500";
const ALL_MODELS = ["bagModel", "jacketModel"];
const ALL_ITEMS = [
	["jacket", "shirt", "shoes", "socks", "hat", "bag"],
	["jacket", "shirt", "shoes", "scarf", "jeans"]
];
const DEFAULT_COLORS = [
	[ORANGE, BLACK, ORANGE, BLACK, BLACK, ORANGE],
	[BLACK, BLACK, ORANGE, ORANGE, BLACK]
];
var colorPickerValue = "#ffffff";
var currentModel = 0;
function load(){
	addClickEventsToSvgElements();
	loadColors(currentModel, ALL_ITEMS[currentModel], DEFAULT_COLORS[currentModel]);
	sendModelFrontstage(ALL_MODELS[currentModel]);
}
function addClickEventsToSvgElements(){
	for(var modelIndex = 0; modelIndex<ALL_MODELS.length; modelIndex++){
		for(var itemIndex = 0; itemIndex < ALL_ITEMS[modelIndex].length; itemIndex++){
			var itemElement = document.getElementById(ALL_MODELS[modelIndex])
			.querySelector("#" + ALL_ITEMS[modelIndex][itemIndex]);
			itemElement.setAttribute("style","cursor: pointer;");
			itemElement.setAttribute("onClick","setColorToElement(this)");
		}
	}
}
function sendModelFrontstage(modelName){
	var stage = document.getElementById('stage');
	var model = document.getElementById(modelName);
	stage.innerHTML = model.innerHTML;
	model.innerHTML = "";
}
function sendModelBackstage(modelName){
	var stage = document.getElementById('stage');
	var model = document.getElementById(modelName);
	model.innerHTML = stage.innerHTML ;
	stage.innerHTML = "";
}
function loadColors(modelIndex, items, colors) {
	for (var itemIndex = 0; itemIndex < items.length; itemIndex++) {
		setColor(modelIndex, itemIndex, colors[itemIndex]);
	}
}
function nextModel() {
	sendModelBackstage(ALL_MODELS[currentModel]);
	currentModel++;
	document.getElementById("previous").setAttribute("disabled", false);
	if (currentModel == ALL_MODELS.length - 1) {
		document.getElementById("next").setAttribute("disabled", true);
	}
	sendModelFrontstage(ALL_MODELS[currentModel]);
}
function prevModel() {
	sendModelBackstage(ALL_MODELS[currentModel]);
	currentModel--;
	document.getElementById("next").setAttribute("disabled", false);
	if (currentModel == 0) {
		document.getElementById("previous").setAttribute("disabled", true);
	}
	sendModelFrontstage(ALL_MODELS[currentModel]);
}
function clickColor(picker) {
	colorPickerValue = '#' + picker.toString();
}
function setColor(modelIndex, itemIndex, color) {
	var itemElement = document.getElementById(ALL_MODELS[modelIndex])
		.querySelector("#" + ALL_ITEMS[modelIndex][itemIndex]);
	var children = itemElement.children;
	for (var i = 0; i < children.length; i++) {
		var child = children[i];
		child.style.fill = color;
	}
}
function setColorToElement(itemElement){
	var children = itemElement.children;
	for (var i = 0; i < children.length; i++) {
		var child = children[i];
		child.style.fill = colorPickerValue;
	}
}