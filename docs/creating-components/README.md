---
sidebar: auto
---

# Creating components

Since Hucssley outputs raw HTML class names, it’s incredibly easy to integrate with any front-end “view” framework, to create custom components with small and simple styling APIs.

By using raw class name strings, you are also able to annotate browser-specifc fixes alongside them in the HTML, which helps with understanding why “unnecessary” properties are there.

Let’s create a button in Vue:

## Component definition

We create a basic component with 3 props that change the appearance, and create a styles object that simply has strings of Hucssley class names that will be applied by default, and in the different forms.

```js
export default {
  name: 'ButtonHu',
  props: {
    shape: {
      default: 'square',
      type: String,
    },
    size: {
      default: 'medium',
      type: String,
    },
    type: {
      default: 'primary',
      type: String,
    },
  },
  data() {
    return {
      isSelected: false,
    };
  },
  methods: {
    toggleSelected() {
      this.isSelected = !this.isSelected;
    },
  },
  created() {
    this.styles = {
      base: `
        font-weight:700
        min-width:0 // fixes IE
        transition-duration:100
        transition-easing:ease
        transition-property:all
        &:hocus--scale:105
        is-selected--background-color:neutral-700
        is-selected--color:neutral-0
      `,
      type: {
        primary: `
          background-color:blue-900
          color:neutral-0
          hocus--background-color:blue-600
        `,
        secondary: `
          background-color:blue-200
          hocus--background-color:blue-400
        `,
      },
      shape: {
        rounded: 'border-radius:1000',
        square: 'border-radius:300',
      },
      size: {
        medium: `
          padding-horizontal:400
          padding-vertical:300
        `,
        large: `
          font-size:600
          padding-horizontal:500
          padding-vertical:400
        `,
      },
    };
  },
};
```

Which means our `template` is as simple as creating an array of the various `styles` properties, which are determined by the props passed in.

```html
<template>
  <button
    v-bind:class="[
      styles.base,
      styles.shape[shape],
      styles.size[size],
      styles.type[type],
      isSelected && 'is-selected',
    ]"
    v-on:click="toggleSelected"
  >
    <slot></slot>
  </button>
</template>
```

The `template` itself is ridiculously simple. You can tell at a glance exactly which class names will be added under any UI condition, and, in the generated HTML you’ll even be able to see an IE-specific hack!

Unlike alternative frameworks, Hucssley encourages a utility-only, not utility-first mentality, so it’s highly recommended that all components be created with a template partial or JavaScript component to keep your code DRY and reduce the opportunity for copy-paste errors.

Components with meaningful, semantic props that map to UI variations also reduce the learning curve and implementation for developers less experienced with CSS.

## Using the component

The following shows how we can quickly use and customize a component’s appearance by setting the appropriate props, **and** that we can customize the component on a per-instance basis by merging the passed in `class` attribute with the root component `class` (which happens automagically in Vue).

```html
<button-hu
  class="margin:400"
>
  Primary
</button-hu>

<button-hu
  class="margin:400"
  type="secondary"
>
  Secondary
</button-hu>

<button-hu
  class="margin:400"
  shape="rounded"
>
  Primary Rounded
</button-hu>

<button-hu
  class="margin:400"
  shape="rounded"
  type="secondary"
>
  Secondary Rounded
</button-hu>

<button-hu
  class="margin:400"
  size="large"
  type="primary"
>
  Primary Large
</button-hu>

<button-hu
  class="margin:400"
  size="large"
  type="secondary"
>
  Secondary Large
</button-hu>

<button-hu
  class="margin:400"
  shape="rounded"
  size="large"
  type="primary"
>
  Primary Large Rounded
</button-hu>

<button-hu
  class="margin:400"
  shape="rounded"
  size="large"
  type="secondary"
>
  Secondary Large Rounded
</button-hu>
```

**A working demo can be seen here: https://codepen.io/stowball/full/NVdbyZ**