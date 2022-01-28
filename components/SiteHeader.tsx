import Logo from "../public/ausgov-crest--light.svg";
import { Stack } from "@ag.ds-next/box";
import { Header } from "@ag.ds-next/header";
import { MainNav } from "@ag.ds-next/main-nav";

import { useRouter } from "next/router";

const NAV_LINKS = [
	{ label: "Home", href: "/" },
	{ label: "About", href: "/about" },
];

export const SiteHeader = () => {
	const router = useRouter();

	return (
		<Stack>
			<Header
				variant="dark"
				logo={<Logo />}
				heading="Crest Generator"
				subline="Unofficial"
			/>

			<MainNav
				variant="darkAlt"
				links={NAV_LINKS}
				activePath={router.asPath}
				secondaryLinks={[
					{ label: "GitHub", href: "https://github.com/svict4/ausgov-crest" },
				]}
			/>
		</Stack>
	);
};
