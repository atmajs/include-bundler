# Web Application Bundler

_Work in pogress_

> Support: `CommonJS`, [`MaskJS`](https://github.com/atmajs/maskjs), [`IncludeJS`](https://github.com/atmajs/includejs), `AMD`


# `1` CommonJS

Build your CommonJS libraries and apps into one single module file.

# `2` Web: `MaskJS`, `IncludeJS`, `AMD`

The Application Bundler targets module systems, that do not require incremental builds. Have it simple: develop your web applications without any bundler, and then, only for production, build you app. No more huge `task` and `config` files.

# `3` Preporcessors: `babel`, `less`, `scss`, `yml`

All preprocessors are decoupled from the Bundler. We use [`atma-io`](https://github.com/atmajs/atma-io) to load and write dependencies. That means, just include any file middleware as a plugin for `atma-io`.

----

:copyright: MIT
