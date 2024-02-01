---
sidebar_position: 1
description: How to install Yazi on various operating systems.
---

# Installation

To use Yazi, you must have the following prerequisites installed:

- [`file`](https://github.com/file/file) (for file type detection)

Yazi can be _optionally_ extended with other command line tools to enable additional features.

- [nerd-fonts](https://www.nerdfonts.com/) ([_recommended_](./faq.md#i-dont-like-nerdfonts))
- [`ffmpegthumbnailer`](https://github.com/dirkvdb/ffmpegthumbnailer) (for video thumbnails)
- [`unar`](https://theunarchiver.com/command-line) (for archive preview)
- [`jq`](https://jqlang.github.io/jq/) (for JSON preview)
- [`poppler`](https://poppler.freedesktop.org/) (for PDF preview)
- [`fd`](https://github.com/sharkdp/fd) (for file searching)
- [`rg`](https://github.com/BurntSushi/ripgrep) (for file content searching)
- [`fzf`](https://github.com/junegunn/fzf) (for quick file subtree navigation)
- [`zoxide`](https://github.com/ajeetdsouza/zoxide) (for historical directories navigation)

## Packaging status

[![Packaging status](https://repology.org/badge/vertical-allrepos/yazi.svg)](https://repology.org/project/yazi/versions)

## Arch Linux

:::note
We recommend using `yazi-git` to install the latest main branch from AUR at the moment, since the official package of `yazi` is quite outdated.
:::

```sh
sudo pacman -S yazi ffmpegthumbnailer unarchiver jq poppler fd ripgrep fzf zoxide
```

If you want to use the latest Git version, you can install it from [AUR](https://aur.archlinux.org/packages/yazi-git/) or [Arch Linux CN](https://github.com/archlinuxcn/repo/):

```sh
paru -S yazi-git ffmpegthumbnailer unarchiver jq poppler fd ripgrep fzf zoxide
```

## macOS

First, make sure that Homebrew is fully up-to-date with `brew update`.

Then you can install Yazi (and the optional dependencies):

```sh
brew install yazi ffmpegthumbnailer unar jq poppler fd ripgrep fzf zoxide
brew tap homebrew/cask-fonts && brew install --cask font-symbols-only-nerd-font
```

If you prefer to use the most recent code, use the `--HEAD` flag when installing Yazi.

```sh
brew install yazi --HEAD
```

## Nix

A [Nix package](https://search.nixos.org/packages?channel=unstable&show=yazi) for Yazi is available.

```sh
# NixOS:
nix-env -iA nixos.yazi

# Not NixOS:
nix-env -iA nixpkgs.yazi
```

Or add the following to your configuration:

```nix
# configuration.nix
environment.systemPackages = with pkgs; [
	yazi
];
```

You can also manage Yazi's configuration using [home-manager](https://nix-community.github.io/home-manager/options.html#opt-programs.yazi.enable).

## NetBSD

```sh
pkgin install yazi
```

## Windows

Windows has been supported since Yazi v0.1.4, but it's still in the early stage, so please file an issue if you encounter any bugs.

### Requirements

Yazi relies on `file(1)` to detect the `mime-type` of the file, and the easiest and most reliable way to get it on Windows is to install Git for Windows and use the `file(1)` that comes with it.

1. Install Git for Windows by running [the official installer](https://git-scm.com/download/win), or through your package manager of choice.
2. To allow Yazi to find `file(1)`, add `C:\Git_Installed_Directory\usr\bin\` to your `%PATH%` environment variable, which differs depending on how you installed Git:
   - If you installed Git with the installer, it would be `C:\Program Files\Git\usr\bin`.
   - If you installed Git with scoop, it would be `C:\Users\USERNAME\scoop\apps\git\current\usr\bin`.
3. Restart your terminal.

To check if you've done this properly, enter `file -v`, you should see output similar to the following:

```powershell
C:\Users\yazi> file -v
file-5.45
```

This is currently the only method we recommend. **We do NOT recommend `scoop install file`**, since Scoop's `file` cannot handle Unicode file names (such as `pexels-oliver-sjöström-1433052.jpg`) properly.

### Installation

You can download the latest official binaries from [GitHub Releases](https://github.com/sxyazi/yazi/releases), or install Yazi with [Scoop](https://scoop.sh/):

```sh
scoop install yazi
# Install the optional dependencies (recommended):
scoop install unar jq poppler fd ripgrep fzf zoxide
```

Yazi on Scoop is maintained by community contributors, and may not always have the latest version available. You may need to check our [GitHub Releases](https://github.com/sxyazi/yazi/releases) page for the latest version.

### Image previews

Currently, only the following two terminals support displaying images on Windows:

- WezTerm
- Mintty (Git Bash, which comes with Git for Windows)

and [Yazi has adapted them](https://github.com/sxyazi/yazi#image-preview) to work right out of the box!

## AOSC OS

```sh
sudo oma install yazi
```

## Official binaries

You can download the latest official binaries from [GitHub Releases](https://github.com/sxyazi/yazi/releases).

## Cargo

Setup the latest stable Rust toolchain:

```sh
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

Now you can install `yazi-fm` from [crates.io](https://crates.io/crates/yazi-fm):

```sh
cargo install --locked yazi-fm
```

Or install the latest git version:

```sh
cargo install --locked --git https://github.com/sxyazi/yazi.git
```

If it fails to build, please check if `make` and `gcc` is installed on your system.

## Build from source

Setup the latest stable Rust toolchain:

```sh
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

Clone the repository and build Yazi:

```sh
git clone https://github.com/sxyazi/yazi.git
cd yazi
cargo build --release
```

Then, you can run:

```sh
./target/release/yazi
```

If it fails to build, please check if `make` and `gcc` is installed on your system.
