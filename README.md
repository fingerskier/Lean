Lean
====
  Lean is a single-page browser app based existing technologies and a few simple Javascripts concepts.

  In reality it's my test-bed for various ultra-simple, zero-configuration concepts and libraries.  Libraries
  currently include jQuery, Qunit, Bacon, Handlebars, Modernizr, Bootstrap, and Firebase.


Router
======
	Listens for URL-haschange events, parses the hash to derive the component-filename and container node,
	then loads the component, fires it's before() method, inserts the template, and fires after() method.
	The content will be pasted into an element with an id="componentName" or, if that doesn't exist,
	it looks for a container with class="lean-view" at the deepest level available (because in a nested view there may
	be lean-view containers within other lean-view containers).
	Bottom-line: routing is simplified by having templates, controllers, and view-containers all same-named or use the
	"view" class.  This facilitates rebuilding of dynamic views on a page-refresh: Lean will simply walk back and forth
	 through the history to refresh nested views.

	TODO
	----
		Setup a Bacon stream to handle hashchange events

Data-Binding
============
	Data-binding is accomplished using Bacon.js Model objects and event-streams.

Components
==========
  function MyComponent() {
    var privateVariable = new SomeObj(ID);

    convention = {
      before: function() { ... }
      template: { /* a JSON2HTML object */ },
      data: function() { ... },
      after: function() { ... }
    }

    return convention;
  }

    TODO
    ----
      Devise a way to simplify component boilerplate...so you don't have to name the script-tag and the model...

Templating
==========
	Lean uses Handlebars script-tag style templates, data is provided by a boilerplate object in the component file,
	the two are combined by the lib and pasted into the DOM.

Caching
=======
	By default jQuery does not cache AJAX responses (a.k.a. components) but you can make it do so by setting the
	appropriate flag in $.ajaxSetup().