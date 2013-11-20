Lean
====
  The Lean framework is a super elegant framework for developing browser-based javascript applications.

  In reality it's my test-bed for various ultra-simple, zero-configuration concepts and libraries.  Libraries
  currently include jQuery, Bacon, Handlebars, Modernizr, Bootstrap, and Firebase.


Router
------
    Listens for URL events, parses the hash to derive the component-filename, then loads the component,
fires it's before() method, inserts the template, and fires after() method.

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

Templating
----------
    Uses JSON2HTML = markup is modeled in an object, data is provided by the component's data() function,
the two are combined by the lib and pasted into the DOM.

Caching
-------
	By default jQuery does not cache AJAX responses (a.k.a. components) but you can make it do so by setting the
	appropriate flag in $.ajaxSetup().