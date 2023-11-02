import Layout from "@theme/Layout"
import Heading from "@theme/Heading"

import React from "react"
import Link from "@docusaurus/Link"
import clsx from "clsx"

import styles from "./styles.module.css"

const plugins = []

function ShowcaseHeader() {
	return (
		<section className="margin-top--lg margin-bottom--lg text--center">
			<Heading as="h1">Showcase</Heading>
			<p>A showcase of community plugins for Yazi.</p>
			<Link
				className={clsx("button button--primary", styles.space)}
				to="https://github.com/yazi-rs/yazi-rs.github.io/issues/new"
			>
				<span aria-hidden="true">🔌</span>
				<span>Add your plugin!</span>
			</Link>
		</section>
	)
}

function ShowcaseCard(feature) {
	return (
		<li key={feature.title} className="card shadow--md">
			<div className={clsx("card__image")}>
				<video src={feature.video} width="100%" autoPlay controls loop muted></video>
			</div>
			<div className="card__body">
				<Heading as="h4">{feature.title}</Heading>
				<p>{feature.description}</p>
			</div>
			<ul className={clsx("card__footer")}></ul>
		</li>
	)
}

function ShowcaseCards() {
	return (
		<section className="margin-top--lg margin-bottom--xl">
			<div className="container">
				<ul className={clsx("container", "clean-list", styles.cards)}>
					{plugins.map(feature => ShowcaseCard(feature))}
				</ul>
			</div>
		</section>
	)
}

export default function Showcase(): JSX.Element {
	return (
		<Layout title="Yazi Showcase" description="A showcase of community plugins for Yazi.">
			<main className="margin-vert--lg">
				<ShowcaseHeader />
				<ShowcaseCards />
			</main>
		</Layout>
	)
}
