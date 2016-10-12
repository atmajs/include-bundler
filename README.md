# JavaScript Application Bundler

> Supports: `CommonJS`, [`MaskJS`](https://github.com/atmajs/maskjs), [`IncludeJS`](https://github.com/atmajs/includejs), `AMD`

#### Why not ✨✨✨✨?

With this module we try to follow these ideas:

1. **No dependency**. The dev process and your app is not depended on bundler. So you would need to run this only for deployments. 

2. **No configuration _(or few lines in packages.json)_**. You don't have hundred lines of configuration. 

3. **Single responsibility**. We combine your modules in one or multple `JS`, `CSS` and `html` bundles.

4. **Decoupled pre- and post-processing**. Bundler loads your files with [`atma-io`](https://github.com/atmajs/atma-io), which supports middlewares for file reads and writes. For example, this bundler handles only plain javascript modules, but you can choose any middleware to load files, for instance TypeScript files, which will be compiled on the fly. Same is also for css and templates.

----

# `1` CommonJS

Build your CommonJS libraries and apps into one single module file.

# `2` Web: `MaskJS`, `IncludeJS`, `AMD`

The Application Bundler targets module systems, that do not require incremental builds. Have it simple: develop your web applications without any bundler, and then, only for production, build you app. No more huge `task` and `config` files.

# `3` Preporcessors: `babel`, `less`, `scss`, `yml`

All preprocessors are decoupled from the Bundler. We use [`atma-io`](https://github.com/atmajs/atma-io) to load and write dependencies. That means, just include any file middleware as a plugin for `atma-io`.

----

:copyright: MIT
