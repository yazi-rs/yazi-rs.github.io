import clsx from "clsx"
import Link from "@docusaurus/Link"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import Layout from "@theme/Layout"
import Landing from "@site/src/components/Landing"
import Heading from "@theme/Heading"

import styles from "./index.module.css"

function HomepageHeader() {
	const { siteConfig } = useDocusaurusContext()
	return (
		<header className={clsx("hero hero--primary", styles.heroBanner)}>
			<div className="container">
				<Heading as="h1" className="hero__title">
					{siteConfig.title}
				</Heading>
				<p className="hero__subtitle">{siteConfig.tagline}</p>
				<div className={styles.buttons}>
					<Link className="button button--secondary button--lg" to="/docs/install">
						Get Started 🚀
					</Link>
				</div>
			</div>
		</header>
	)
}

export default function Home(): JSX.Element {
	return (
		<Layout description="Blazing fast terminal file manager written in Rust, based on async I/O.">
			<HomepageHeader />
			<main>
				<Landing />
			</main>
		</Layout>
	)
}
