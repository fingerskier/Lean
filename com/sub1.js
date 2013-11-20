Lean.component("sub1", function() {
	thisData = [
		{item:"one"},
		{item:"2"},
		{item:"trois"}
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