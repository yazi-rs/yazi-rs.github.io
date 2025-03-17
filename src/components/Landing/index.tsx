import clsx from "clsx"
import Heading from "@theme/Heading"
import styles from "./styles.module.css"

type CardProps = {
	title: string
	Svg: React.ComponentType<React.ComponentProps<"svg">>
	description: JSX.Element
}

const cards: CardProps[] = [
	{
		title: "Full Asynchronous Support",
		Svg: require("@site/static/images/async.svg").default,
		description: (
			<>
				All I/O operations are asynchronous, CPU tasks are spread across multiple threads, making the most of available
				resources.
			</>
		),
	},
	{
		title: "Powerful Async Task Scheduling and Management",
		Svg: require("@site/static/images/task.svg").default,
		description: <>Provides real-time progress updates, task cancellation, and internal task priority assignment.</>,
	},
	{
		title: "Built-in Support for Multiple Image Protocols",
		Svg: require("@site/static/images/image.svg").default,
		description: <>Also integrated with Überzug++, covering almost all terminals.</>,
	},
	{
		title: "Built-in Code Highlighting and Image Encoding",
		Svg: require("@site/static/images/code.svg").default,
		description: <>Combined with the pre-caching mechanism, greatly accelerates image and normal file loading.</>,
	},
]

function Card({ title, Svg, description }: CardProps) {
	return (
		<div className={clsx("col col--3")}>
			<div className="text--center">
				<Svg className={styles.featureSvg} role="img" />
			</div>
			<div className="text--center padding-horiz--md">
				<Heading as="h3">{title}</Heading>
				<p>{description}</p>
			</div>
		</div>
	)
}

export default function Landing(): JSX.Element {
	return (
		<section className={styles.features}>
			<div className="container">
				<div className="row">
					{cards.map((props, idx) => (
						<Card key={idx} {...props} />
					))}
				</div>
			</div>
		</section>
	)
}
