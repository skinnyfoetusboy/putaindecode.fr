---
date: "2014-06-04"
route: /posts/js/introduction-a-reactjs/
title: Introducing ReactJS
tags:
  - javascript
  - reactjs
authors:
  - bloodyowl
  - skinnyfoetusboy
---

It's been quite some time since ReactJS has been open-sourced by facebook.
Let's take it as an opportunity to introduce the last-born child of the MV* trend.

## Different takes on UI

### Backbone

[Backbone](http://backbonejs.org) brings a simplification in events declaration,
but doesn't indulge quite that much in rendering.
Making the developer the sole master of `Backbone.View`
is positive for several kinds of projects, but makes
DOM manipulation tedious.

On the subject of data-binding, `Backbone` doesn't actually come
with any in-house solutions and you're stuck with using mixins to
implement it without resorting to gnawing your own legs off.

Moreover, it's usually a templating engine ala Handlebars or Jade
that creates the original view. Thus, you find yourself with some sort
of `this.$el.html(this.template(data))` in your `render()` method which
will leave you with a few UX aberrations like your pictures re-rendering
themselves or videos playing back from the start.

In a nutshell, Backbone is pretty useful to create some sort of
structure your code, but it is absolutely lackluster in
diminishing DOM-related complexity concerning the UI of your app.

### Angular

[Angular](https://angularjs.org) brings a more in-depth approach
by imposing its own templating engine (which allows preprocessing)
and making you able to declare data-bindings with a `{{mustache}}`-like
syntax.

Events are declarated in much the same way, using `ng-{eventName}` attributes.

Basically, Angular is technically really interesting (but don't get me started
on dirty checking)

### Ember

[Ember](http://emberjs.com) is a well-thought and well-developed framework.
It integrates `data-binding` thanks to [DOM Ranges](https://developer.mozilla.org/en-US/docs/Web/API/range).
It also has strong design patterns and contrary to what people commonly
think, it's actually pretty straightforwad.
Subviews are also pretty easy to use thanks to `{{outlet}}`.

In another words, Ember and Angular both come bundled with real
solutions for UI management. But they also share the same way to
do it :

- _rendering_ (creating and inserting DOM nodes) once
- updating the bindings

### React

[React](http://facebook.github.io/react/) doesn't care what other people do.
It has one simple way of going about stuff :
holy crap, managing the state of the DOM _sucks_

Okay, let's just say we call `.render()` everytime anything changes.
That might sound _real_ dumb but there's a gotcha about it.

React has a __virtual DOM__ (nothing to do with facebook's purchase of Oculus VR),
a blazing-fast internal representation of the DOM. It comes with its own events system
which allows React to bring the capturing phase to browsers that don't have
`EventTarget` (looking at you, IE8).

The `render` method returns objects corresponding to the internal representation
of the virtual DOM.

React classes are defined by their `state`.
When creating a class, you specify a `getInitialState` method which
will return the initial state (duh!).

After that, the only way to modify the state is to pass which values
of the state have changed to `this.setState` so that it can update
the DOM.

A React class takes properties when it's instanciated : they're called `props`.
They shouldn't be confused with the `state`, its content should only be manipulated
from _outside_ of the the class (even though it can still get default values by
specifying a `getDefaultProps` method which will return them).

The `state`, however, shall only be modified by the class's own methods.

The main advantage to this is that you're always sure, thanks to the systematic
call to `render`, that your React component will look and act like you expect it
to.

Another advantage to React is its in-house diff algorithm.
The virtual DOM gets diffed against the previous one (which is the one you see),
and React works out which operations it needs to execute in order to update the 
DOM.

This solves a few issues like keeping track of the caret's position in a text
field that uses two-way data-binding : since the algorithm doesn't see any reason
to update it, the text field doesn't get re-rendered and you keep the focus.
In the same way, if you've got a gif looping somewhere in your page, it will keep
playing as it normally would.

React is made to work with JSX (that's JavaScript XML), a superset of JS which
allows you to write your templates with an XML syntax (see example below),
alowing even beginners to get stuff done with it quickly.

## Let's create a React component :


```javascript
var View = React.createClass({
  getInitialState : function(){
    // initial state
    return {
      checked : false
    }
  },
  getDefaultProps : function(){
    // if `this.props.label` isn't defined, then `"?"` will be displayed
    return {
      label : "?"
    }
  },
  toggle : function(){
    // creates a new state (React states are immutable)
    // and we trigger the rendering
    this.setState({
      checked : !this.state.checked
    })
  },
  render : function(){
    // little addon that makes life easier
    var classes = React.addons.classSet({
      "list-item" : true,
      "list-item--valid" : this.state.checked
    })
    return (
      <div className={classes}>
        {/* our binding, simple as that*/}
        <input checked={this.state.checked} type="checkbox" onChange={this.toggle} />
        {this.props.label}
      </div>
    )
  }
})

// let's mount the component and pass the label to it
var view = React.render(<View label="helloworld" />, document.getElementById("id"))
// and voilà!
view.toggle()
```

## Sum up of React's advantages

React has this figured out:

- DOM i/o is slow and not accessing it too often is crucial;
- always thinking about the state the DOM has at every moment is not what we should
do while developing the UI of our component;
- immutability (objects don't change, a new one gets created every time you need to change something in it) and composition (composing a class of several functionnalities without having to create deep and complex chains of inheritance) are really useful and not used nearly as much as they should be in front-end development.

As a bonus, React, while not imposing a specific library for data and module communication, offers an approach to it, called [flux](http://facebook.github.io/flux/docs/overview.html) which is really interesting and gives you a hand to design an app while keeping the React paradigms in mind.

Last but not least, you can even render your React component from the server, and it will be clever enough to actually recognize your already-generated components and to keep track of their state from then on.
Pretty neat, huh?
