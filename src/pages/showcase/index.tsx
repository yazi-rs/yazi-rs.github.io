import Layout from "@theme/Layout"

import { Header, Cards } from "@site/src/components/Highlights"

const plugins = []

export default function Showcase(): JSX.Element {
	const title = "Showcase"
	const description = "A showcase of community plugins for Yazi."
	return (
		<Layout title={title} description={description}>
			<main className="margin-vert--lg">
				<Header
					heading={title}
					description={description}
					link={{
						emoji: "🔌",
						text: "Add your plugin!",
						to: "https://github.com/yazi-rs/yazi-rs.github.io/issues/new",
					}}
				/>
				<Cards from={plugins} />
			</main>
		</Layout>
	)
}
