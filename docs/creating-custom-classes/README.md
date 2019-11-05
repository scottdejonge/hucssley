---
sidebar: auto
---

# Creating custom classes

While Hucssley provides an abundance of classes out-of-the-box, there will absolutely be times where you need to create your own to achieve your desired UI, which is hopefully straight-forward to achieve.

## Customizing “placeholder” classes

Some of the default classes in Hucssley are merely provided as empty placeholders, because their usage is too specific to be generically useful for all projects. These placeholders help to reduce some of the “ceremony” needed with creating completely custom classes.

A good example of this is for (box) shadows. By overriding the empty `$hu-box-shadow-modules` and `$hu-box-shadow-types` variables, developers can easily output `box-shadow`s appropriate for their project.

The following snippet also demonstrates how you can use [configuration helper](#configuration-helpers) methods within your definitions:

```scss
$hu-box-shadow-modules: (base);

$hu-box-shadow-types: (
  100: 0 hu-rem(2) hu-rem(10) rgba(hu-get($hu-colors, neutral 1000), 0.1),
  200: 0 hu-rem(4) hu-rem(12) rgba(hu-get($hu-colors, neutral 1000), 0.2),
);
```

will generate:

```css
.box-shadow:100 {
  box-shadow: 0 0.125rem 0.625rem rgba(26, 26, 26, 0.1);
}

.box-shadow:200 {
  box-shadow: 0 0.25rem 0.75rem rgba(26, 26, 26, 0.2);
}
```

## Creating new, “basic” classes

For the most common needs of creating new classes, Hucssley provides 3 easy ways of creating custom “generic”, pseudo and parent utility classes.

While the following examples all use `$-modules` and `$-types` variables that are provided by Hucssley, if creating your own, fully custom classes, we recommend setting them up in a way to cater for any complexity as your project grows, thus define the variables similarly to how the defaults are done. For examples and to learn more, please read [Hucssley classes](/hucssley-classes.md).

### Generic classes: `hu-classes`

This mixin generates all of the normal classes for a specific property, modules and types. It’s what Hucssley itself uses for 95% of the provided classes.

```
@mixin hu-classes($property, $modules, $types?);
```

It takes a `$property`, which can be either a CSS property or a map, a list or map of `$modules` and an optional list or map of `$types`. It also accepts `@content` if no `$types` are supplied.

*Note: This mixin is a wrapper around six other mixins, `hu-generic-classes()` and `hu-responsive-classes()`, `hu-pseudo-generic-classes()`, `hu-pseudo-responsive-classes()`, `hu-parent-generic-classes()` and `hu-parent-responsive-classes()
`.*

#### Basic

```scss
@include hu-classes(align-content, $hu-align-content-modules, $hu-align-content-types);

/* ->
.align-content:baseline {
  align-content: baseline;
}

.align-content:center {
  align-content: center;
}

…

@media (min-width: 22.5em) {
  .@mq-480--align-content:baseline {
    align-content: baseline;
  }

  .@mq-480--align-content:center {
    align-content: center;
  }
}

…
*/
```

#### Custom class name

By passing a map to `$property`, the map’s key becomes the core class name, and the map’s value becomes the CSS property.

```scss
@include hu-classes((transition-easing: transition-timing-function), $hu-transition-easing-modules, $hu-transition-easing-types);

/* ->
.transition-easing:ease {
  transition-timing-function: ease;
}

.transition-easing:ease-in {
  transition-timing-function: ease-in;
}

…

@media (min-width: 22.5em) {
  .is-selected.is-selected--transition-easing:ease {
    transition-timing-function: ease;
  }

  .is-selected.is-selected--transition-easing:ease-in {
    transition-timing-function: ease-in;
  }
}

…
*/
```

#### Unique class with multiple declarations

By not proving a `$type` and passing in a `@content` block, you can create “one off” classes with multiple, static declarations.

```scss
@include hu-classes(font-smoothing, $hu-font-smoothing-modules) {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
}

/* ->
.font-smoothing {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
}

@media (min-width: 22.5em) {
  .@mq-480--font-smoothing {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
  }
}

…
*/
```

You could also use this technique to add complex `@supports` feature queries:

```scss
@include hu-classes("@supports-blend-mode:multiply", (base)) {
  @supports (mix-blend-mode: multiply) {
    mix-blend-mode: multiply;
    opacity: 1;
  }
}

/* ->
@supports (mix-blend-mode: multiply) {
  .@supports-blend-mode:multiply {
    mix-blend-mode: multiply;
    opacity: 1;
  }
}
*/
```

Of course, just because you can’t provide a `$type` argument to the mixin, it doesn’t mean you’re restricted from creating multiple classes, since you can easily wrap it in its own `@each` loop:

```scss
// if $types was a map, also extract the $value variable and use that in the mixin's @content
@each $type in $hu-blend-mode-types {
  @include hu-classes("@supports-blend-mode:#{$type}", $hu-blend-mode-modules) {
    @supports (mix-blend-mode: #{$type}) {
      mix-blend-mode: $type;
    }
  }
}

/* ->
@supports (mix-blend-mode: color) {
  .@supports-blend-mode:color {
    mix-blend-mode: color;
  }
}

@supports (mix-blend-mode: color-burn) {
  .@supports-blend-mode:color-burn {
    mix-blend-mode: color-burn;
  }
}

…
```

If your custom utilities also needs to support the `responsive` module, then you won’t be able to use the above method exactly. You can change `@include hu-classes` to `@include hu-generic-classes`, and also manually create the responsive classes using `hu-responsive()` as described in [Writing custom class logic](#writing-the-class-logic).

#### Pseudo classes

One benefit Hucssley has over other, similar libraries is that there is a defined method for easily creating pseudo classes.

If, as described in [Understanding class configuration: Advanced modules](/hucssley-classes.md#advanced-modules), you pass `$modules` as a map with a `pseudos` key, pseudo selector classes will also be generated for the complete list of modules.

For example:

```scss
$hu-display-modules: (
  core: $hu-display-modules,
  pseudos: ("::before", ":first-child"),
);

@include hu-classes(display, $hu-display-modules, $hu-display-types);

/* ->
…

.&:before--display:block::before {
  display: block;
}

.&:first-child--display:block:first-child {
  display: block;
}

…

@media (min-width: 22.5em) {
  .@mq-480:before--display:block::before {
    display: block;
  }

  .@mq-480:first-child--display:block:first-child {
    display: block;
  }
}

…
*/
```

#### Parent classes

Another benefit of Hucssley is that you can easily create custom parent classes, such as being able to respond to a `has-js` class. It behaves similarly to the above, but you instead provide a `parents` key with a list of one or more parent selectors you want to generate classes for.

```scss
$hu-display-modules: (
  core: $hu-display-modules,
  parents: ("has-js"),
);

@include hu-classes(display, $hu-display-modules, $hu-display-types);

/* ->
…

.has-js .has-js__display:block {
  display: block;
}

.has-js .has-js__display:flex {
  display: flex;
}

…

.has-js .is-expanded.has-js__is-expanded--display:block {
  display: block;
}

.has-js .is-expanded.has-js__is-expanded--display:flex {
  display: flex;
}

…
*/
```

### Pseudo classes: `hu-pseudo-classes`

While `hu-classes` will be suitable for most use cases, should you need, you can also explicitly create pseudo classes with the `hu-pseudo-classes()` mixin. It behaves similarly to `hu-classes()`, but you also need to pass in a list of one or more pseudo selectors you want to generate classes for.

```
@mixin hu-pseudo-classes($property, $pseudos, $modules, $types?);
```

This mixin is a wrapper around two other mixins, `hu-pseudo-generic-classes()` and `hu-pseudo-responsive-classes()`, which take exactly the same arguments.

```scss
@include hu-pseudo-classes(display, ("::before", ":first-child"), $hu-display-modules, $hu-display-types);

/* ->
.&:before--display:block::before {
  display: block;
}

.&:first-child--display:block:first-child {
  display: block;
}

.&:before--display:flex::before {
  display: flex;
}

.&:first-child--display:flex:first-child {
  display: flex;
}

…

@media (min-width: 22.5em) {
  .@mq-480:before--display:block::before {
    display: block;
  }

  .@mq-480:first-child--display:block:first-child {
    display: block;
  }

  .@mq-480:before--display:flex::before {
    display: flex;
  }

  .@mq-480:first-child--display:flex:first-child {
    display: flex;
  }
}

…
*/
```

As with `$hu-classes`, you can customize the class name by passing a map to `$property`, and you can create unique classes with multiple declarations by not proving a `$type` and passing in a `@content` block.

### Parent classes: `hu-parent-classes`

While `hu-classes` will be suitable for most use cases, should you need, you can also explicitly create custom parent classes with the `hu-parent-classes()` mixin. It behaves similarly to `hu-pseudo-classes()`, but you instead pass in a list of one or more parent elements you want to generate classes for.

*Note: `group-focus`, `group-hover`, `group-hocus` and `group-state` modules are not used for custom parents.*

```
@mixin hu-parent-classes($property, $parents, $modules, $types?);
```

This mixin is a wrapper around two other mixins, `hu-parent-generic-classes()` and `hu-parent-responsive-classes()`, which take exactly the same arguments.

```scss
@include hu-parent-classes(display, (has-js), $hu-display-modules, $hu-display-types);

/* ->
.has-js .has-js__display:block {
  display: block;
}

.has-js .has-js__:focus--display:block:focus {
  display: flex;
}

…

@media (min-width: 22.5em) {
  .has-js .has-js__@mq-480--display:block {
    display: block;
  }

  .has-js .is-selected.has-js__@mq-480-is-selected--display:block {
    display: block;
  }
}

…
*/
```

As with `$hu-classes`, you can customize the class name by passing a map to `$property`, and you can create unique classes with multiple declarations by not proving a `$type` and passing in a `@content` block.

## Creating new, “more complex” classes

Should you need to create classes that are more complex than what the 3 basic mixins described above can provide, you can follow a defined pattern for creating your own. However, before you do, it’s worth having a basic understanding of the functions and mixins you’ll use.

### Helper Functions

#### `hu-class-name`

This function formats a class name to append `$hu-namespace` (if applicable), convert duplicate final strings (e.g. `color:transparent-transparent` to `color:transparent`) and escape special characters like `:`, `<`, `>` and `@`.

```scss
@function hu-class-name($class-name);

hu-class-name("eqio-<520-color:transparent-transparent");
// -> hu-eqio-\<520-color\:transparent
```

*Note: if your class name contains a special character, ensure you pass it as a quoted string.*

#### `hu-format-modules`

This function removes duplicates and re-orders the list of modules in to the correct specificity order so you needn’t worry about this aspect of your CSS.

```scss
@function hu-format-modules($list-of-modules);

hu-format-modules((state, print, responsive, state, base));
// -> (base, state, print, responsive)
```

#### `hu-important`

Outputs `!important` when `$hu-use-important: true`.

```scss
@function hu-important();

hu-important();
// -> !important
```

### Mixins

*Note: All of the following examples assume `$hu-namespace: "hu-"` has been set.*

#### `hu-generic`

Generates the `base`, `focus`, `hover`, `hocus`, `state`, `group-hover`, `group-state`, `reduced-motion` and `print` module styles for a class (in that order) while also adding the correct specificity.

```scss
@mixin hu-generic($class-name, $one-or-multiple-modules);

@include hu-generic(hu-class-name("display:block"), (base, group-hover, print)) {
  display: block #{hu-important()};
}

/* ->
.hu-display:block {
  display: block;
}

.group:hover .group:hover__hu-display:block {
  display: block;
}

@media print {
  .@print--hu-display:block.print--hu-display:block.print--hu-display:block {
    display: block;
  }
}
*/
```

#### `hu-responsive`

Generates the responsive `base`, `state` and `group-state` module styles for a class (in that order).

*Note: it does not generate the required media queries, as they need to be [created in a specific manner as described below](#writing-the-class-logic).*

```scss
@mixin hu-responsive($class-name, $one-or-multiple-modules, $media-query-scale);

@include hu-responsive(hu-class-name("display:block"), (base, responsive, state), medium) {
  display: block #{hu-important()};
}

/* ->
.@mq-medium--hu-display:block {
  display: block;
}

.is-selected.@mq-medium-is-selected--hu-display:block {
  display: block;
}
*/
```

#### `hu-parent`

Generates the `base`, `focus`, `hover`, `hocus`, `state`, `reduced-motion` and `print` module styles for a parent selector class (in that order) while also adding the correct specificity.

```scss
@mixin hu-parent($class-name, $parent-selectors, $one-or-multiple-modules, $child-string-to-strip?);

@include hu-parent(hu-class-name("display:block"), (browser-edge, browser-ie), (base, hover)) {
  display: block #{hu-important()};
}

/* ->
.browser-edge .browser-edge__hu-display:block {
  display: block;
}

.browser-ie .browser-ie__hu-display:block {
  display: block;
}

.browser-edge .browser-edge__:hover--hu-display:block:hover {
  display: block;
}

.browser-ie .browser-ie__:hover--hu-display:block:hover {
  display: block;
}
*/
```

The optional `$child-string-to-strip` argument is to remove characters before the `__`, and can be useful if you create a generic child class that can respond to any parent selector, such as is used when generating themes.

#### `hu-parent-responsive`

Generates the responsive `base` and `state` module styles for a parent selector class (in that order).

*Note: it does not generate the required media queries, as they need to be [created in a specific manner as described below](#writing-the-class-logic).*

```scss
@mixin hu-parent-responsive($class-name, $parent-selectors, $one-or-multiple-modules, $media-query-scale, $child-string-to-strip?);

@include hu-parent-responsive(hu-class-name("display:block"), (browser-edge, browser-ie), (base, responsive), medium) {
  display: block #{hu-important()};
}

/* ->
.browser-edge .browser-edge__@mq-medium--hu-display:block {
  display: block;
}

.browser-ie .browser-ie__@mq-medium--hu-display:block {
  display: block;
}
*/
```

#### `hu-pseudo`

Generates the `base`, `focus`, `hover`, `hocus`, `state`, `reduced-motion` and `print` module styles for a pseudo selector class (in that order) while also adding the correct specificity.

```scss
@mixin hu-pseudo($class-name, $pseudo-selectors, $one-or-multiple-modules);

@include hu-pseudo(hu-class-name("display:block"), ("::before", ":first-child"), (base, reduced-motion)) {
  display: block #{hu-important()};
}

/* ->
.&:before--hu-display:block::before {
  display: block;
}

.&:first-child--hu-display:block:first-child {
  display: block;
}

@media (prefers-reduced-motion: reduce) {
  .@reduced-motion:before--hu-display:block::before.@reduced-motion:before--hu-display:block::before.@reduced-motion:before--hu-display:block::before {
    display: block;
  }
}

@media (prefers-reduced-motion: reduce) {
  .reduced-motion:first-child--hu-display:block:first-child.reduced-motion:first-child--hu-display:block:first-child.reduced-motion:first-child--hu-display:block:first-child {
    display: block;
  }
}
*/
```

#### `hu-pseudo-responsive`

Generates the responsive `base` and `state` module styles for a pseudo selector class (in that order).

*Note: it does not generate the required media queries, as they need to be [created in a specific manner as described below](#writing-the-class-logic).*

```scss
@mixin hu-pseudo-responsive($class-name, $pseudo-selectors, $one-or-multiple-modules, $media-query-scale);

@include hu-pseudo-responsive(hu-class-name("display:block"), ("::before", ":first-child"), (base, responsive), medium) {
  display: block #{hu-important()};
}

/* ->
.@mq-medium:before--display:block::before {
  display: block;
}

.@mq-medium:first-child--display:block:first-child {
  display: block;
}
*/
```

Now we have a basic understanding of the functions and mixins used to create classes, we can follow Hucssley’s approach to create our own.

Let’s write some classes to size icons with both `height` and `width` declarations…

### Defining the variables

As with the OOTB classes, each custom class needs to know which modules it will be created for, and the types and values to use, so let’s create the variables for that.

```scss
$icon-size-modules: (base, responsive);

$icon-size-types: (
  100: hu-rem(16),
  200: hu-rem(24),
);
```

*Note: Don’t prefix custom variables with `hu-` to ensure you don’t accidentally overwrite future updates to Hucssley.*

### Writing the class logic

Although the mixins described above can take a list of modules, to ensure the correct class name order is produced for multiple types, it is recommended to manually loop over the modules externally by following this pattern:

```scss
// loop through the formatted modules in order
@each $module in hu-format-modules($icon-size-modules) {
  // loop through and extract $type & $value variables from each item in $types
  @each $type, $value in $icon-size-types {
    // define the class name you want, including the $type
    $class-name: hu-class-name("icon-size:#{$type}");
    // ensure $value supports $types that are both lists and maps
    $value: if($value, $value, $type);

    // call hu-generic with the $class-name and $module
    @include hu-generic($class-name, $module) {
      // write your declarations, using $value as the CSS value
      height: $value #{hu-important()};
      width: $value #{hu-important()};
    }
  }
}
```

The above loop doesn’t generate the responsive classes. If we generated them within that `$types` loop, you’d quickly encounter that higher scale base classes would override lower scale responsive classes. By moving them in to a separate loop and block, we can improve build time performance and run-time performance by batching up the media queries to produce smaller output.

```scss
// only try this if responsive is a module
@if index($icon-size-modules, responsive) {
  // extract $mq-scale and $mq-value variables for each media query
  @each $mq-scale, $mq-value in $hu-media-queries {
    // call the media-query mixin with $mq-value, which supports media query values as min-h/max-w maps
    @include hu-media-query($mq-value) {
      // loop through and extract $type & $value variables from each item in $types
      @each $type, $value in $icon-size-types {
        // define the class name you want, including the $type
        $class-name: hu-class-name("icon-size:#{$type}");
        // ensure $value supports $types that are both lists and maps
        $value: if($value, $value, $type);

        // call hu-responsive with the $class-name, *all* modules and $mq-scale
        @include hu-responsive($class-name, $icon-size-modules, $mq-scale) {
          // write your declarations, using $value as the CSS value
          height: $value #{hu-important()};
          width: $value #{hu-important()};
        }
      }
    }
  }
}
```

The output from these 2 blocks is:

```css
.icon-size:100 {
  height: 1rem;
  width: 1rem;
}

.icon-size:200 {
  height: 1.5rem;
  width: 1.5rem;
}

@media (min-width: 30em) {
  .@mq-480--icon-size:100 {
    height: 1rem;
    width: 1rem;
  }

  .@mq-480--icon-size:200 {
    height: 1.5rem;
    width: 1.5rem;
  }
}

// and all other media queries defined…
```

To see a fully-fledged example, take a look at how [`rotate`](/src/classes/_hu-rotate.scss) is written.

#### Creating custom pseudo classes

One benefit Hucssley has over other, similar libraries is that there is a defined method for easily creating pseudo classes. As with “generic” classes, you’ll need 2 code blocks, but instead of calling `hu-generic` and `hu-responsive`, you call `hu-pseudo` and `hu-pseudo-responsive` with the appropriate, documented arguments.

```scss
// loop through the formatted modules in order
@each $module in hu-format-modules($icon-size-modules) {
  // loop through and extract $type & $value variables from each item in $types
  @each $type, $value in $icon-size-types {
    // define the class name you want, including the $type
    $class-name: hu-class-name("icon-size:#{$type}");
    // ensure $value supports $types that are both lists and maps
    $value: if($value, $value, $type);

    // call hu-pseudo with the $class-name, pseudo selectors and $module
    @include hu-pseudo($class-name, ("::before"), $module) {
      // write your declarations, using $value as the CSS value
      height: $value #{hu-important()};
      width: $value #{hu-important()};
    }
  }
}

// only try this if responsive is a module
@if index($icon-size-modules, responsive) {
  // extract $mq-scale and $mq-value variables for each media query
  @each $mq-scale, $mq-value in $hu-media-queries {
    // call the media-query mixin with $mq-value, which supports media query values as min-h/max-w maps
    @include hu-media-query($mq-value) {
      // loop through and extract $type & $value variables from each item in $types
      @each $type, $value in $icon-size-types {
        // define the class name you want, including the $type
        $class-name: hu-class-name("icon-size:#{$type}");
        // ensure $value supports $types that are both lists and maps
        $value: if($value, $value, $type);

        // call hu-pseudo responsive with the $class-name, pseudo selectors, *all* modules and $mq-scale
        @include hu-pseudo-responsive($class-name, ("::before"), $icon-size-modules, $mq-scale) {
          // write your declarations, using $value as the CSS value
          height: $value #{hu-important()};
          width: $value #{hu-important()};
        }
      }
    }
  }
}
```

Generates the following:

```css
.&:before--icon-size:100::before {
  height: 1rem;
  width: 1rem;
}

.&:before--icon-size:200::before {
  height: 1.5rem;
  width: 1.5rem;
}

@media (min-width: 30em) {
  .@mq-480:before--icon-size:100::before {
    height: 1rem;
    width: 1rem;
  }

  .@mq-480:before--icon-size:200::before {
    height: 1.5rem;
    width: 1.5rem;
  }
}

// and all other media queries defined…
```

#### Creating custom parent classes

Similarly, custom parent classes can also easily be generated with the `hu-parent` and `hu-parent-responsive` mixins:

```scss
// loop through the formatted modules in order
@each $module in hu-format-modules($icon-size-modules) {
  // loop through and extract $type & $value variables from each item in $types
  @each $type, $value in $icon-size-types {
    // define the class name you want, including the $type
    $class-name: hu-class-name("icon-size:#{$type}");
    // ensure $value supports $types that are both lists and maps
    $value: if($value, $value, $type);

    // call hu-parent with the $class-name, parent selectors and $module
    @include hu-parent($class-name, (browser-mobile), $module) {
      // write your declarations, using $value as the CSS value
      height: $value #{hu-important()};
      width: $value #{hu-important()};
    }
  }
}

// only try this if responsive is a module
@if index($icon-size-modules, responsive) {
  // extract $mq-scale and $mq-value variables for each media query
  @each $mq-scale, $mq-value in $hu-media-queries {
    // call the media-query mixin with $mq-value, which supports media query values as min-h/max-w maps
    @include hu-media-query($mq-value) {
      // loop through and extract $type & $value variables from each item in $types
      @each $type, $value in $icon-size-types {
        // define the class name you want, including the $type
        $class-name: hu-class-name("icon-size:#{$type}");
        // ensure $value supports $types that are both lists and maps
        $value: if($value, $value, $type);

        // call hu-parent-responsive with the $class-name, parent selectors, *all* modules and $mq-scale
        @include hu-parent-responsive($class-name, (browser-mobile), $icon-size-modules, $mq-scale) {
          // write your declarations, using $value as the CSS value
          height: $value #{hu-important()};
          width: $value #{hu-important()};
        }
      }
    }
  }
}
```

will generate the following:

```css
.browser-mobile .browser-mobile__icon-size:100 {
  height: 1rem;
  width: 1rem;
}

.browser-mobile .browser-mobile__icon-size:200 {
  height: 1.5rem;
  width: 1.5rem;
}

@media (min-width: 30em) {
  .browser-mobile .browser-mobile__@mq-480--icon-size:100 {
    height: 1rem;
    width: 1rem;
  }
  .browser-mobile .browser-mobile__@mq-480--icon-size:200 {
    height: 1.5rem;
    width: 1.5rem;
  }
}

// and all other media queries defined…
```