/*
	TODO: refactor components to include before() && after()
 */

var Lean = (function() {
	_context = {};

	return {
		context: function(name) {
			return _context[name];
		},
		controller: function(name, obj) {
			_context[name] = obj;
		},
		state: {}
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

function fetchComponent(name, containerID) {
	var source, template, container, context, html, URL;

	URL = "com/" + name + ".html";
//	TODO: need to deal with live updates via Bacon streams
	$("#LeanComponent").load(URL, function() {
		// TODO: fire the before() method
		source = $("#" + name).html();
		template = Handlebars.compile(source);
		container = $("#" + containerID);
		context = Lean.context(name).data;
		html = template(context);
		container.html(html);
		// TODO: fire the after() method
	});
}

function handleRoute() {
	var containerID, component, route;

	Lean.state = extractParams();

	route = window.location.hash.substring(1, window.location.hash.length).split(":");
	component = route[0];
	containerID = route[1];

	if (component.length && containerID.length) {
		fetchComponent(component, containerID);
	}
}

$(function() {
	$(window).on("hashchange", handleRoute);

	if (!window.location.hash)
		window.location = "index.html#lean:mainContent";
	else {
//		TODO: need to figure out what level we're at and progressively render components from the top-down
		var prevHash = "";

		while (hashContains("/")) history.back();

		while (window.location.hash !== prevHash) {
			history.forward();
			prevHash = window.location.hash;
		}
	}
	handleRoute();
});