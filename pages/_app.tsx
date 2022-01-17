import type { AppProps } from 'next/app';
import '../styles/globals.css'

import { Core } from '@ag.ds-next/core';
import { palette } from '@ag.ds-next/ag-branding';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Core palette={palette}>
			<Component {...pageProps} />
		</Core>
	);
}

export default MyApp;
