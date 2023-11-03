import Heading from "@theme/Heading"

import React from "react"
import Link from "@docusaurus/Link"
import clsx from "clsx"

import styles from "./styles.module.css"

export type Item = {
	title: string
	video: string
	description: string
}

export function DisplayItemsHeader({
	heading,
	description,
	cta,
}: {
	heading: string
	description?: string
	cta: { emoji: string; text: string; link: string }
}) {
	return (
		<section className="margin-top--lg margin-bottom--lg text--center">
			<Heading as="h1">{heading}</Heading>
			{description && <p>{description}</p>}
			<Link className={clsx("button button--primary", styles.space)} to={cta.link}>
				<span aria-hidden="true">{cta.emoji}</span>
				<span>{cta.text}</span>
			</Link>
		</section>
	)
}

function DisplayItemsCard(item: Item) {
	return (
		<li key={item.title} className="card shadow--md">
			<div className={clsx("card__image")}>
				<video src={item.video} width="100%" autoPlay controls loop muted></video>
			</div>
			<div className="card__body">
				<Heading as="h4">{item.title}</Heading>
				<p>{item.description}</p>
			</div>
			<ul className={clsx("card__footer")}></ul>
		</li>
	)
}

export function DisplayItemsList({ items }: { items: Item[] }) {
	return (
		<section className="margin-top--lg margin-bottom--xl">
			<div className="container">
				<ul className={clsx("container", "clean-list", styles.cards)}>{items.map(item => DisplayItemsCard(item))}</ul>
			</div>
		</section>
	)
}
