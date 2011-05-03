JavaScript Style Guide
======================

We use [jQuery's style guide](http://docs.jquery.com/JQuery_Core_Style_Guidelines),
as the basis of our own style guide. This is mostly so that we can exchange code
freely with the open source community, while maintaining consistency.

JSLint
------

All code must pass lint, frozen in test/javascripts/JSLint, run it with `rake
test:javascript_lint`. Our options file is located at
test/javascripts/lint-options.js. JSLint will hurt your feelings, although this
developer has found all recommendations to be sound upon investigation. 

Appeals: We have the capacity to ignore specific errors, if you have a solid case.

Spacing
-------
We use two spaces for indentation. This is mostly for the convenience of front-end
developers who spend time in HAML and SASS, which require two spaces.

Keywords (function, if, else, etc.) are always followed by a space. Opening braces
are always prefixed by a space.

    if (condition) {
      [...]
    }

    $div.click(function () {
      [...]
    });

    function hello_world() {
      [...]
    }

Empty lines should have no whitespace. There should be no whitespace following a
line.

Don't use filler spaces; [], {}, () should all be collapsed.

Naming
------

In general, always be as descriptive as possible, and avoid abbreviations.

Variables: use underscores as word separators. We use 
[hungarian notation](http://www.joelonsoftware.com/articles/Wrong.html) primarily
for jQuery objects: all variables storing jQuery objects start with a $ symbol.

    var $div = $('div');

Functions: name functions that are to be used later instead of storing them in
variables.

    // Do
    function hello_world() {
      [...]
    }
    
    // Don't
    var hello_world = function () {
      [...]
    }

Classes: classes start with a capital letter, and use 
[camelCase](http://en.wikipedia.org/wiki/CamelCase) to break up words. We tend
to define a function, and then extend it's prototype with $.extend.

    function AwesomeClass() {
      //set up
      [...]
    }

    $.extend(AwesomeClass.prototype, {
      be_awesome: function () {
        [...]
      }
    });

Comments
--------

Preferably, comments longer then a line should use `/* */`. Single line comments 
should be directly above the line they reference, and on the same indentation level.

Equality
--------

Use `===` instead of `==` whenever possible.

Blocks
------

Braces are always used on blocks.

Braces go on the same line as if/else/else if/catch.

    if (condition) {
      [...]
    } else if (condition) {
      [...]
    }

Statements go on a separate line from the conditional, except in the case when it's
only a return.

    // Do
    if(bail) { return; }

    // Don't
    if(reset_x) { x = 0; }

Strings
-------

Strings should use single quotes.

JavaScript File Organization
============================
All JavaScript files go under `public/javascripts/`.

`onloads/` are expected to be executed on or after document ready.

`onloads/initializers` is code that is expected to be run on every page, after the
document becomes ready.

`onloads/views` is code that is expected to be run if certain views or partials are
on the page. It will be described in detail in a seperate section.

`library/` is library code we have written, expected to be executed as soon as
downloaded.

`vendor/` is library code external people have written, expected to be executed as
soon as downloaded.

`onloads/views/`
-----------------------
These files should correspond to views and partials in views/.  The JavaScript should
provide interaction to the markup defined in the corresponding view/partial. It
should not attach to any markup not defined by the HAML in the corresponding
view/partial, as that interaction should be defined in it's own corresponding
JavaScript file.

    app/views/hello/world.html.haml
    public/javascripts/onloads/views/hello/world.js

    app/views/awesome/_partial.html.haml
    public/javascripts/onloads/views/awesome/_partial.js

Currently, the contents of these files are bundled and executed on every page, so it
is important to bail out of these files early by checking for a DOM element that is
only rendered by the corresponding view/partial. We automatically put an id on the
body with the pattern `controller_action`, and so this works well for views:

    var $NS = $('#controller_action');
    if (!$NS.length) { return; }
    
    [...]

    $('.my_div', $NS).live('click', function () {
      [...]
    });

For partials, we don't automatically output anything, so outputting a unique class 
(a class, because we may output a partial more then once per page) to attach to is
useful:

    -# HAML
    -# file path: app/views/hello/world.html.haml

    .NS-hello_world
      [...]
      .my_div

    // JavaScript
    // file path: public/javascripts/onloads/views/hello/world.js
    
    var $NS = $('.NS-hello_world');
    if (!$NS.length) { return; }
    
    [...]

    $('.my_div', $NS).live('click', function () {
      [...]
    });

