Lean
====

A jQuery-based framework for single-page browser applications.

  The Lean framework is designed for rapid development of browser-based
javascript applications.  It is [hopefully] extremely elegant with zero
configuration.  Built on jQuery, it incorporates that power with a few magic
features geared toward single-page applications.


Router
------
  listens for hashchange events, parses the hash to derive the
component-filename, then loads the component, fires it's before() method,
inserts the template, and fires after() method.

Data-Binding
------------
  jQuery Databinder: pubsub that watches for change events on nodes with a
data-obj-prop attribute and automagically updates a similarly named variable in
whatever scope it's called in.  Bound variables are initialized just by
including them in the DOM.

Components
----------
  function MyComponent() {
    var privateVariable = new SomeObj(ID);

    convention = {
      before: function() { ... }
      template: { /* a JSON2HTML object */ },
      after: function() { ... }
    }

    return convention;
  }


TODO
====
  
Caching
-------
  The combo template/controller file is loaded (if needed) into a collection.

