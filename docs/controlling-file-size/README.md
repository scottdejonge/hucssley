---
sidebar: auto
---

# Controlling file size

While Hucssley creates almost every possible class you’d ever want to make building UI simple, this comes at a file size cost with the OOTB CSS coming in at a massive 1.3 MB uncompressed. Of course, the nature of Hucssley lends itself very well to gzipping, which brings the OOTB CSS down to 93 KB, which ironically, is still a lot smaller than lots of other “production” CSS in the wild.

But, Hucssley is infinitely customizable, so you can set the variables of modules you’ll never use to `()` so they won’t output, and of course, limiting the amount of colors, media queries, and spacing scales will also help.

However, we can do better… and we can do it automatically. By utilizing [Purgecss](https://purgecss.com) and the following `extractor`, you’ll be able to reduce your CSS output to only the classes that are used in your views:

```js
extractor: class {
  static extract(content) {
    return content.match(/[A-Za-z0-9-_&:@<>\/]+/g) || [];
  }
}
```

If you wish to change which characters are escaped, you can customize the [global `$hu-escape-class-name-types` variable](/src/variables/global/_hu-escape-class-name-types.scss).