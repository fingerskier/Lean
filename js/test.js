var Lean = {
	com: {},
	component: function(name, obj) {
		Lean.com[name] = obj();
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
	state: {}
}

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
	var route = window.location.hash.substring(1,window.location.hash.length).split(":");
	var script = "com/" + route[0] + ".js";
	var component = route[0];
	var container = route[1];

	Lean.state = extractParams();
	if (component.length && container.length)
		Lean.fetch(component, container);
}

$(function() {
	$(window).on("hashchange", handleRoute);

	handleRoute();
});