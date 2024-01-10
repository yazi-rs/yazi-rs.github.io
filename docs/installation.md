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

If you want to use the latest git version, you can install it from [AUR](https://aur.archlinux.org/packages/yazi-git/) or [Arch Linux CN](https://github.com/archlinuxcn/repo/):

```bash
paru -S yazi-git ffmpegthumbnailer unarchiver jq poppler fd ripgrep fzf zoxide
```

## macOS

Install Yazi and its dependencies with Homebrew:

```bash
brew update
brew install yazi ffmpegthumbnailer unar jq poppler fd ripgrep fzf zoxide
brew tap homebrew/cask-fonts && brew install --cask font-symbols-only-nerd-font
```

If you prefer to use the most recent code, use `--HEAD` flag:

```bash
brew install yazi --HEAD
```

## Nix

The [Nix package of Yazi](https://search.nixos.org/packages?channel=unstable&show=yazi) is available. Nix users can install Yazi via:

```bash
# On NixOS:
nix-env -iA nixos.yazi

# On Non NixOS:
nix-env -iA nixpkgs.yazi
```

Or add the following to your configuration:

```nix
# configuration.nix
environment.systemPackages = with pkgs; [
	yazi
];
```

You can also manage Yazi's configuration using the
[home-manager](https://nix-community.github.io/home-manager/options.html#opt-programs.yazi.enable).

## NetBSD

```bash
pkgin install yazi
```

## Windows

See [Windows Installation Guide](https://github.com/sxyazi/yazi/wiki/Windows-Installation-Guide).

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
