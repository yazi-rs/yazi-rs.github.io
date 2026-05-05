---
sidebar_position: 4
description: Learn how to register virtual file systems
---

import useBaseUrl from '@docusaurus/useBaseUrl';

# vfs.toml

:::info
If you want to fine-tune the default settings, the first step is to [create your own configuration file](/docs/configuration/overview).
:::

You can register any supported VFS provider in your `vfs.toml` as a service, for example:

```toml
[services.my-server]
type = "sftp"
host = "1.2.3.4"
user = "root"
port = 22
```

The service here is `my-server`, you can use any other name you like in [kebab-case](https://developer.mozilla.org/en-US/docs/Glossary/Kebab_case), up to 20 characters.

Different names are considered as different virtual filesystems, even if they are configured with the same provider and exactly the same parameters.

## Usage

Once registered, you can access them by the combination of provider type and name, for example, to start Yazi with the SFTP service `my-server` as the working directory:

```sh
yazi sftp://my-server
```

You can also reference them from Yazi's [built-in actions](/docs/configuration/keymap) in `keymap.toml`, for example the [`cd`](/docs/configuration/keymap#mgr.cd) action:

```toml
[[mgr.prepend_keymap]]
on   = [ "g", "s" ]
run  = "cd sftp://my-server"
desc = "Go to my-server"
```

Or the [`reveal`](/docs/configuration/keymap#mgr.reveal) action:

```toml
[[mgr.prepend_keymap]]
on   = [ "g", "s" ]
run  = "reveal sftp://my-server//root/dog.jpg"
desc = "Reveal dog.jpg on my-server"
```

## SFTP Provider

Yazi has an SFTP VFS provider built-in, which means you can manage files on remote servers over SSH.

To register an SFTP VFS named `my-server`, add the following to your `vfs.toml`:

```toml
[services.my-server]
type = "sftp"
host = "1.2.3.4"
user = "root"
port = 22
```

This configures Yazi to log in to `1.2.3.4` on port `22` as the `root` user and authenticate via your SSH agent by connecting to the socket specified in the `$SSH_AUTH_SOCK` environment variable.

On Unix-like systems the SSH agent is provided by `ssh-agent`. You can list the keys the agent has loaded with `ssh-add -l`, or add keys with `ssh-add`, e.g. `ssh-add ~/.ssh/id_rsa`.

If you don't want to use an agent and prefer to specify a private key file, add the `key_file` and `key_passphrase` options, for example:

```toml
[services.my-server]
type     = "sftp"
host     = "1.2.3.4"
user     = "root"
port     = 22
key_file = "~/.ssh/id_rsa"
# If your private key is protected by a passphrase:
# key_passphrase = "my_passphrase"
```

You can also authenticate with a password using the `password` option:

```toml
[services.my-server]
type     = "sftp"
host     = "1.2.3.4"
user     = "root"
port     = 22
password = "my_password"
```

If you want to use an agent socket other than `$SSH_AUTH_SOCK`, for example, if you [manage SSH keys with 1Password](https://developer.1password.com/docs/ssh/manage-keys/), specify it with `identity_agent`:

```toml
[services.my-server]
type           = "sftp"
host           = "1.2.3.4"
user           = "root"
port           = 22
identity_agent = "~/Library/Group Containers/2BUA8C4S2C.com.1password/t/agent.sock"
```
