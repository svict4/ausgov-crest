import type { NextPage } from "next";
import Head from "next/head";

import { Body } from "@ag.ds-next/body";
import { Box } from "@ag.ds-next/box";
import { Content } from "@ag.ds-next/content";
import { Heading } from "@ag.ds-next/heading";
import { Text } from "@ag.ds-next/text";

import GitHubButton from "react-github-btn";

import { Layout } from "../components/Layout";

const About: NextPage = () => {
	return (
		<Layout>
			<Head>
				<title>About</title>
				<meta name="description" content="About ausgov crest" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Content>
				<Box>
					<Body
						css={{
							wordBreak: "break-word",
						}}
					>
						<Heading as="h1">About</Heading>

						<Box css={{ paddingTop: "1rem"}}>
							<GitHubButton
								href="https://github.com/svict4/ausgov-crest"
								data-icon="octicon-star"
								data-size="large"
								data-show-count="true"
								aria-label="Star svict4/ausgov-crest on GitHub"
							>
								Star
							</GitHubButton>
						</Box>

						<Text as={"p"}>
							<b>
								<u>Not</u>
							</b>{" "}
							an official government website (yet). You should look for{" "}
							<b>.gov.au</b> in the URL for official websites.
						</Text>

						<Text as={"p"}>
							This is a simple tool generates Australian Government Branding.
							Similar to the one on{" "}
							<a
								href="https://api.gov.au/service/5bd921345149e90004f326a7"
								target="_blank"
								rel="noreferrer"
							>
								api.gov.au
							</a>{" "}
							except this one generates vectors. Eventually it will also export
							rasterised images targeted for various social media platforms.
						</Text>

						<Text as={"p"}>
							This should prove handy during Machinery of Government changes or
							when setting up new social media accounts for various agencies.
						</Text>

						<Text as={"p"}>
							It is built with NextJS using the new (alpha) design system react
							components by the{" "}
							<a
								href="https://github.com/steelthreads/agds-next"
								target="_blank"
								rel="noreferrer"
							>
								Department of Agriculture
							</a>
							.
						</Text>

						<Text as={"p"}>
							Source code available on GitHub.{" "}
							<a
								href="https://github.com/svict4/ausgov-crest"
								target="_blank"
								rel="noreferrer"
							>
								https://github.com/svict4/ausgov-crest
							</a>
						</Text>

						<Text as={"p"}>
							Feature requests, suggestions and pull requests welcome 🙂
						</Text>
					</Body>
				</Box>
			</Content>
		</Layout>
	);
};

export default About;
