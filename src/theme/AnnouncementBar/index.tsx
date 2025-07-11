import React from "react"
import { useLocation } from "@docusaurus/router"
import DefaultAnnouncementBar from "@theme-original/AnnouncementBar"

export default function AnnouncementBarWrapper(props) {
	const { pathname } = useLocation()

	// Only show `announcementBar` on /docs or /docs/*
	if (!pathname.startsWith("/docs")) {
		return null
	}
	return <DefaultAnnouncementBar {...props} />
}
