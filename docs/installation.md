---
sidebar_position: 1
description: How to install Yazi on various operating systems.
---

# Installation

To use Yazi, you must have the following prerequisites installed:

- [`file`](https://github.com/file/file) (for file type detection)

Yazi can be **optionally** extended with other command line tools to enable additional features.

- [nerd-fonts](https://www.nerdfonts.com/) ([_recommended_](/faq#dont-like-nerd-fonts))
- [`ffmpegthumbnailer`](https://github.com/dirkvdb/ffmpegthumbnailer) (for video thumbnails)
- [`unar`](https://theunarchiver.com/command-line) (for archive preview)
- [`jq`](https://jqlang.github.io/jq/) (for JSON preview)
- [`poppler`](https://poppler.freedesktop.org/) (for PDF preview)
- [`fd`](https://github.com/sharkdp/fd) (for file searching)
- [`rg`](https://github.com/BurntSushi/ripgrep) (for file content searching)
- [`fzf`](https://github.com/junegunn/fzf) (for quick file subtree navigation)
- [`zoxide`](https://github.com/ajeetdsouza/zoxide) (for historical directories navigation)
- [ImageMagick](https://imagemagick.org/) (for SVG, Font, HEIC, and JPEG XL preview)
- [`xclip`](https://github.com/astrand/xclip) / [`wl-clipboard`](https://github.com/bugaevc/wl-clipboard) / [`xsel`](https://github.com/kfish/xsel) (for system clipboard support)

If the functions are not working properly, please try upgrading them to the latest version.

## Packaging status

Most packages on this page are maintained by the community, and they **may not always be the latest**. Please check their versions before installation:

[![Packaging status](https://repology.org/badge/vertical-allrepos/yazi.svg)](https://repology.org/project/yazi/versions)

## Arch Linux

```sh
sudo pacman -S yazi ffmpegthumbnailer unarchiver jq poppler fd ripgrep fzf zoxide imagemagick
```

If you want to use the latest Git version, you can install it from [AUR](https://aur.archlinux.org/packages/yazi-git/) or [Arch Linux CN](https://github.com/archlinuxcn/repo/):

```sh
paru -S yazi-git ffmpegthumbnailer unarchiver jq poppler fd ripgrep fzf zoxide imagemagick
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

You can also manage Yazi's configuration using [home-manager](https://nix-community.github.io/home-manager/options.xhtml#opt-programs.yazi.enable).

## Nix flakes

The upstream repository provides a flake so that Nix users can easily keep up with the bleeding edge. A basic `flake.nix` setup to get you started:

```nix
{
	inputs = {
		nixpkgs.url = "github:NixOS/nixpkgs/nixos-23.11";

		home-manager = {
			url = "github:nix-community/home-manager/release-23.11";
			inputs.nixpkgs.follows = "nixpkgs";
		};

		yazi.url = "github:sxyazi/yazi";
	};

	outputs = { nixpkgs, home-manager, yazi, ... }: {
		# To install Yazi system-wide:
		nixosConfigurations = {
			nixos = nixpkgs.lib.nixosSystem {
				modules = [
					({ pkgs, ... }: {
						environment.systemPackages = [ yazi.packages.${pkgs.system}.default ];
					})
				];
			};
		};

		# To install it for a specific user:
		homeConfigurations = {
			"alice@nixos" = home-manager.lib.homeManagerConfiguration {
				pkgs = nixpkgs.legacyPackages.x86_64-linux;
				modules = [
					({ pkgs, ... }: {
						home.packages = [ yazi.packages.${pkgs.system}.default ];
					})
				];
			};
		};
	};
}
```

If you want to override the package inside nixpkgs with the one from the flake, you can use overlays:

```nix
nixpkgs.overlays = [ yazi.overlays.default ];
```

A module is also available for both NixOS and home-manager:

```nix
programs.yazi = {
	enable = true;
	package = yazi.packages.${pkgs.system}.default; # if you use overlays, you can omit this
};
```

### Cache

Pre-built artifacts are served at https://yazi.cachix.org, so that Nix users don't have to build Yazi on their machine.
You can make use of it by adding the following options to `nix.settings`, either in your NixOS or home-manager configuration:

```nix
extra-substituters = [ "https://yazi.cachix.org" ];
extra-trusted-public-keys = [ "yazi.cachix.org-1:Dcdz63NZKfvUCbDGngQDAZq6kOroIrFoyO064uvLh8k=" ];
```

Note that the cache will only be applied _after_ you rebuild your Nix config. If you want to ensure that the cache gets applied right away, add the options above to your flake's `nixConfig` attribute.

If you're having any problems, refer to this [entry](https://docs.cachix.org/faq#why-is-nix-not-picking-up-on-any-of-the-pre-built-artifacts) from Cachix's FAQ.

## Homebrew

First, make sure that Homebrew is fully up-to-date with `brew update`.

Then you can install Yazi (and the optional dependencies):

```sh
brew install yazi ffmpegthumbnailer unar jq poppler fd ripgrep fzf zoxide imagemagick
brew tap homebrew/cask-fonts && brew install --cask font-symbols-only-nerd-font
```

If you prefer to use the most recent code, use the `--HEAD` flag when installing Yazi.

```sh
brew install yazi --HEAD
```

## MacPorts

```bash
sudo port install yazi ffmpegthumbnailer unar jq poppler fd ripgrep fzf zoxide ImageMagick
```

## NetBSD

```sh
pkgin install yazi
```

## Windows

Windows has been supported since Yazi v0.1.4, but it's still in the early stage, so please file an issue if you encounter any bugs.

### Requirements

Yazi relies on `file(1)` to detect the mime-type of the file, and the easiest and most reliable way to get it on Windows is to install Git for Windows and use the `file.exe` that comes with it.

1. Install Git for Windows by running [the official installer](https://git-scm.com/download/win), or through your package manager of choice.
2. To allow Yazi to find it, add `<Git_Installed_Directory>\usr\bin\file.exe` to your `YAZI_FILE_ONE` environment variable, which differs depending on how you installed Git:
   - If you installed Git with the installer, it would be `C:\Program Files\Git\usr\bin\file.exe`.
   - If you installed Git with Scoop, it would be `C:\Users\<Username>\scoop\apps\git\current\usr\bin\file.exe`.
3. Restart your terminal.

This is **the ONLY way we recommend**. We do not recommend install `file` via Scoop or Chocolatey, since they cannot handle Unicode filenames (such as `oliver-sjöström.jpg`) properly and lack some required parameters.

### Installation

You can download the latest official binaries from [GitHub Releases](https://github.com/sxyazi/yazi/releases), or install Yazi with [Scoop](https://scoop.sh/):

```sh
scoop install yazi
# Install the optional dependencies (recommended):
scoop install unar jq poppler fd ripgrep fzf zoxide imagemagick
```

## AOSC OS

```sh
sudo oma install yazi
```

## Official binaries

You can download the latest official binaries from GitHub Releases: https://github.com/sxyazi/yazi/releases

On this page, we offer GNU/Musl builds to meet the needs of different users; we also provide a Snapcraft package, which Ubuntu/Debian users can use.

## Cargo

Setup the latest stable Rust toolchain:

```sh
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
rustup update
```

Now you can install Yazi from crates.io:

```sh
cargo install --locked yazi-fm yazi-cli
```

Or install the latest git version:

```sh
cargo install --locked --git https://github.com/sxyazi/yazi.git yazi-fm yazi-cli
```

If it fails to build, please check if `make` and `gcc` is installed on your system.

## Build from source

Setup the latest stable Rust toolchain:

```sh
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
rustup update
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
