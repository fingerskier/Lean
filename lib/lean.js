var Lean = (function() {
	var _context = {};

	return {
		context: function(name) {
			return _context[name];
		},
		controller: function(name, obj) {
			_context[name] = obj;
		},
		state: {},
		viewSelector: ".lean-view"
	}
})()

function extractParams(){
	var params = decodeURI(window.location.search.substring(1,window.location.search.length));
	var result = {};
	params = params.split("&");

	for (var I in params) {
		var A = params[I].split("=");

		result[A[0]] = A[1];
	}

	return result;
}

function fetchComponent(name, callback) {
	var source, template, container, context, data, html, URL;

	URL = "com/" + name + ".html";
	$("#LeanComponent").load(URL, function() {
		context = Lean.context(name)
		if (context.before) context.before();
		source = $("#" + name).html();
		template = Handlebars.compile(source);

		// find the view container
		container = $("body #" + name);
		if (!container.size())
			container = $(Lean.viewSelector).last();
		if (!container.size())
			container = $("body");
		console.log(container);

		data = context.data || {};

		// TODO: replace this Bacon-wrapped binding for auto-updates
		html = template(data);

		container.html(html);
		if (context.after) context.after();

		callback();
	});
}

function handleRoute(callback) {
	var component, route;
	callback = callback || (function() {return function() {}});

	Lean.state = extractParams();

	route = window.location.hash.substring(1, window.location.hash.length).split("/");
	component = route[route.length-1];

	if (component.length)
		fetchComponent(component, callback);
}

function hashContains(char) {
	return window.location.hash.indexOf(char) > 0;
}

function roundTripHistory() {
	var targetHash = window.location.hash;

	while (hashContains("/")) history.back();

	while (window.location.hash !== targetHash)
		walkForwardThroughHistory(targetHash);
}

function walkForwardThroughHistory(targetHash) {
	history.forward();
	if (window.location.hash === hash)
		handleRoute()
	else
		handleRoute(walkForwardThroughHisxtory(targetHash));
}

$(function() {
	$(window).on("hashchange", handleRoute);

	if (window.location.hash.length)
		roundTripHistory();
});