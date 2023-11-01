import NotFound from "@theme-original/NotFound"
import { useLayoutEffect } from "react"

export default function NotFoundWrapper(props) {
	useLayoutEffect(() => {
		if (location.href.includes("/docs")) {
			location.href = location.href.replace("/docs", "")
		}
	}, [])

	return <NotFound {...props} />
}
