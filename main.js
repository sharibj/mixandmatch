var color = "#000000";
var models = ["bagModel", "jacketModel"];
var items = [
	["jacket", "shirt", "shoes", "socks", "hat", "bag"],
	["jacket", "shirt", "shoes", "scarf", "jeans"]
];
var currentModel = 0;
var timeout = 0;
function load() {
	loadModel(models[currentModel]);
	loadButtons(items[currentModel]);
	document.getElementById("html5colorpicker").value = color;
	timeout = 200;
}
function loadModel(modelName) {
	var svgDiv = document.getElementById('svgDiv');
	svgDiv.style.opacity = 0;
	setTimeout(function () {
		svgDiv.innerHTML = document.getElementById(modelName).innerHTML;
		svgDiv.style.opacity = 1;
	}, timeout);
}
function loadButtons(items) {
	var mid = Math.ceil(items.length / 2);
	var buttonColumn1 = document.getElementById("btnCol_1");
	var buttonColumn2 = document.getElementById("btnCol_2");
	buttonColumn1.innerHTML = "";
	buttonColumn2.innerHTML = "";
	for (var i = 0; i < mid; i++) {
		buttonColumn1.innerHTML +=
			"<button class = \"set_button\" onclick=\"setColor('" + items[i] + "')\">" + items[i] + "</button>";
	}
	for (var i = mid; i < items.length; i++) {
		buttonColumn2.innerHTML +=
			"<button class = \"set_button\" onclick=\"setColor('" + items[i] + "')\">" + items[i] + "</button>";
	}
}
function nextModel() {
	currentModel++;
	document.getElementById("previous").setAttribute("disabled", false);
	if (currentModel == models.length - 1)
		document.getElementById("next").setAttribute("disabled", true);
	load();
}
function prevModel() {
	currentModel--;
	document.getElementById("next").setAttribute("disabled", false);
	if (currentModel == 0)
		document.getElementById("previous").setAttribute("disabled", true);
	load();
}
function clickColor() {
	color = document.getElementById("html5colorpicker").value;
}
function setColor(id) {
	var svgElement = document.getElementById(id);
	var children = svgElement.children;
	for (var j = 0; j < children.length; j++) {
		var child = children[j];
		child.style.fill = color;
	}
}