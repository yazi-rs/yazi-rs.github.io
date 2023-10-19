import React from "react"
import NotFound from "@theme-original/NotFound"
import { useEffect } from "react"

export default function NotFoundWrapper(props) {
	useEffect(() => {
		if (location.href.includes("/docs")) {
			location.href = location.href.replace("/docs", "")
		}
	}, [])

	return <NotFound {...props} />
}
