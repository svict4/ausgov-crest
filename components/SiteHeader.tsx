import type { ReactNode } from 'react';
// import { Logo } from '@ag.ds-next/ag-branding';
import Logo from '../public/ausgov-crest--light.svg';
import { Stack } from '@ag.ds-next/box';
import { Header } from '@ag.ds-next/header';
import { MainNav } from '@ag.ds-next/main-nav';

import { useRouter } from 'next/router';
import Link from 'next/link';

const NAV_LINKS = [{ label: 'Home', href: '/' }];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const NavLink = ({ href, label }: { href: string; label: ReactNode }) => (
	<Link href={href}>
		<a>{label}</a>
	</Link>
);

export const SiteHeader = () => {
	const router = useRouter();

	return (
		<Stack>
			<Header variant="dark" logo={<Logo />} heading="Crest Generator" />

			<MainNav
				variant="darkAlt"
				links={NAV_LINKS}
				activePath={router.asPath}
				// linkComponent={NavLink}
			/>
		</Stack>
	);
};
