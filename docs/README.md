---
sidebar: auto
---

# Hucssley

Hucssley is very different to traditional frameworks like Bootstrap or Semantic UI, as it contains zero pre-built UI components, instead providing you with the atomic building blocks necessary for **you** to create any UI component.

It honours the groundwork laid by earlier utility class libraries such as [Tachyons](https://tachyons.io) and [Tailwind](https://tailwindcss.com), while hoping to address some of their deficiencies.

To that end, Hucssley has a few goals:

1. To be incredibly easy to learn and use, by providing a system of atomic classes that mostly map 1:1 with existing CSS properties.
2. To allow anyone of any skill to rapidly build for the web without unknowingly causing CSS bloat or fighting against some of CSS’s core, but sometimes difficult to understand principals.
3. To provide the tools required to build UI for any breakpoint, user interaction or UI state.
4. To be completely platform agnostic and portable between front-end stacks, with Sass being the only dependency.
5. To be highly flexible to your needs, with the ability to easily customize existing classes and create new ones.

To understand the reasoning behind its creation, please read [Rethinking CSS](/rethinking-css.md).

## What’s in the box?

Currently, Hucssley provides utility classes for over 110 CSS properties, of which multiple, sensible default values are generated. Each utility is also created for various “modules”, whether that’s at certain media queries, UI states, user interactions, for print or more.

Each utility is completely customizable; they can be partially renamed, have values changed, have their modules altered or be omitted entirely.

By default, Hucssley does not output classes for things that don’t map explicitly to specific property types (such as `box-shadow`, background gradients and `transform`), but it does provide placeholder variables for these to make tailored, [custom classes simple to create](#creating-custom-classes).

Hucssley also provides utility classes for truncating text and making elements “visually hidden” for accessibility purposes.

For a complete list of the class names provided and how they can be customized, read [Hucssley classes](/hucssley-classes.md).

Hucssley also comes with:

* A sensible, optional CSS reset to make building UI easier and more consistent.
* Functions for converting `px` values to `em` and `rem` for improved accessibilty.
* Functions to incrementally darken (`shade`) or lighten (`tint`) colors.
* The ability to theme elements based off a parent selector.
* The ability to create classes scoped to custom parent selectors.
* The ability to create classes that map to pseudo-classes and pseudo-selectors.

## A working example

The following example demonstrates how you can use Hucssley out-of-the-box to easily create a responsive, accessible, interactive component.

```html
<div class="
  background-color:blue-0
  padding:500
">
  <div class="
    align-items:center
    background-color:neutral-0
    border-color:neutral-200
    border-radius:500
    border-style:solid
    border-width:100
    display:flex
    flex-direction:column
    padding:500
    text-align:center
    @mq-768--flex-direction:row
    @mq-768--text-align:left
  ">
   <img
      alt=""
      class="
        background-color:blue-600
        border-color:neutral-100
        border-radius:1000
        border-style:solid
        border-width:200
        margin-bottom:400
        width:50
        @mq-600--width:30
        @mq-768--margin-bottom:0
        @mq-768--margin-right:500
        @mq-768--width:20
      "
      src="https://hireup.cdn.prismic.io/hireup/89e15301c28e6396927d85e38e9c5d5833ebab09_kyle_357-bonnie.png"
    />
    <div>
      <p class="
        font-size:600
        font-weight:700
        line-height:200
        margin-bottom:400
      ">
        Disability support workers who love what you love
      </p>
      <a
        class="
          background-color:blue-900
          border-color:neutral-700
          color:neutral-0
          display:inline-block
          padding-horizontal:400
          padding-vertical:300
          transition-duration:200
          transition-easing:ease
          transition-property:all
          &:hocus--background-color:blue-600
          &:hocus--scale:105
          @mq-768--padding-horizontal:500
          @mq-768--padding-vertical:400
        "
        href="#"
      >
        Find your connection
      </a>
    </div>
  </div>
</div>
```

**You can see a live version here: https://codepen.io/stowball/full/WBoxOj**

## Why Hucssley?

With [so many CSS utility libraries](https://css-tricks.com/need-css-utility-library/) already in existence, and with Tailwind being an extremely popular, close alternative, why does Hucssley exist and why might you want to use it?

Well, we wanted to [solve a lot of the problems](/rethinking-css.md) developers have with “normal” CSS and the ones Adam Silver poses in [The problem with atomic CSS](https://adamsilver.io/articles/the-problem-with-atomic-css/).

Firstly, most utility libraries are hard to read, and more importantly hard to learn. They often use an obtuse, inconsistent syntax which has you reaching for the docs more often than you should. With Hucssley, the focus has been: “if you know CSS properties, you know Hucssley”.

Also, by using Sass under the hood, it supports an extremely deep pool of developers who already know the language and its wealth of features, and has great documentation and resources to boot.

With other libraries, while the initial implementation period is very promising, it’s when you hit the harder, more uncommon issues that you start to struggle. Out-of-the-box, Hucssley wants to provide you with all of the tools to build any UI regardless of the condition. This means we support every type of media query, theming, pseudo selectors, user interaction states (`:hover`, `:focus-visible`), UI states (`is-expanded`, `is-loading`), and any kind of parent selector (for use with things like browser detection libraries, or element query polyfills).

Lastly, Hucssley tries to be extremely flexible and easily configurable. While it provides many more classes and features than other libraries OOTB, if it doesn’t provide something you need, it’s hopefully very easy to build what you need in a consistent, Hucssley manner.

So with you now intrigued, read the rest of the docs, have a play, and fall in love with building UI…