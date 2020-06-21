var BLACK = "#000000";
var ORANGE = "#ffa500";
var colorPickerValue = BLACK;
var ALL_MODELS = ["bagModel", "jacketModel"];
var ALL_ITEMS = [
	["jacket", "shirt", "shoes", "socks", "hat", "bag"],
	["jacket", "shirt", "shoes", "scarf", "jeans"]
];
var allColors = [
	[ORANGE, BLACK, ORANGE, BLACK, BLACK, ORANGE],
	[BLACK, BLACK, ORANGE, ORANGE, BLACK]
];
var currentModel = 0;
var timeout = 0;
function load() {
	loadColors(ALL_ITEMS[currentModel], allColors[currentModel]);
	loadModel(ALL_MODELS[currentModel]);
	loadButtons(ALL_ITEMS[currentModel]);
	document.getElementById("html5colorpicker").value = colorPickerValue;
	timeout = 200;
}
function loadModel(model) {
	var svgDiv = document.getElementById('svgDiv');
	svgDiv.style.opacity = 0;
	setTimeout(function () {
		svgDiv.innerHTML = document.getElementById(model).innerHTML;
		svgDiv.style.opacity = 1;
	}, timeout);
}
function loadColors(items, colors) {
	for (var i = 0; i < items.length; i++) {
		setColor(currentModel, i, colors[i]);
	}
}
function loadButtons(items) {
	var mid = Math.ceil(items.length / 2);
	var buttonColumn1 = document.getElementById("btnCol_1");
	var buttonColumn2 = document.getElementById("btnCol_2");
	buttonColumn1.innerHTML = "";
	buttonColumn2.innerHTML = "";
	for (var i = 0; i < mid; i++) {
		buttonColumn1.innerHTML +=
			"<button class = \"set_button\" onclick=\"setAndSaveColor("
			+ currentModel + "," + i + ")\">" + items[i] + "</button>";
	}
	for (var i = mid; i < items.length; i++) {
		buttonColumn2.innerHTML +=
			"<button class = \"set_button\" onclick=\"setAndSaveColor("
			+ currentModel + "," + i + ")\">" + items[i] + "</button>";
	}
}
function nextModel() {
	currentModel++;
	document.getElementById("previous").setAttribute("disabled", false);
	if (currentModel == ALL_MODELS.length - 1) {
		document.getElementById("next").setAttribute("disabled", true);
	}
	load();
}
function prevModel() {
	currentModel--;
	document.getElementById("next").setAttribute("disabled", false);
	if (currentModel == 0) {
		document.getElementById("previous").setAttribute("disabled", true);
	}
	load();
}
function clickColor() {
	colorPickerValue = document.getElementById("html5colorpicker").value;
}
function setAndSaveColor(modelIndex, itemIndex) {
	saveColor(modelIndex, itemIndex, colorPickerValue);
	load();
}
function setColor(modelIndex, itemIndex, color) {
	var itemElement = document.getElementById(ALL_MODELS[currentModel])
		.querySelector("#" + ALL_ITEMS[modelIndex][itemIndex]);
	var children = itemElement.children;
	for (var i = 0; i < children.length; i++) {
		var child = children[i];
		child.style.fill = color;
	}
}
function saveColor(modelIndex, itemIndex, color) {
	allColors[modelIndex][itemIndex] = color;
}