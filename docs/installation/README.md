---
sidebar: auto
---

# Installation

While Hucssley is still in early development, it has not been published to npm. However, you can still add it as a `dependency` of your project with:

```sh
npm install github:stowball/hucssley#master
```

If you want to use Hucssley as it comes, then it’s as simple as:

```scss
@import "path_to_node_modules/hucssley/src/index";
```

However, if you want to customize Hucssley, we recommend taking this approach:

```scss
@import "path_to_node_modules/hucssley/src/helpers";

@import "path_to_node_modules/hucssley/src/variables/global/index";
// @import "custom/variables/global/index";

@import "path_to_node_modules/hucssley/src/variables/classes/index";
// @import "custom/variables/classes/index";
// set class overrides before if you don’t need access to the defaults & want changes to flow through referenced vars

@import "path_to_node_modules/hucssley/src/variables/reset/index";
// @import "custom/variables/reset/index";

@import "path_to_node_modules/hucssley/src/styles";
// @import "custom/classes/index";
```


*Note: If you are using webpack, you can leverage [its advanced mechanism to resolve files](https://github.com/webpack-contrib/sass-loader#imports) by replacing the path to `node_modules` with a `~`, like so:*

```scss
@import "~hucssley/src/index";
```