Lean.component("other", function() {
	thisData = [
		{name:"Wilma", age:45},
		{name:"Betty", age:23},
		{name:"Elizabeth", age:36}
	];

	return {
		before: function(callback) {
			callback();
		},
		template: {
			tag: "div",
			html: "${name} (${age})"
			children: [{
				tag: "a",
				href: "#sub1:subContent"
				html: "sub-link 1"
			},{
				tag: "a",
				href: "#sub2:subContent"
				html: "sub-link 2"
			},{
				tag: "div",
				id: "subContent",
				html: "nested content container"
			}
		}]
		},
		data: thisData,
		after: function() {
		}
	}
});