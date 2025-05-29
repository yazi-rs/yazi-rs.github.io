---
sidebar_position: 11
description: Terminology used in Yazi.
---

# Terminology

Yazi is developed following domain-driven design principles, and by incorporating domain-specific terminology, it reduces communication costs and ensures that we are aligned with it.

## Layers

Yazi adopts a layered architectural design, with each layer having clear responsibilities and functions:

- `app`: Entire application. This layer is not directly accessed by users but mediates interactions between the user and the terminal or system environment, such as listening for and handling mouse or key events, processing system signals, redrawing interfaces, etc.
- `mgr`: Main user interface of the manager, where most user actions take place, such as browsing, selecting, opening, and editing files.
- `tasks`: Task manager, responsible for managing asynchronous shell processes, plugins, preloading, and file operations (copying, moving, deleting, etc.).
- `spot`: File information spotter, which uses user-configured spotters to display metadata for different file types, such as dimensions and color space for image files, duration and encoding for video files, total size of directories, etc.
- `pick`: Picker component used to choose a method for opening files.
- `input`: Input component used to receive user input, such as plain text or password entries.
- `confirm`: Confirmation component used to prompt the user for confirmations, such as deleting or overwriting files.
- `cmp`: Auto-completion component used to provide suggestions for file names, paths, etc.
- `help`: Help menu used to display the list of available key bindings for different layers along with their descriptions.

## File System

- `url`: Uniform resource locator of a file.
- `cha`: Metadata of a file.

## Layout System

- `rect`: A rectangular area.
- `area`: Parameters of a area with a rect type.
- `pad`: Padding.
- `pos`: Relative position of a layout element.
- `constraint`: Layout constraints that define the size of a layout element.

## Plugin System

- fetcher: A Lua plugin used for preloading metadata of multiple files in bulk.
- spotter: A Lua plugin used to spot the metadata of a single file.
- preloader: A Lua plugin used to preload the content of a single file.
- previewer: A Lua plugin used to preview the content of a single file.

## Lua API

- `cx`: Synchronous context state.
- `rt`: Runtime information, such as user terminal emulator properties and global user preferences.
- `th`: Theme system configuration.
- `fs`: File system API.
- `ui`: Layout system.
- `ya`: Utility API, including functions for system time, debugging, shell commands, etc.
- `ps`: Publish-subscribe system/data distribution service.

## Data Distribution Service

- `DDS`: Data Distribution Service.
- `instance`: A Yazi process.
- `local`: Current instance.
- `remote`: Instances that are not the current one.
- `message`: Smallest unit of one-shot communication between different instances.
- `static message`: Messages that begin with `@`, whose state is automatically persisted and restored when a new instance starts.
