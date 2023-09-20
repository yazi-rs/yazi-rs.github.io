import Layout from "@theme/Layout";
import Heading from '@theme/Heading';

import React from "react"
import Link from "@docusaurus/Link";
import clsx from "clsx";

const all = [
	{ title: "Preview1", video: "", description: "Preview your markdown in real-time", tags: ["feature"] },
	{ title: "Preview2", video: "", description: "Preview your markdown in real-time", tags: ["feature"] },
	{ title: "Preview3", video: "", description: "Preview your markdown in real-time", tags: ["feature"] },
	{ title: "Preview4", video: "", description: "Preview your markdown in real-time", tags: ["feature"] },
	{ title: "Preview5", video: "", description: "Preview your markdown in real-time", tags: ["feature"] },
]

function ShowcaseHeader() {
  return (
    <section className="margin-top--lg margin-bottom--lg text--center">
      <Heading as="h1">Yazi Showcase</Heading>
      <p>List of features and plugins people are building with Yazi</p>
      <Link className="button button--primary" to={"/"}>
				🙏 Please add your plugin
      </Link>
    </section>
  );
}

function ShowcaseCard(one) {
	return <li key={one.title} className="card shadow--md">
		<div className={clsx('card__image', "aaaaaaaaaaaaa")}>
img
		</div>
		<div className="card__body">
			<div className={"aaaaaaaaaaaaa"}>
				<Heading as="h4" className={"aaaaaaaaaaaaa"}>
					{one.title}
				</Heading>
			</div>
			<p className={"aaaaaaaaaaaaa"}>{one.description}</p>
		</div>
		<ul className={clsx('card__footer', "aaaaaaaaaaaaa")}>
			{one.tags.map(tag =>
				{tag}
			)}
		</ul>
	</li>
}

function ShowcaseCards() {
  return (
    <section className="margin-top--lg margin-bottom--xl">
			<div className="container">
				<div
					className={clsx(
						'margin-bottom--md',
						"aaaaaaaaaaaaa",
					)}>
					<Heading as="h2">
						All
					</Heading>
				</div>
				<ul
					className={clsx(
						'container',
						'clean-list',
						"aaaaaaaaaaaaa",
					)}>
					{all.map((one) => ShowcaseCard(one))}
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
        <div
          style={{display: 'flex', marginLeft: 'auto'}}
          className="container">
        </div>
        <ShowcaseCards />
      </main>
    </Layout>
  );
}
