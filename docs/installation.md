---
sidebar_position: 1
description: How to install Yazi on various operating systems.
---

# Installation

Prerequisites:

- nerd-fonts ([_optional_](./faq.md#i-dont-like-nerdfonts))
- ffmpegthumbnailer (_optional_, for video thumbnails)
- unar (_optional_, for archive preview)
- jq (_optional_, for JSON preview)
- poppler (_optional_, for PDF preview)
- fd (_optional_, for file searching)
- rg (_optional_, for file content searching)
- fzf (_optional_, for quick file subtree navigation)
- zoxide (_optional_, for historical directories navigation)

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
brew install yazi ffmpegthumbnailer unar jq poppler fd ripgrep fzf zoxide
brew tap homebrew/cask-fonts && brew install --cask font-symbols-only-nerd-font
```

If you prefer to use the most recent code, use `--HEAD` flag:

```bash
brew install yazi --HEAD
```

Or you can install Yazi via cargo:

```bash
cargo install --locked --git https://github.com/sxyazi/yazi.git
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

## Cargo

```bash
cargo install --locked yazi-fm
```

## Build from source

Install the latest stable Rust toolchain:

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
