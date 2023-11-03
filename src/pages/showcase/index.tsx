import Layout from "@theme/Layout"

import { DisplayItemsHeader, DisplayItemsList } from "@site/src/components/DisplayItems"

const plugins = []

export default function Showcas(): JSX.Element {
	const title = "Showcase"
	const description = "A showcase of community plugins for Yazi."
	return (
		<Layout title={title} description={description}>
			<main className="margin-vert--lg">
				<DisplayItemsHeader
					heading={title}
					description={description}
					cta={{
						emoji: "🔌",
						text: "Add your plugin!",
						link: "https://github.com/yazi-rs/yazi-rs.github.io/issues/new",
					}}
				/>
				<DisplayItemsList items={plugins} />
			</main>
		</Layout>
	)
}
