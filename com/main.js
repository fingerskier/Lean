Lean.component("main", function() {
	thisData = [
		{name:"Bob", age:45},
		{name:"Frank", age:23},
		{name:"Dexter", age:36}
	];

	return {
		before: function(callback) {
			callback();
		},
		template: {
			tag: "div",
			html: "${name} (${age})"
		},
		data: thisData,
		after: function() {
		}
	}
});