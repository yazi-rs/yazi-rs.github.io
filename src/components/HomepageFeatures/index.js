import React from "react"
import clsx from "clsx"
import styles from "./styles.module.css"

const FeatureList = [
	{
		title: "Full Asynchronous Support",
		Svg: require("@site/static/img/async.svg").default,
		description: (
			<>
				All I/O operations are asynchronous, CPU tasks are spread across multiple threads, making the most of available
				resources.
			</>
		),
	},
	{
		title: "Powerful Async Task Scheduling and Management",
		Svg: require("@site/static/img/task.svg").default,
		description: <>Provides real-time progress updates, task cancellation, and internal task priority assignment.</>,
	},
	{
		title: "Built-in Support for Multiple Image Protocols",
		Svg: require("@site/static/img/image.svg").default,
		description: <>Also integrated with Überzug++, covering almost all terminals.</>,
	},
	{
		title: "Built-in Code Highlighting and Image Encoding",
		Svg: require("@site/static/img/code.svg").default,
		description: <>Combined with the pre-caching mechanism, greatly accelerates image and normal file loading.</>,
	},
]

function Feature({ Svg, title, description }) {
	return (
		<div className={clsx("col col--3")}>
			<div className="text--center">
				<Svg className={styles.featureSvg} role="img" />
			</div>
			<div className="text--center padding-horiz--md">
				<h3>{title}</h3>
				<p>{description}</p>
			</div>
		</div>
	)
}

export default function HomepageFeatures() {
	return (
		<section className={styles.features}>
			<div className="container">
				<div className="row">
					{FeatureList.map((props, idx) => (
						<Feature key={idx} {...props} />
					))}
				</div>
			</div>
		</section>
	)
}
