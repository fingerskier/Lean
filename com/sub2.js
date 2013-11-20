Lean.component("sub2", function() {
	thisData = [
		{item:"more"},
		{item:"nested"},
		{item:"content"}
	];

	return {
		before: function(callback) {
			callback();
		},
		template: {
			tag: "div",
			html: "${item}"
		},
		data: thisData,
		after: function() {
		}
	}
});