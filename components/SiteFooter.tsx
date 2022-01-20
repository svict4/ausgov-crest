import { Footer as AgDsFooter } from "@ag.ds-next/footer";
import { Flex } from "@ag.ds-next/box";
import { TextLink } from "@ag.ds-next/text-link";

const footerLinks = [
	{ title: "Home", href: "/" },
	{ title: "About", href: "/about" },
];

export const SiteFooter = () => {
	return (
		<AgDsFooter>
			<Flex gap={1}>
				{footerLinks.map(({ title, href }) => (
					<TextLink key={href} href={href}>
						{title}
					</TextLink>
				))}
				<span>
					With the exception of the Commonwealth Coat of Arms and where
					otherwise noted, this work is licensed under the CC BY 4.0 license.
				</span>
			</Flex>
		</AgDsFooter>
	);
};
