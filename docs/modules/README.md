---
sidebar: auto
---

# Modules

The following core modules are available for all classes: `base`, `focus`, `hover`, `hocus`, `state`, `group-hover`, `group-state`, `reduced-motion`, `print` and `responsive`.

You can also use modules to generate pseudo and custom parent classes. Please read [Understanding class configuration: Modules](/hucssley-classes.md#modules) and [Generic classes: `hu-classes`](#generic-classes-hu-classes) for more information.

## Base: `base`

Base classes in Hucssley roughly equate to a standard version of a CSS property and value:

This declaration:

```css
align-items: flex-end;
```

would be available as the following base class:

```css
.align-items:flex-end
```

The property becomes the class name preceding the `:` and the value follows it.

Some classes deviate by default though:

```css
animation-count -> animation-iteration-count
animation-easing -> animation-timing-function
animation-mode -> animation-fill-mode
animation-state -> animation-play-state
blend-mode -> mix-blend-mode
momentum-scrolling -> -webkit-overflow-scrolling
pos-[bottom,left,right,top] -> bottom,left,right,top
rotate -> transform: rotate
scale -> transform: scale
size -> height & width
svg-fill-color -> fill
svg-fill-rule -> fill-rule
svg-stroke-color -> stroke
transition-easing -> transition-timing-function
translate-x -> transform: translateX
translate-y -> transform: translateY
```

All of the above aliases – and every other class alias – can be changed to your liking, however. Please read [Understanding class configuration: Aliases](/hucssley-classes.md#aliases) for more details.

*Note: If a global namespace has been configured, it will always precede the base class name.*

### Non-parent modules: `visited, focus, hocus, hover, active, print, reduced-motion, responsive`

When you want to use class names scoped to “non-parent” modules, it follows a pattern of `[module-name][-module-variant]?--[base-class]`, for instance:

```css
.@mq-768--align-items:center
.&:hocus--color:neutral-1000
.@print--flex-direction:column
```

In the above example, `&:hocus` is a shortcut module for `:hover, :focus`, and `@mq-768` is for a `(min-width: 768px)` media query.

The `:active`, `:focus`, `:hover` and `:visited` pseudo-classes are automatically ordered to the [LVHA system](https://developer.mozilla.org/en-US/docs/Web/CSS/:active) to ensure links and buttons are styled predictably.

*Note: top-level pseudo classes are prefixed with `&`.*

## State modules: `state`

State modules allow you to change the UI based on a particular state, and follows the pattern `[state-name]--[base-class]`:

```css
.is-expanded--visibility:visible
.is-disabled--opacity:30
```

For state classes to become active, you need to apply the raw state name as an additional class on the element (often via JavaScript):

```diff
<div class="
  display:none
  is-open--display:block
+ is-open
"></div>
```

## Group modules: `group-focus, group-hover, group-hocus, group-state`

With groups, you can style child elements when interacting with a generic parent element (`:focus` and/or `:hover`), or when it’s in a particular UI state. Their syntax is `group[group-type]__[base-class]`:

```
.group:focus__scale:110
.group:hover__scale:110
.group:hocus__scale:110 // both :focus and :hover
.group-is-selected__background-color:blue-300
```

For `group` classes to take effect, a parent has to be given the raw `.group` class, and raw state class if applicable:

```diff
<html>
  …
  <div class="
    group
+   is-selected
  ">
    <ul class="
      group:hover__scale:110
      group-is-selected__background-color:blue-300
    "></ul>
  </div>
</html>
```

Be careful when using groups, because they will affect all `.group…__` children. A child `.group` does not reset the actions of a parent `.group`, so you could end up with unexpected behaviour. It’s recommended to use groups on ancestors that are near to leaf nodes.

## Custom parent modules

Similar to groups, Hucssley allows you to use any kind of parent selector to affect and style children. However, unlike groups, custom parent selectors allow you to explicitly quarantine and contain these styling side effects.

Possible use cases are for a browser detection library that may add `browser-mobile`, `browser-ie` etc to `<html>`, or an element/container queries alternative like [eqio](https://github.com/stowball/eqio), that adds classes such as `eqio->400` to a parent element, and would be targetable with `eqio->400__flex-direction:row` for example.

Their syntax is `[parent-name]__[base-class]`:

```html
<html class="browser-mobile">
  …
  <div class="browser-mobile__font-size:700">
    …
  </div>
</html>
```

In the above example, we used a `browser-mobile__font-size:700` class name, which, while not included in Hucssley by default, hopefully illustrates how it can be used to style elements by any library or approach that adds a class like `browser-mobile` to a parent element.

For more information, please read [Parent classes](#parent-classes-hu-parent-classes).

## Combining modules: `responsive` and `visited, focus, hover, hocus, active, state, group-hover, group-state`

When a particular class is configured to use the `responsive` module, it will also output `focus`, `hover`, `hocus`, `state`, `group-hover` and `group-state` classes should they have also been configured.

Here the syntax is:

* `@mq-[responsive-scale]:visited--[base-class]` for `visited`
* `@mq-[responsive-scale]:focus--[base-class]` for `focus`
* `@mq-[responsive-scale]:hover--[base-class]` for `hover`
* `@mq-[responsive-scale]:hocus--[base-class]` for `hocus`
* `@mq-[responsive-scale]:active--[base-class]` for `active`
* `@mq-[responsive-scale]-[state-name]--[base-class]` for `state`s
* `group:hover__@mq-[responsive-scale]--[base-class]` for `group-hover`
* `group-[state-name]__@mq-[responsive-scale]--[base-class]` for `group-state`

Which results in:

```css
.@mq-480:active--color:neutral-1000
.@mq-600-is-expanded--display:flex
.group:hover__@mq-768--display:block
.group-is-collapsed__@mq-1024--height:0
```