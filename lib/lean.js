var Lean = (function() {
	var _control = {};
	var _view = {};

	return {
		context: function(name) {
			return _control[name];
		},
		controller: function(name, obj) {
			_control[name] = obj;
		},
		state: {},
		template: function(name, selector) {
			_view[name] = Handlebars.compile($(selector).html());
		},
		view: function(name) {
			return _view[name];
		},
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

function fetchComponent(name) {
	var viewSource, template, container, context, data, html, URL;

	URL = "com/" + name + ".html";
	$("#LeanComponent").load(URL, function() {
		Lean.template(name, "#" + name);
		context = Lean.context(name)
		if (context.before) context.before();

		// find the view container
		container = $("body #" + name);
		if (!container.size())
			container = $(Lean.viewSelector).last();
		if (!container.size())
			container = $("body");
		console.log(container);

		data = context.data || {};
		template = Lean.view(name);

		// TODO: replace this Bacon-wrapped binding for auto-updates
		html = template(data);

		container.html(html);
		if (context.after) context.after();
	});
}

function handleRoute() {
	var component, route;

	Lean.state = extractParams();

	route = window.location.hash.substring(1, window.location.hash.length);

	if (route.length)
		fetchComponent(route);
}

function roundTripHistory() {
	var targetHash = window.location.hash;
	var route = targetHash.split("/");
	var temp = [];

	window.location.hash = "";

	if (route.length > 1) {
		for (var I in route) {
			temp[I] = route[I];
			window.location.hash = temp.join("/");
		}
	} else {
		window.location.hash = targetHash;
	}
}

$(function() {
//	var hashRoute = Bacon.$.asEventStream("hashchange");
//	hashRoute.onValue(function(ev) { console.log(ev) });
	$(window).on("hashchange", handleRoute);

	if (window.location.hash.length)
		roundTripHistory();
});