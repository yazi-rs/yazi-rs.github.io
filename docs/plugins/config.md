# Built-In Plugins

Yazi comes with useful built-in plugins to help enhance your workflow without extra setup. This page introduces the two built-in plugins and their available configuration options.

> If you find any issues or have suggestions for improvements, feel free to [open an issue](https://github.com/yazi-rs) or contribute via a pull request.

## fzf Plugin

The **fzf** plugin integrates the power of [fzf](https://github.com/junegunn/fzf) directly into Yazi, allowing you to swiftly search and navigate through files and directories with fuzzy matching.

### Features

- **Quick file searching:** Use fuzzy matching to find files on the fly.
- **Seamless integration:** The plugin is designed to work out-of-the-box with Yazi’s command palette.
- **Minimal setup:** No additional configuration is required to start using fzf functionality.

### Usage

When invoking file searches or using commands that trigger fzf, Yazi automatically routes the query through the plugin. This provides a fast and smooth experience without leaving the terminal.

*Note: As of now, there are no extra configuration options for the fzf plugin. Future enhancements may introduce more fine-grained controls.*

---

## zoxide Plugin

The **zoxide** plugin enhances your directory navigation by integrating with [zoxide](https://github.com/ajeetdsouza/zoxide), a smarter replacement for the conventional `cd` command.

### Features

- **Smart directory jumping:** Leverages zoxide’s tracking to jump to frequently or recently visited directories.
- **Automatic database updates:** Optionally updates zoxide’s internal database each time you use the `cd` command within Yazi.

### Configuration Options

The key configuration option for the zoxide plugin is `update_db`, which controls whether Yazi should update zoxide’s database automatically. This gives you control over the behavior of your directory change tracking.

#### Example Configuration

Below is an example snippet using TOML syntax. Adjust it if you use YAML or another configuration format:

```toml
[plugins.zoxide]
# Set to true so that Yazi updates zoxide's database when changing directories.
update_db = true
```

- **update_db:**  
  - **Type:** Boolean  
  - **Default:** Typically set to `true`  
  - **Purpose:** When enabled, every time you use the `cd` command within Yazi, the zoxide database will be updated automatically. This ensures that your recent and frequently used directories are tracked accurately.

### Usage

Once enabled in your configuration, you can enjoy smooth directory navigation powered by zoxide. For instance, using a simple `cd` command in Yazi will both change your working directory and maintain an updated navigation history as managed by zoxide.
