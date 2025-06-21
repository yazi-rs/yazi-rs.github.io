---
slug: why-is-yazi-fast
title: Why is Yazi fast?
authors: [sxyazi]
---

This article assumes that you have already used Yazi and are familiar with most of its features.

Yazi has undergone significant optimizations to enhance user experience. It is designed entirely as an async program, handling all time-consuming tasks (I/O and CPU) as async tasks in a non-blocking, event-driven manner.

## Tokio

Internally, Yazi uses Tokio as its async runtime: hold on! Tokio's async may not be "truly async" as you might perceive it!

Uh, okay. From an application-layer perspective, it indeed is async; however, from a system-level view, there are possibly better solutions.

But! This is not the current performance bottleneck for Yazi. Considering Yazi is a TUI app, unlike CLI programs like `ls` and `eza` that need to output all files immediately, Yazi has more optimization opportunities at the application-layer:

- For large directories (e.g., 100,000 files), Yazi uses [chunked loading](https://github.com/sxyazi/yazi/pull/117), which is unmatched by `ls` and `eza` since they must load everything at once.
- Yazi also preloads directory file lists in the background, an optimization that `ls` and `eza` do not possess.

I must express my gratitude to Tokio for providing an excellent and convenient way to realize these application-layer optimizations.

I believe that the benefits brought by these application-level optimizations are more noticeable compared to switching to solutions like `io_uring`. But I'm open to this and welcome any constructive PR.

Here is a relevant discussion on Reddit: https://www.reddit.com/r/rust/comments/16fxr58/comment/k066gmh/

## Pre-Loading

Preloaders are part of Yazi's concurrent plugin system, and the entire pre-loading process is asynchronous and spans multiple threads. This means that preloaders can handle not only expensive IO tasks but also CPU-bound tasks! Here are some built-in preloaders in Yazi:

- Mimetype: The baseline. Yazi uses the file's mime-type as a reference for tasks such as opening, previewing, and style rendering, and internally utilizes `file(1)` to obtain the file's mime-type. For better performance, Yazi computes them for files of an entire page, rather than for each file individually, and the entire process is chunked to minimize response latency.
- Image: To accelerate image previews, Yazi uses a 2-pass process for image files. The first pass is preprocessing, which downscales the image based on user-set max_width/max_height and generates a compressed lossy image as a cache file, significantly reducing file size. The second pass occurs when the user actually switches to the file and downscales it again to fit the terminal size.
- Video: To speed up video previews, Yazi pre-converts them into images and goes through the first pass of image processing. When the user needs to display the video, it goes the same second pass.
- PDF: Similar to video.
- Directory size: Yazi lazily calculates the directory size only when the user sets sorting by file size, as it's a time-consuming operation.

Note: Except for size, all of these are paged, meaning that when you are on the first page, only the first few files will be pre-loaded.

For example, if your directory has 1000 files, your terminal height is 10, and you are on the second page, only files 11 to 20 will be processed. This greatly saves resources.

## Discardable Tasks

Every preview task is discardable. When you navigate between files quickly and the previous file's triggered preview task is still not finished, it will be discarded directly, initiating a new task. This promotes resource utilization:

- For I/O tasks like loading directory lists, Tokio's `abort` is used;
- For CPU tasks like code highlighting, an `Atomic` is used to store a `ticket`, and it checks if the value changes on each line code highlight. If it changes, indicates that the current context has changed, and the entire highlighting task is discarded.
- For I/O and CPU tasks like previewer/preloader plugins, with Lua, Yazi can check whether these tasks are canceled when a specific number of CPU instructions. If canceled, it interrupts the execution of the Lua script immediately, avoiding wasting more I/O and CPU resources.

## Code Highlighting

Yazi has built-in code highlighting and keeps it to a minimum for all text files: if your terminal height is 10, only the first 10 lines of the file are read and highlighted.

Other file managers that rely on external programs like `bat` need to wait for `bat` to finish highlighting the _entire file_ before displaying only the first 10 lines.

In cases like JSON that require external program `jq`, Yazi kills `jq` directly after reading the first 10 lines to avoid unnecessary resource consumption.

Since code highlighting is a CPU-bound task, it is distributed among multiple blocking threads, managed through Tokio's spawn_blocking, and is also discardable.

## Image Preview

Yazi not only has built-in code highlighting but also includes image decoding and downscaling - there is likely nothing faster than having it directly built-in. It is also distributed among multiple threads and is discardable.

Besides being fast, Yazi's built-in Kitty graphics protocol, Inline images protocol, and Sixel graphics format allow Yazi to finely control when to display or hide images.

This ensures that in Yazi, there won't be issues, like images stacking on top of each other, or image escape code breaking the entire screen, when navigating through images quickly, as `stdout` is locked while outputting these escape codes. This locking happens after all image data is prepared, so it has no impact on performance.

Yazi even supports partially erasing content in preview images, which is useful for popup components (input, pick, confirm, etc.). The image won't overlap the input, and when the pop-up disappears, Yazi redraws the image to complete the erased portion automatically.

## Async Task Scheduling

In Yazi, tasks are prioritized based on their severity automatically. Yazi categorizes tasks into two types:

- Macro tasks: Large and heavy tasks, such as copying large files, typically taking a long time to complete.
- Micro tasks: Small and urgent tasks, such as fetching file mime-type, pre-loading images, calculating directory size, and so on.

This is similar to having big and small cores in a CPU; when the big cores are idle, they help with the micro tasks. Yazi defaults to starting 5 micro workers and 10 macro workers, and these numbers can be configured by the user!

In addition, Yazi introduces a priority scheduling mechanism. Each task has 3 priority levels: low, normal, and high. High-priority tasks can preempt low-priority tasks, applying to both micro and macro tasks. This increases task concurrency, slowing down HOL blocking caused by queuing execution of sudden requests.

For complex tasks like file copying, a combination of micro and macro approaches is employed. Micro is used to gather a list of all files to be copied recursively, allowing users to see the number of tasks and their sizes in advance. Macro, on the other hand, handles the actual copying process.

The advantage of task scheduling extends beyond providing ample concurrency for I/O and CPU resources; it also indirectly mitigates the depletion of system resources (such as file handles and CPU) due to sudden task surges.

## Other optimizations

The above optimizations are the most noticeable to users, but behind the scenes, Yazi has also done many other optimizations. Include but are not limited to:

- The re-implemented highly optimized natural sorting algorithm is [~6 times faster than the `natord`](https://github.com/sxyazi/yazi/pull/237) that `eza` uses in case-insensitive sorting.
- Yazi caches the directory state that has already been read, avoiding any unnecessary IO operations.
- When a file in a directory changes, it only updates the changed files rather than re-reading the entire directory list.
- Merges multiple renders triggered by multiple commands into a single render, avoiding unnecessary CPU consumption.
- Frequent updates to components, such as progress bars, are rendered independently, which is no cost compared to a complete render.
- The entire plugin system is designed with an asynchronous-first philosophy to avoid blocking the main thread with time-consuming tasks.

## TODO

I'll find time to continue writing.
