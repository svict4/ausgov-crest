import { useEffect } from "react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { Core } from "@ag.ds-next/core";
import { palette } from "@ag.ds-next/ag-branding";
import "../styles/globals.css";
import * as gtag from "../lib/gtag";

import { LinkComponent } from "../components/LinkComponent";

function MyApp({ Component, pageProps }: AppProps) {
	const router = useRouter();

	useEffect(() => {
		const handleRouteChange = (url: URL) => {
			if (process.env.NODE_ENV === "production") gtag.pageview(url);
		};
		router.events.on("routeChangeComplete", handleRouteChange);
		return () => {
			router.events.off("routeChangeComplete", handleRouteChange);
		};
	}, [router.events]);

	return (
		<Core palette={palette} linkComponent={LinkComponent}>
			<Component {...pageProps} />
		</Core>
	);
}

export default MyApp;
