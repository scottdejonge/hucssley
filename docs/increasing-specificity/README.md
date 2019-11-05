---
sidebar: auto
---

# Increasing specificity

While all of Hucssley’s classes have an intentionally low specificity count, this could present issues if you’re integrating it in to an existing project.

Luckily, Hucssley provides two methods to increase the specificity:

## Forcing `!important`

Option one is to set `$hu-use-important: true;` anywhere before you `@import` the reset and class styles:

```scss
$hu-use-important: true;

@import "path_to_node_modules/hucssley/src/styles";
// @import "custom/classes/index";
```

As [described earlier](#use-important-hu-use-important), this will add the `!important` rule to every declaration.

## Quarantining with a descendent selector

Since Hucssley is written in Sass, you can easily wrap your imports in a new selector to convert every class to use a descendent selector.

```scss
.hucssley {
  @import "path_to_node_modules/hucssley/src/styles";
  // @import "custom/classes/index";
}
```

which will produce:

```css
.hucssley .align-content:baseline {
  align-content: baseline;
}

.hucssley .align-content:center {
  align-content: center;
}

…
```

You could then add the `hucssley` class to a direct ancestor of your newly integrated component, or add it globally to the `<html>` element (although this could have unexpected side-effects if using the reset).

If this still doesn’t produce a high enough specificity bump, you can also use the `hu-bump-specificity($increase-to-specificity)` mixin to arbitrarily increase it further:

```scss
.hucssley {
  @include hu-bump-specificity(1) {
    @import "path_to_node_modules/hucssley/src/styles";
    // @import "custom/classes/index";
  }
}
```

which produces:

```css
.hucssley.hucssley .align-content:baseline {
  align-content: baseline;
}

.hucssley.hucssley .align-content:center {
  align-content: center;
}

…
```