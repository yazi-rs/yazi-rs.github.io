import { themes as prismThemes } from "prism-react-renderer"
import type { Config } from "@docusaurus/types"
import type * as Preset from "@docusaurus/preset-classic"

const config: Config = {
	title  : "Yazi",
	tagline: "⚡️ Blazing fast terminal file manager written in Rust, based on async I/O.",
	favicon: "webp/logo.webp",

	url    : "https://yazi-rs.github.io",
	baseUrl: "/",

	organizationName: "yazi-rs",
	projectName     : "yazi-rs.github.io",

	onBrokenLinks        : "throw",
	onBrokenMarkdownLinks: "warn",

	i18n: {
		defaultLocale: "en",
		locales      : ["en"],
	},

	presets: [
		[
			"classic",
			{
				docs: {
					path         : "docs",
					routeBasePath: "docs",
					sidebarPath  : "./sidebars.ts",
					// Remove this to remove the "edit this page" links.
					editUrl      : "https://github.com/yazi-rs/yazi-rs.github.io/edit/main/",
				},
				blog: {
					showReadingTime: true,
					// Remove this to remove the "edit this page" links.
					editUrl        : "https://github.com/yazi-rs/yazi-rs.github.io/edit/main/",
				},
				theme: {
					customCss: "./src/css/custom.css",
				},
			} satisfies Preset.Options,
		],
	],

	themeConfig: {
		// Replace with your project's social card
		image : "webp/docusaurus-social-card.wbep",
		navbar: {
			title: "Yazi",
			logo : {
				alt: "Yazi file manager",
				src: "webp/logo.webp",
			},
			items: [
				{
					type     : "docSidebar",
					sidebarId: "docsSidebar",
					position : "left",
					label    : "Docs",
				},
				{ to: "/features", label: "Features", position: "left" },
				{ to: "/blog", label: "Blog", position: "left" },
				{
					href    : "https://github.com/sxyazi/yazi",
					label   : "GitHub",
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
							to   : "/docs/installation",
						},
						{
							label: "Features",
							to   : "/features",
						},
						{
							label: "Blog",
							to   : "/blog",
						},
					],
				},
				{
					title: "Community",
					items: [
						{
							label: "Discord (English mainly)",
							href : "https://discord.gg/qfADduSdJu",
						},
						{
							label: "Telegram (Chinese mainly)",
							href : "https://t.me/yazi_rs",
						},
					],
				},
				{
					title: "More",
					items: [
						{
							label: "GitHub",
							href : "https://github.com/sxyazi/yazi",
						},
					],
				},
			],
			copyright: `Copyright © ${new Date().getFullYear()} Yazi. Built with ❤️️.`,
		},
		prism: {
			theme              : prismThemes.github,
			darkTheme          : prismThemes.dracula,
			additionalLanguages: ["bash", "diff", "lua", "nix", "powershell", "toml"],
		},
		algolia: {
			appId           : "MS4XF9Z1OE",
			apiKey          : "d88c4dc9a8ebab02a753d7d950c61246",
			indexName       : "yazi-rsio",
			contextualSearch: true,
		},
		announcementBar: {
			id: "improve-docs",
			content:
				`🙏 Please help us improve docs: If you find any errors, don't hesitate to click the "Edit this page" link at bottom.
If you want to contribute, please check out <a target="_blank" href="https://github.com/yazi-rs/yazi-rs.github.io/issues/70">the Tracker issue</a>.`,
		},
	} satisfies Preset.ThemeConfig,

	markdown: {
		format: "mdx",
	},
}

export default config
