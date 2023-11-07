import Layout from "@theme/Layout"

import { Header, Cards, CardProps } from "@site/src/components/Highlights"

const features: CardProps[] = [
	{
		title: "Scrollable Preview",
		video: "/videos/scrollable-preview.mp4",
		description: "Preview various types of files, and scroll while previewing.",
	},
	{
		title: "Visual Mode & Batch Rename",
		video: "/videos/visual-mode_batch-rename.mp4",
		description: "Batch select files in visual mode, and rename them.",
	},
	{
		title: "Vim-like Input & Select Component",
		video: "/videos/input_select.mp4",
		description: "Quickly edit filename in the Input, and choose how to open it in the Select.",
	},
	{
		title: "Multi-Tab & fzf, zoxide",
		video: "/videos/multi-tab_zoxide.mp4",
		description: "Collaborate across multiple tabs, and use fzf, zoxide for quick jumps.",
	},
	{
		title: "Multi-Select & Task Management",
		video: "/videos/multi-select_task-management.mp4",
		description:
			"Select multiple files individually, perform copy, cut, etc. Which are scheduled by the task system, providing real-time progress reports and task cancellation.",
	},
	{
		title: "Incremental Find",
		video: "/videos/incremental-find.mp4",
		description:
			"Find files incrementally in real-time, with the current position and number of all matches displayed.",
	},
	{
		title: "Search",
		video: "/videos/search.mp4",
		description: "Search by name using fd, by content using rg, and perform arbitrary operations on the results.",
	},
]

export default function Features(): JSX.Element {
	return (
		<Layout title="Features" description="List of Yazi's features.">
			<main className="margin-vert--lg">
				<Header
					heading="Features"
					description="List of features shipped with Yazi."
					link={{
						emoji: "✨",
						text: "Suggest a feature!",
						to: "https://github.com/sxyazi/yazi/issues/new?template=feature.yml",
					}}
				/>
				<Cards from={features} />
			</main>
		</Layout>
	)
}
