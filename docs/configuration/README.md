---
sidebar: auto
---

# Configuration

To override the default configuration in Hucssley, you’ll need to understand the basic syntax of Sass [variables](https://sass-lang.com/documentation/variables), [lists](https://sass-lang.com/documentation/values/lists) and [maps](https://sass-lang.com/documentation/values/maps).

Hucssley’s configuration is split in to 3 sections: `reset`, `global` and `classes`.

* **Reset** configuration uses plain variables to customize “generic” styles like whether `box-sizing: border-box` should be used by default.
* **Global** configuration mostly uses maps to handle things like the default media queries, colors, spacings, UI states and themes.
* **Classes** provides list and map variables to adjust the modules, and values for each class individually. Some classes (like those which deal with color) inherit from the same base variable by default, so only 1 change is required to affect all `border-color`, `background-color` and `color` classes. All classes can be generated at the individual modules described above.

As detailed in the [Installation](#installation) section, there is a preferred way of organizing any configuration overrides.

## Configuration helpers

Hucssley provides several functions that can assist you with modifying the existing configuration or configuring custom classes:

### `hu-append` and `hu-prepend`

```scss
@function hu-append($source, $target);

hu-append((a, b), (c));
// -> (a, b, c)
```

Will append the `$target` list or map to the `$source` list or map.

```scss
@function hu-prepend($source, $target);

hu-prepend((a, b), (c));
// -> (c, a, b)
```

Will prepend the `$target` list or map to the `$source` list or map.

With both of the above functions, they have to be of the same type. When used with maps, they actually perform a `map-merge`, so existing keys in `$source` will also be overwritten with `$target`'s, should they exist there.

### `hu-get`

```scss
@function hu-get($list-or-map, $path, $stack-trace-name?);

hu-get($hu-colors, neutral 1000);
// -> #1a1a1a

hu-get($hu-font-weight-types, 700);
// -> 700
```

Gets the value at a specific path within a map or list.

### `hu-em` and `hu-rem`

```scss
@function hu-em($target, $context: 16);

hu-em(20px);
// -> 1.25em
```

Will convert a target pixel value to its `em` equivalent.

```scss
@function hu-rem($target, $context: 16);

hu-rem(24px);
// -> 1.5rem
```

Will convert a target pixel value to its `rem` equivalent.

### `hu-tint` and `hu-shade`

```scss
@function hu-tint($color, $percentage);

hu-tint(#361110, 40);
// -> #be3c38;
```

Will mix the specified `$color` with a `$percentage` of white.

```scss
@function hu-shade($color, $percentage);

hu-shade(#361110, 40);
// -> #200a0a;
```

Will mix the specified `$color` with a `$percentage` of black.

## Reset

Here is a list of variables and default values that are available to customize the CSS reset:

```scss
$hu-reset: true;
$hu-reset-box-sizing: border-box;
$hu-reset-html-background-color: #fff;
$hu-reset-html-color: null;
$hu-reset-html-font-family: sans-serif;
$hu-reset-html-font-size: $hu-f-rem-context;
$hu-reset-html-font-smoothing: true;
$hu-reset-html-line-height: 1.25;
$hu-reset-html-overflow-y: null;
$hu-reset-img-responsive: false;
$hu-reset-input-placeholder-color: #767676;
$hu-reset-remove-number-input-spinners: true;
$hu-reset-text-input-appearance: textfield;
```

Hopefully the variables are self explanatory, but if not, please [review the source code](/src/reset/_index.scss) to see how they affect the reset styles.

If you wish to disable default values, you can simply set the appropriate variable to `null`.

You can also use [`hu-get`](#hu-get) to set the variables to values defined in other list and map variables, for example:

```scss
$hu-reset-html-color: hu-get($hu-colors, "neutral" 800);
```

## Global

### Colors: `$hu-colors`

To get you started, Hucssley provides a generous palette of colors in the spectrum at multiple scales, as well as for keywords like `inherit` and `transparent`:

```scss
$hu-colors: (
  "neutral": (
    0: #ffffff,
    …
    500: #858585,
    …
    1000: #131313,
  ),
  "red": (
    0: #fdf2f1,
    …
    500: #de3f35,
    …
    1000: #1f0705,
  ),
  "orange": (
    0: #fef7f2,
    …
    500: #f58949,
    …
    1000: #271002,
  ),
  "yellow": (
    0: #fefaeb,
    …
    500: #f4cb39,
    …
    1000: #251d02,
  ),
  "green": (
    0: #f0fcf5,
    …
    500: #2dd86c,
    …
    1000: #051d0e,
  ),
  "blue": (
    0: #f0f7fc,
    …
    500: #2d8dd8,
    …
    1000: #05121d,
  ),
  "indigo": (
    0: #f3f0fc,
    …
    500: #5a2dd8,
    …
    1000: #0b051d,
  ),
  "violet": (
    0: #fcf0fb,
    …
    500: #d82dc7,
    …
    1000: #1d051a,
  ),
);
```

**You can see the rendered palette here: https://codepen.io/stowball/full/JqbGvK**

To customize the palette, you can either `hu-append` or `hu-prepend` other maps to complement the existing, or start fresh by re-assigning `$hu-colors` to a new map of colors entirely.

We recommend also `hu-append`ing `$hu-colors-keywords` to your brand new palette to ensure you can use classes like `background-color:transparent` and `color:inherit`;

Here is an example of setting a completely new palette:

```scss
$hu-colors: hu-append($hu-colors-keywords, (
  neutral: (
    0: #fff,
    100: #fafbfd,
    200: #f9fafc,
    300: #f1f4f8,
    400: #f1f1f1,
    500: #e0e1e2,
    600: #aeaeae,
    700: #888,
    800: #626262,
    900: #495b60,
    1000: #140a01,
  ),
  blue: (
    100: #f3f9ff,
    300: #cff5fa,
    400: #afeff7,
    600: #00c2da,
    1000: #003453,
  ),
  yellow: (
    200: #fdf8c2,
    300: #fbf5ac,
  ),
  green: (
    1000: #17653b,
  ),
  red: (
    100: #fffdfc,
    1000: #b40b00,
  ),
));
```

### Media queries: `$hu-media-queries`

Out-of-the-box, Hucssley provides the following 5 breakpoint values, with all being output for every `responsive` class name. It can be modified or replaced entirely to suit your project.

```scss
$hu-media-queries: (
  480: hu-em(480),
  600: hu-em(600),
  768: hu-em(768),
  1024: hu-em(1024),
  1280: hu-em(1280),
);
```

If the value of an `$hu-media-queries` key is a number, it will compile it to a `(min-width: [value])` media query.

If, however, you provide a map with any of the following keys: `min-h`, `max-h`, `min-w`, `max-w`, and `orientation`, then appropriate `(min-height)`, `(max-height)`, `(min-width)`, `(max-width)` and `(orientation)` media queries will be output.

Another special `other` key is also supported, which, when supplied with a map of key/value pairs will also output those as media query conditions, which will allow you to target every kind of [feature](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries#Media_features).

If multiple keys exist, each media query condition will be combined with the `and` operator.

To demonstrate:

```scss
$hu-media-queries: (
  600: hu-em(600),
  min-h-200: (min-h: hu-em(200)),
  max-h-400: (max-h: hu-em(400)),
  min-w-300: (min-w: hu-em(300)),
  max-w-500: (max-w: hu-em(500)),
  min-w-300-max-w-500: (min-w: hu-em(300), max-w: hu-em(500)),
  landscape: (orientation: landscape),
  coarse: (other: (pointer: coarse)),
  min-res-200: (other: (min-resolution: 200dpi)),
  all: (
    min-h: hu-em(200),
    max-h: hu-em(400),
    min-w: hu-em(300),
    max-w: hu-em(500),
    orientation: landscape,
    other: (pointer: coarse, min-resolution: 200dpi)
  ),
);
```

would generate the following `@mq-` classes:

```css
@media (min-width: 37.5em) {
  .@mq-600--… { … }
}

@media (min-height: 12.5em) {
  .@mq-min-h-200--… { … }
}

@media (max-height: 25em) {
  .@mq-max-h-400--… { … }
}

@media (min-width: 18.75em) {
  .@mq-min-w-300--… { … }
}

@media (max-width: 31.25em) {
  .@mq-max-w-500--… { … }
}

@media (min-width: 18.75em) and (max-width: 31.25em) {
  .@mq-min-w-300-max-w-500--… { … }
}

@media (orientation: landscape) {
  .@mq-landscape--… { … }
}

@media (pointer: coarse) {
  .@mq-coarse--… { … }
}

@media (min-resolution: 200dpi) {
  .@mq-min-res-200--… { … }
}

@media (min-height: 12.5em) and (max-height: 25em) and (min-width: 18.75em) and (max-width: 31.25em) and (orientation: landscape) and (pointer: coarse) and (min-resolution: 200dpi) {
  .@mq-all--… { … }
}
```

Notice how, apart from the `@mq-` prefix, Hucssley does not dictate the media query class name format, so, should you wish to use ranges like `small` or `medium`, or device types like `tablet`, or `desktop`, it’s entirely up to you.

### UI states: `$hu-states`

Out-of-the-box, Hucssley provides the following 10 UI state values, with all being output for every `state` and `group-state` class name. It can be modified or replaced entirely to suit your project.

```scss
$hu-states: (
  is-closed,
  is-collapsed,
  is-disabled,
  is-expanded,
  is-hidden,
  is-loading,
  is-open,
  is-pressed,
  is-selected,
  is-visible,
);
```

*Note: UI states generated by class names are not sufficient enough to produce fully accessible interfaces, so please ensure you also implement the correct [ARIA states and properties](https://www.w3.org/WAI/PF/aria-1.1/states_and_properties) where necessary.*

### Spacing scale: `$hu-spacing-scale`

By default, `margin` and `padding` classes are generated from the spacing scale defined in `$hu-spacing-scale`.

```scss
$hu-spacing-scale: (
  0: 0,
  100: hu-rem(2),
  200: hu-rem(4),
  300: hu-rem(8),
  400: hu-rem(16),
  500: hu-rem(24),
  600: hu-rem(32),
  700: hu-rem(48),
  800: hu-rem(64),
  auto: auto,
);
```

You can easily amend or override any of these values to suit your project.

### Borders: `$hu-border-modules`, `$hu-border-sides` and `$hu-border-types`

By default, `.border-color`, `.border-style` and `.border-width` classes use 2 or 3 of the global border variables to control which modules, sides and colors they’re output at.

```scss
$hu-border-modules: (base);

$hu-border-sides: (
  border: border,
  border-bottom: border-bottom,
  border-left: border-left,
  border-right: border-right,
  border-top: border-top,
  border-horizontal: (border-left, border-right),
  border-vertical: (border-bottom, border-top),
);

$hu-border-types: $hu-colors;
```

In conjunction with variables specific to each class name, classes like the following are generated:

```css
.border-color:neutral-0
.border-vertical-color:blue-600
.border-bottom-style:none
.border-horizontal-width:200
```

### Controlling focus: `$hu-focus-parent` and `$hu-focus-pseudo`

By default, the `focus`, `group-focus`, `hocus` and `group-hocus` modules generate classes which use a `:focus` pseudo-class. This can be customized, should you wish to use `:focus-visible` or even in conjunction with a polyfill.

```scss
$hu-focus-pseudo: ":focus-visible";

/* ->
.&:focus--[class-name]:focus-visible,
.&:hocus--[class-name]:focus-visible {
  // declarations
}

.group:focus-visible group:focus__[class-name],
.group:focus-visible group:hocus__[class-name] {
  // declarations
}
*/
```

or

```scss
$hu-focus-parent: ".js-focus-visible";
$hu-focus-pseudo: ":focus:not(.focus-visible)";

/* ->
.js-focus-visible .&:focus--[class-name]:focus:not(.focus-visible),
.js-focus-visible .&:hocus--[class-name]:focus:not(.focus-visible) {
  // declarations
}

.js-focus-visible .group:focus:not(.focus-visible) group:focus__[class-name],
.js-focus-visible .group:focus:not(.focus-visible) group:hocus__[class-name] {
  // declarations
}
*/
```

### Themes: `$hu-themes`

As well as the standard `$hu-colors`, `background-color`, `border-color` and `color` classes can also be generated for theming your application based on the key/vaue pairs in this map.

By default, no themes are provided, but making your own is easy:

```scss
$hu-themes: (
  broncos: (
    primary: #6c1d45,
    secondary: #9e2b64,
    highlight: #f8cc0d,
  ),
  knights: (
    primary: #003b73,
    secondary: #1d54a6,
    highlight: #e82c2a,
  ),
  sharks: (
    primary: #1f7eb2,
    secondary: #27a3e6,
    highlight: #95d1f2,
  ),
);
```

This would allow you to theme your entire application simply by changing a single, parent level `theme:[theme-name]` class by utilizing all the generated classes, like:

```css
.theme:broncos .theme__background-color:primary {
  background-color: #6c1d45;
}

.theme:knights .theme__color:highlight {
  color: #e82c2a;
}

.theme:sharks .theme__border-color:secondary {
  border-color: #27a3e6;
}
```

### Namespace: `$hu-namespace`

As mentioned earlier, Hucssley provides you the opportunity to namespace the class names generated, to help ensure there’s no conflict or pollution with other possible frameworks.

```scss
$hu-namespace: `hu-`;

/* ->
.hu-align-content:center {}
…
.@mq-480--hu-flex-direction:column {}
…
.group__is-open--hu-display:flex {}
```

### Use important: `$hu-use-important`

Determines whether all CSS declarations (including those in the [CSS reset](#reset)) are suffixed with the `!important` rule. Default is `false`.

```scss
$hu-use-important: true;

/* ->
.align-content:baseline {
  align-content: baseline !important;
}

…

.align-items:auto {
  align-items: auto !important;
}

…
*/
```

### Debug: `$hu-debug`

With Hucssley generating every class for you, you may encounter scenarios where you need to debug the output when using [webpack’s style-loader](https://webpack.js.org/loaders/style-loader) which outputs the CSS within a `<style>` tag in the `<head>`.

By setting `$hu-debug: true;` before `@import "path_to_node_modules/hucssley/src/styles";` all of the CSS will be printed to the screen, above your UI for you to review and debug.

## Classes

Every class in Hucssley can be completely customized to individually change the properties, values and modules used.

**For details of all the classes provided by default and their configuration, please read [Hucssley classes](/hucssley-classes.md).**