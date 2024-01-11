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

But! This is not the current performance bottleneck for Yazi. Considering Yazi is a TUI app, unlike CLI programs like `ls` and `exa` that need to output all files immediately, Yazi has more optimization opportunities at the application-layer:

- For large directories (e.g., 100,000 files), Yazi uses [chunked loading](https://github.com/sxyazi/yazi/pull/117), which is unmatched by `ls` and `exa` since they must load everything at once.
- Yazi also preloads directory file lists in the background, an optimization that `ls` and `exa` do not possess.

I must express my gratitude to Tokio for providing an excellent and convenient way to realize these application-layer optimizations.

I believe that the benefits brought by these application-level optimizations are more noticeable compared to switching to solutions like `io_uring`. But I remain open to this and welcome constructive PR.

Here is a relevant discussion on Reddit: [reddit.com/r/rust/comments/16fxr58/comment/k066gmh](https://www.reddit.com/r/rust/comments/16fxr58/comment/k066gmh/)

## Pre-Caching

Yazi provides pre-caching mechanisms for the following data:

- Mimetype: The baseline. Yazi uses the file's mimetype as a reference for tasks such as opening, previewing, and style rendering, and internally utilizes `file(1)` to obtain the file's mimetype.
- Image: To accelerate image previews, Yazi employs a 2-pass process for image files. The first pass is preprocessing, which downscales the image based on user-set max_width/max_height and generates a compressed lossy image as a cache file, significantly reducing file size. The second pass occurs when the user actually switches to the file and downscales it again to fit the terminal size.
- Video: To speed up video previews, Yazi pre-converts them into images and goes through the first pass of image processing. When the user needs to display the video, it undergoes the same second pass.
- PDF: Similar to video.
- Directory size: Yazi lazily calculates the directory size only when the user sets sorting by file size, as it is a time-consuming operation.

Note: Except for size, all of these are scoped, meaning that when you are on the first page, only the first few files will be pre-cached.

For example, if your directory has 1000 files, your terminal height is 10, and you are on the second page, only files 11 to 20 will be processed. This greatly saves resources.

## Discardable Tasks

Every preview task is discardable. When you navigate quickly between files and the previous file's triggered preview task is still not finished, it will be discarded directly, initiating a new task.

This promotes resource utilization. For I/O tasks like loading directory lists, Tokio's `abort` is used; for CPU tasks like code highlighting, an `Atomic` is used to record a `ticket`, and it checks if the value changes on each line code highlight. If it changes, it indicates that the current context has changed, and the entire highlighting task is discarded.

## Code Highlighting

Yazi has built-in code highlighting and keeps it to a minimum for all text files: if your terminal height is 10, only the first 10 lines of the file are read and highlighted.

Other file managers that rely on external programs like `bat` need to wait for `bat` to finish highlighting the _entire file_ before displaying only the first 10 lines.

In cases like JSON that require external program `jq`, Yazi kills `jq` directly after reading the first 10 lines to avoid unnecessary resource consumption.

Since code highlighting is a CPU-intensive task, it is distributed among multiple blocking threads, managed through Tokio's spawn_blocking, and is also discardable.

## Image Preview

Yazi not only has built-in code highlighting but also includes image encoding and downscaling - there is likely nothing faster than having it directly built-in. It is also distributed among multiple threads and is discardable.

Besides being fast, Yazi's built-in Terminal graphics protocol, Inline images protocol, and Sixel graphics format allow Yazi to finely control when to display or hide images.

This ensures that in Yazi, there won't be issues, like images stacking on top of each other, or image escape code breaking the entire screen, when quickly navigating through images, as `stdout` is locked while outputting these escape codes. This locking happens after all image data is prepared, so it has no impact on performance.

## Async Task Scheduling

In Yazi, tasks are automatically prioritized based on their severity. Yazi categorizes tasks into two types:

- Macro tasks: Large and heavy tasks, such as copying large files, typically taking a long time to complete.
- Micro tasks: Small and urgent tasks, such as fetching file mimetype, pre-caching images, calculating directory size, and so on.

This is similar to having big and small cores in a CPU; when the big cores are idle, they help with the micro tasks. Yazi defaults to starting 5 micro workers and 10 macro workers, and these numbers can be configured by the user!

For complex tasks like file copying, a combination of micro and macro approaches is employed. Micro is used to recursively gather a list of all files to be copied, allowing users to see the number of tasks and their sizes in advance. Macro, on the other hand, handles the actual copying process.

The advantage of task scheduling extends beyond providing ample concurrency for I/O and CPU resources; it also indirectly mitigates the depletion of system resources (such as file handles and CPU) due to sudden task surges.
