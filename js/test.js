var Lean = (function() {
	_context = {};

	return {
		context: function(name) {
			return _context[name];
		},
		fetch: function(name, container) {
			var scriptURL = "com/" + name + ".js";

			$.getScript(scriptURL, function(xhr) {
				try {
					var currentComponent = Lean.com[name];
				} catch(err) {
					eval(xhr);
					var currentComponent = Lean.com[name];
				}

				currentComponent.before(function() {
					$("#" + container).html(json2html.transform(currentComponent.data, currentComponent.template));

					currentComponent.after();
				});
			});
		},
		model: function(name, obj) {
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

function handleRoute() {
	var URL, containerID, component, html, context, container, template, source, route;

	Lean.state = extractParams();

	route = window.location.hash.substring(1, window.location.hash.length).split(":");
	component = route[0];
	containerID = route[1];
	URL = "com/" + component + ".html";

	if (component.length && containerID.length) {
		$("#LeanComponent").load(URL, function() {
			source = $("#" + component).html();
			template = Handlebars.compile(source);
			container = $("#" + route[1]);
			context = Lean.context(component);
			html = template(context);
			container.html(html);
		});
	}
}

$(function() {
	$(window).on("hashchange", handleRoute);

	handleRoute();
});