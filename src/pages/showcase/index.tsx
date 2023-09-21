import Layout from "@theme/Layout";
import Heading from '@theme/Heading';

import React from "react"
import Link from "@docusaurus/Link";
import clsx from "clsx";

import styles from './styles.module.css';

const features = [
	{
		title: "Scrollable Preview",
		video: "/docs/videos/scrollable-preview.mp4",
		description: "Preview various types of files, and scroll while previewing.",
	},
	{
		title: "Visual Mode & Batch Rename",
		video: "/docs/videos/visual-mode_batch-rename.mp4",
		description: "Batch select files in visual mode, and rename them.",
	},
	{
		title: "Vim-like Input & Select Component",
		video: "/docs/videos/input_select.mp4",
		description: "Quickly edit filename in the Input, and choose how to open it in the Select.",
	},
	{
		title: "Multi-Tab & fzf, zoxide",
		video: "/docs/videos/multi-tab_zoxide.mp4",
		description: "Collaborate across multiple tabs, and use fzf, zoxide for quick jumps.",
	},
	{
		title: "Multi-Select & Task Management",
		video: "/docs/videos/multi-select_task-management.mp4",
		description: "Select multiple files individually, perform copy, cut, etc. Which are scheduled by the task system, providing real-time progress reports and task cancellation.",
	},
	{
		title: "Incremental Find",
		video: "/docs/videos/incremental-find.mp4",
		description: "Find files incrementally in real-time, with the current position and number of all matches displayed.",
	},
	{
		title: "Search",
		video: "/docs/videos/search.mp4",
		description: "Search by name using fd, by content using rg, and perform arbitrary operations on the results.",
	},
]

function ShowcaseHeader() {
  return (
    <section className="margin-top--lg margin-bottom--lg text--center">
      <Heading as="h1">Yazi Showcase</Heading>
      <p>List of features and plugins people are building with Yazi</p>
      <Link className="button button--primary" to="https://github.com/yazi-rs/docs/issues/new">
				🐤 Add your plugin
      </Link>
    </section>
  );
}

function ShowcaseCard(feature) {
	return <li key={feature.title} className="card shadow--md">
		<div className={clsx('card__image')}>
			<video src={feature.video} width="100%" autoPlay controls loop muted></video>
		</div>
		<div className="card__body">
			<Heading as="h4">{feature.title}</Heading>
			<p>{feature.description}</p>
		</div>
		<ul className={clsx('card__footer')}></ul>
	</li>
}

function ShowcaseCards() {
  return (
    <section className="margin-top--lg margin-bottom--xl">
			<div className="container">
				<div className={clsx('margin-bottom--md')}>
					<Heading as="h2">Features ✨</Heading>
				</div>
				<ul className={clsx('container', 'clean-list', styles.cards)}>
					{features.map((feature) => ShowcaseCard(feature))}
				</ul>
			</div>
    </section>
  );
}

export default function Showcase(): JSX.Element {
  return (
    <Layout title="Yazi Showcase" description="List of features and plugins people are building with Yazi">
      <main className="margin-vert--lg">
        <ShowcaseHeader />
        <ShowcaseCards />
      </main>
    </Layout>
  );
}
