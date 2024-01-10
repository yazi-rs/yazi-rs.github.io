---
sidebar_position: 1
description: How to install Yazi on various operating systems.
---

# Installation

To use Yazi, you must have the following prerequisites installed:

- file (for file type detection)

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

## Arch Linux

```bash
sudo pacman -S yazi ffmpegthumbnailer unarchiver jq poppler fd ripgrep fzf zoxide
```

If you want to use the latest Git version, you can install it from [AUR](https://aur.archlinux.org/packages/yazi-git/) or [Arch Linux CN](https://github.com/archlinuxcn/repo/):

```bash
paru -S yazi-git ffmpegthumbnailer unarchiver jq poppler fd ripgrep fzf zoxide
```

## macOS / Homebrew

First, make sure that Homebrew is fully up-to-date with `brew update`.

Then you can install Yazi by itself:

```bash
brew install yazi
```

Or along with the optional dependencies:

```bash
brew install yazi ffmpegthumbnailer unar jq poppler fd ripgrep fzf zoxide
brew tap homebrew/cask-fonts && brew install --cask font-symbols-only-nerd-font
```

If you prefer to use the most recent code, use the `--HEAD` flag when installing Yazi.

```bash
brew install yazi --HEAD
```

## Nix

A [Nix package of Yazi](https://search.nixos.org/packages?channel=unstable&show=yazi) is available. Nix users can install Yazi via:

```bash
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

```bash
pkgin install yazi
```

## Windows

Windows has been supported since Yazi v0.1.4, but it's still in the early stage, so please file an issue if you encounter any bugs.

### Requirements

Yazi relies on `file(1)` to detect the `mime-type` of the file, and the easiest and most reliable way to get it on Windows is to install Git for Windows and use the `file(1)` that comes with it.

1. Install Git for Windows by running [the official installer](https://git-scm.com/download/win), or through your package manager of choice.
2. To allow Yazi to find `file(1)`, add the Git for Windows `/usr/bin/` directory to the Windows path (not the `bash` path). Git for Windows' `/usr/bin/` directory differs depending on how you installed Git.

- If you installed Git with the installer, add `C:\Program Files\Git\usr\bin` to the Windows path. Again, note that this directory depends on where you installed Git.
- If you installed Git with scoop, add `C:\Users\USERNAME\scoop\apps\git\current\usr\bin` to the Windows path.

To check if you've done this properly, open a new `cmd` or `powershell` instance and enter `file`. You should see output similar to the following:

```
C:\Users\USERNAME>file
Usage: file [-bcCdEhikLlNnprsSvzZ0] [--apple] [--extension] [--mime-encoding]
            [--mime-type] [-e <testname>] [-F <separator>]  [-f <namefile>]
            [-m <magicfiles>] [-P <parameter=value>] [--exclude-quiet]
            <file> ...
       file -C [-m <magicfiles>]
       file [--help]

```

This is currently the only method we recommend. **We do NOT recommend `scoop install file`**, since Scoop's `file` cannot handle Unicode file names properly (e.g. `pexels-oliver-sjöström-1433052.jpg`).

\*\* See https://www.c-sharpcorner.com/article/add-a-directory-to-path-environment-variable-in-windows-10/ for help on adding a directory to the Windows path.

\*\* Note that adding this directory to the Windows path will make other Linux programs (such as `cat`, `ls`, and `vim`) that come from `/usr/bin/` accessible to `cmd` and `powershell`.

### Installation

First, install Scoop: https://scoop.sh/. Then, in a new `powershell` instance, enter:

```sh
scoop install yazi unar jq poppler fd ripgrep fzf zoxide
```

Yazi on Scoop is maintained by community contributors and may not always have the latest version available. You may want to download the latest binary from [Yazi's GitHub Releases](https://github.com/sxyazi/yazi/releases) if that is the case.

### Image Previews

Currently, only WezTerm and Mintty (i.e., Git Bash, which comes with Git for Windows) support images, and [Yazi has adapted them](https://github.com/sxyazi/yazi#image-preview) to work right out of the box! Windows Terminal does not yet support images though, see https://github.com/microsoft/terminal/issues/5746.

## AOSC OS

```bash
sudo oma install yazi
```

## Official binaries

You can download the latest official binaries from [GitHub Releases](https://github.com/sxyazi/yazi/releases).

## Cargo

Setup the latest stable Rust toolchain:

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

Now you can install `yazi-fm` from [crates.io](https://crates.io/crates/yazi-fm):

```bash
cargo install --locked yazi-fm
```

Or install the latest git version:

```bash
cargo install --locked --git https://github.com/sxyazi/yazi.git
```

If it fails to build, please check if `make` and `gcc` is installed on your system.

## Build from source

Setup the latest stable Rust toolchain:

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

Clone the repository and build Yazi:

```bash
git clone https://github.com/sxyazi/yazi.git
cd yazi
cargo build --release
```

Then, you can run:

```bash
./target/release/yazi
```

If it fails to build, please check if `make` and `gcc` is installed on your system.
