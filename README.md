Lean
====
  Lean is a single-page browser app based existing technologies and a few simple Javascripts concepts.

  In reality it's my test-bed for various ultra-simple, zero-configuration concepts and libraries.  Libraries
  currently include jQuery, Bacon, Handlebars, Modernizr, Bootstrap, and Firebase.


Router
------
	Listens for URL-haschange events, parses the hash to derive the component-filename, then loads the component,
	fires it's before() method, inserts the template, and fires after() method.

	TODO
	----
		Devise a scheme for nested routes so a page refresh builds a nested component from the top-down.

Data-Binding
------------
    This is accomplished using Bacon.js Model objects and event-streams.

Components
----------
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
----------
    Uses Handlebars script-tag style templates, data is provided by a boilerplate object in the component file,
the two are combined by the lib and pasted into the DOM.

Caching
-------
	By default jQuery does not cache AJAX responses (a.k.a. components) but you can make it do so by setting the
	appropriate flag in $.ajaxSetup().