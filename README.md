Lean
====
  The Lean framework is designed for rapid development of browser-based javascript applications.  It is intended to
  be elegant and zero configuration.
  Basically it's jQuery, Bacon, and a smattering of other libs serving as my test-bed for framework exploration.  I
  use Firebase but that's not necessary (though it is included).


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
