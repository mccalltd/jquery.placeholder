# jquery.placeholder (...yawn...)
==================

Yet another jquery plugin for browsers that don't support placeholder (I'm looking at you IE!).

## Why Another?

I wasted a lot of time trying to find or fix any of the gajillion placeholder plugins out there already. My biggest beef with most was that the content of the input would be twiddled with, which caused me headaches with ajax form submissions, integration with jquery validation, and form resets.

## Where Does It Work?

* IE7-9;
* on floated elements;
* on static inline elements; and
* on absolutely positioned elements.

## Okay, So How Do I Use It?

It's pretty simple:

```javascript
$('[placeholder]').placeholder();
```

And to style the placeholder, define the following css class:

```css
.placeholder { color: #aaa; }
```

## What Happens?

For each input/textarea element, the plugin will overlay a span with the content of the input's `placeholder` attribute. The span will be styled to match the target input element. This plugin will not tinker with your input elements or their values. 

## Anything Else?

Not much, but a couple things worth noting:

```javascript
// Options
$('[placeholder]').placeholder({
  overlabelClass: 'placeholder'   // By default expects you to define a .placeholder, but can be changed
});

// Methods (any public method on the Placeholder object can be called, here are some handy ones)
$('[placeholder]').placeholder('toggle'); // Shows/Hides the placeholder, depending on the value of the element.
$('[placeholder]').placeholder('hide');   // Forces hiding the placeholder for the given elements
$('[placeholder]').placeholder('show');   // Forces showing the placeholder for the given elements
```