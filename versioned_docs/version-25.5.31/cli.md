---
sidebar_position: 7
description: Command-line interface for Yazi
---

# CLI

Yazi provides a command-line tool called `ya`, which is used to assist with tasks like plugin management, flavor management, DDS message publishing and subscribing, among other features.

It is an essential component of Yazi. Most distributions include it by default when installing Yazi, but if yours doesn't, you'll need to [build it from source](/docs/installation#source). Just be sure that the versions of both `ya` and `yazi` are exactly the same.

## Package Manager {#pm}

You can manage your plugins and flavors using the `ya pkg` subcommand. For example, to install the plugin from https://github.com/owner/my-plugin.yazi, run:

```sh
ya pkg add owner/my-plugin
```

`ya pkg` also supports installing a subdirectory from a monorepo as a package. For example, to install the package from https://github.com/yazi-rs/plugins/tree/main/git.yazi, run:

```sh
ya pkg add yazi-rs/plugins:git
```

and it will automatically clone them from GitHub, copy them to your plugins directory, and update the `package.toml` to lock their versions:

```toml
# ~/.config/yazi/package.toml
[[plugin.deps]]
use  = "owner/my-plugin"
rev  = "0573024"
hash = "d81b64a39432fcd6224cd75d296e7510"

[[plugin.deps]]
use  = "yazi-rs/plugins:git"
rev  = "9a1129c"
hash = "a8e15d3c21c02a5af41d46ed04778a02"
```

To delete a plugin:

```sh
ya pkg delete yazi-rs/plugins:git
```

To list all the plugins managed by `ya pkg`:

```sh
ya pkg list
```

To install all the plugins with locked versions from `package.toml` on a new system:

```sh
ya pkg install
```

To upgrade all the plugins to the latest version:

```sh
ya pkg upgrade
```

If you want to pin a plugin to a specific version so that it doesn't get upgraded when running `ya pkg upgrade`, add an `=` qualifier before the hash in `rev`:

```diff
[[plugin.deps]]
use = "owner/my-plugin"
- rev = "9a1129c"
+ rev = "=9a1129c"
```

For `add` and `delete`, they can accept multiple arguments, which means you can operate on multiple packages at once:

```sh
ya pkg add owner/my-plugin yazi-rs/plugins:git
ya pkg delete owner/my-plugin yazi-rs/plugins:git
```

## Data Distribution Service {#dds}

You can use `ya` as a user interface to interact with the data distribution service.

See the [DDS section](/docs/dds) for more information.
