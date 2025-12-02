---
sidebar_position: 4
description: Learn how to register virtual file systems
---

import useBaseUrl from '@docusaurus/useBaseUrl';

# vfs.toml

:::info
If you want to fine-tune the default settings, the first step is to [create your own configuration file](/docs/configuration/overview).
:::

You can register any supported virtual file service in your `vfs.toml`.

Once registered, you can access them by the combination of provider type and name, for example, to start Yazi with the SFTP provider `my-server` as the working directory:

```sh
yazi sftp://my-server
```

You can also reference them from Yazi's [built-in commands](/docs/configuration/keymap), for example the [`cd`](/docs/configuration/keymap#mgr.cd) command:

```toml
[[mgr.prepend_keymap]]
on   = [ "g", "s" ]
run  = "cd sftp://my-server"
desc = "Go to my-server"
```

Or the [`reveal`](/docs/configuration/keymap#mgr.reveal) command:

```toml
[[mgr.prepend_keymap]]
on   = [ "g", "s" ]
run  = "reveal sftp://my-server//root/dog.jpg"
desc = "Reveal dog.jpg on my-server"
```

## SFTP

Yazi has an SFTP VFS provider built-in, which means you can manage files on remote servers over SSH.

To register an SFTP VFS named `my-server`, add the following to your `vfs.toml`:

```toml
[providers.my-server]
type = "sftp"
host = "1.2.3.4"
user = "root"
port = 22
```

This configures Yazi to log in to `1.2.3.4` on port `22` as the `root` user and authenticate via your SSH agent by connecting to the socket specified in the `$SSH_AUTH_SOCK` environment variable.

On Unix-like systems the SSH agent is provided by `ssh-agent`. You can list the keys the agent has loaded with `ssh-add -l`, or add keys with `ssh-add`, e.g. `ssh-add ~/.ssh/id_rsa`.

If you don't want to use an agent and prefer to specify a private key file, add the `key_file` and `key_passphrase` options, for example:

```toml
[providers.my-server]
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
[providers.my-server]
type     = "sftp"
host     = "1.2.3.4"
user     = "root"
port     = 22
password = "my_password"
```

If you want to use an agent socket other than `$SSH_AUTH_SOCK`, for example, if you manage SSH keys with 1Password, specify it with `identity_agent`:

```toml
[providers.my-server]
type           = "sftp"
host           = "1.2.3.4"
user           = "root"
port           = 22
identity_agent = "~/Library/Group Containers/2BUA8C4S2C.com.1password/t/agent.sock"
```
