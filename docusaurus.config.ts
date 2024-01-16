import { themes as prismThemes } from "prism-react-renderer"
import type { Config } from "@docusaurus/types"
import type * as Preset from "@docusaurus/preset-classic"

const config: Config = {
	title: "Yazi",
	tagline: "⚡️ Blazing fast terminal file manager written in Rust, based on async I/O.",
	favicon: "img/logo.png",

	url: "https://yazi-rs.github.io",
	baseUrl: "/",

	organizationName: "yazi-rs",
	projectName: "yazi-rs.github.io",

	onBrokenLinks: "throw",
	onBrokenMarkdownLinks: "warn",

	i18n: {
		defaultLocale: "en",
		locales: ["en"],
	},

	presets: [
		[
			"classic",
			{
				docs: {
					path: "docs",
					routeBasePath: "docs",
					sidebarPath: "./sidebars.ts",
					// Remove this to remove the "edit this page" links.
					editUrl: "https://github.com/yazi-rs/yazi-rs.github.io/edit/main/",
				},
				blog: {
					showReadingTime: true,
					// Remove this to remove the "edit this page" links.
					editUrl: "https://github.com/yazi-rs/yazi-rs.github.io/edit/main/",
				},
				theme: {
					customCss: "./src/css/custom.css",
				},
			} satisfies Preset.Options,
		],
	],

  themes: [
    // ... Your other themes.
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
      ({
        // ... Your options.
        // `hashed` is recommended as long-term-cache of index file is possible.
        hashed: true,
        // For Docs using Chinese, The `language` is recommended to set to:
        // ```
        language: ["en", "zh"],
        // ```
      }),
    ],
  ],

	themeConfig: {
		// Replace with your project's social card
		image: "img/docusaurus-social-card.jpg",
		navbar: {
			title: "Yazi",
			logo: {
				alt: "Yazi file manager",
				src: "img/logo.png",
			},
			items: [
				{
					type: "docSidebar",
					sidebarId: "docsSidebar",
					position: "left",
					label: "Docs",
				},
				{ to: "/features", label: "Features", position: "left" },
				{ to: "/blog", label: "Blog", position: "left" },
				{
					href: "https://github.com/sxyazi/yazi",
					label: "GitHub",
					position: "right",
				},
			],
		},
		footer: {
			style: "dark",
			links: [
				{
					title: "Resources",
					items: [
						{
							label: "Docs",
							to: "/docs/installation",
						},
						{
							label: "Features",
							to: "/features",
						},
						{
							label: "Blog",
							to: "/blog",
						},
					],
				},
				{
					title: "Community",
					items: [
						{
							label: "Discord (English mainly)",
							href: "https://discord.gg/qfADduSdJu",
						},
						{
							label: "Telegram (Chinese mainly)",
							href: "https://t.me/yazi_rs",
						},
					],
				},
				{
					title: "More",
					items: [
						{
							label: "GitHub",
							href: "https://github.com/sxyazi/yazi",
						},
					],
				},
			],
			copyright: `Copyright © ${new Date().getFullYear()} Yazi. Built with ❤️️.`,
		},
		prism: {
			theme: prismThemes.github,
			darkTheme: prismThemes.dracula,
			additionalLanguages: ["lua", "toml", "diff", "bash", "powershell"],
		},
	} satisfies Preset.ThemeConfig,

	markdown: {
		format: "mdx",
	},
}

export default config
