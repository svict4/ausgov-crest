import type { NextPage } from 'next';
import React from 'react';

import { Body } from '@ag.ds-next/body';
import { Content } from '@ag.ds-next/content';

import { Layout } from '../components/Layout';
import { Crest } from '../components/Crest';

const Home: NextPage = () => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const crestRef = React.useRef<any>();
	const [inputValues, setInputValues] = React.useState({
		title: 'Australian Government',
		agency: '',
		division: '',
	});
	const [SVGHeight, setSVGHeight] = React.useState(350);

	const saveSvg = () => {
		const svg = crestRef.current;
		const metadata = `<metadata>
		  <rdf:RDF
			   xmlns:rdf = "http://www.w3.org/1999/02/22-rdf-syntax-ns#"
			   xmlns:rdfs = "http://www.w3.org/2000/01/rdf-schema#"
			   xmlns:dc = "http://purl.org/dc/elements/1.1/" >
			<rdf:Description about="https://simonvictory.com/aus-crest-generator/"
				 dc:title="${inputValues.title} ${inputValues.agency} ${inputValues.division}"
				 dc:description="Australian Government Coat of Arms"
				 dc:publisher="Australian Government"
				 dc:rightsHolder="Australian Government Department of the Prime Minister and Cabinet, Honours and Symbols Section"
				 dc:source="https://simonvictory.com/aus-crest-generator/"
				 dc:created="${new Date().toISOString()}"
				 dc:format="image/svg+xml"
				 dc:language="en" >
			  <dc:creator>
				<rdf:Bag>
				  <rdf:li>Australian Government</rdf:li>
				  <rdf:li>Simon Victory</rdf:li>
				</rdf:Bag>
			  </dc:creator>
			</rdf:Description>
		  </rdf:RDF>
		</metadata>`;

		svg.insertAdjacentHTML('afterbegin', metadata);

		const svgBlob = new Blob([svg.outerHTML], {
			type: 'image/svg+xml;charset=utf-8',
		});

		const svgUrl = URL.createObjectURL(svgBlob);
		const downloadLink = document.createElement('a');
		downloadLink.href = svgUrl;
		downloadLink.download = `${inputValues.title}-${inputValues.agency}-${inputValues.division}-AusGov_Crest.svg`;
		document.body.appendChild(downloadLink);
		downloadLink.click();
		document.body.removeChild(downloadLink);

		setTimeout(() => URL.revokeObjectURL(svgUrl), 5000);
	};

	return (
		<Layout>
			<Body>
				<Content spacing="large">
					<p>
						This tool generates Australian Government Branding vectors
						consistent with the guidelines published by the{' '}
						<a href="https://www.dta.gov.au/help-and-advice/guides-and-tools/requirements-australian-government-websites/branding">
							Digital Transformation Agency
						</a>{' '}
						and the{' '}
						<a href="https://www.pmc.gov.au/resource-centre/government/australian-government-branding-guidelines-use-australian-government-logo-australian-government-departments-and-agencies">
							Department of the Prime Minister and Cabinet
						</a>
						.
					</p>
				</Content>
				<Content spacing="large" background="shade">
					<div className="flex flex-wrap -mx-3 overflow-hidden items-center">
						<div className="my-3 px-3 w-full overflow-hidden xl:w-1/4">
							<div className="w-full max-w-md mr-auto ml-auto">

							<div className="bg-white rounded-lg border border-gray-200 text-gray-900 text-sm font-medium">
									<button
										onClick={() =>
											setInputValues({
												title: '',
												agency: '',
												division: '',
											})
										}
										className="block px-4 py-2 border-b border-gray-200 w-full rounded-t-lg hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 cursor-pointer"
									>
										Coat of Arms only
									</button>
								</div>
								<div className="bg-white rounded-lg border border-gray-200 text-gray-900 text-sm font-medium mt-1">
									<button
										onClick={() =>
											setInputValues({
												title: 'Australian Government',
												agency: 'Department of Social Services',
												division: '',
											})
										}
										className="block px-4 py-2 border-b border-gray-200 w-full rounded-t-lg hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 cursor-pointer"
									>
										Single Agency
									</button>
									<button
										onClick={() =>
											setInputValues({
												title: 'Australian Government',
												agency:
													"Department of Health; Department of Foreign Affairs and Trade; Attorney-General's Department",
												division: '',
											})
										}
										className="block px-4 py-2 border-b border-gray-200 w-full hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 cursor-pointer"
									>
										Multiple Agencies
									</button>
									<button
										onClick={() =>
											setInputValues({
												title: 'An Australian Government Initiative',
												agency: '',
												division: '',
											})
										}
										className="block px-4 py-2 border-b border-gray-200 w-full hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 cursor-pointer"
									>
										An Australian Government Initiative
									</button>

									<button
										onClick={() =>
											setInputValues({
												title: 'Australian Government',
												agency: 'Department of Industry and Science',
												division: 'Office of the Chief Economist',
											})
										}
										className="block px-4 py-2 border-b border-gray-200 w-full hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 cursor-pointer"
									>
										Single Agency with Hierarchy
									</button>

									<button
										onClick={() =>
											setInputValues({
												title: 'Australian Government',
												agency: 'Australian Quarantine and Inspection Service',
												division: '',
											})
										}
										className="block px-4 py-2 border-b border-gray-200 w-full hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 cursor-pointer"
									>
										Single Agency with Distinct Branding
									</button>
								</div>
								<div className="bg-white rounded-lg border border-gray-200 text-gray-900 text-sm font-medium mt-1">
									<button
										onClick={() =>
											setInputValues({
												title: 'Australian High Commission',
												agency: 'United Kingdom',
												division: '',
											})
										}
										className="block px-4 py-2 border-b border-gray-200 w-full rounded-t-lg hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 cursor-pointer"
									>
										Australian High Commission
									</button>
									<button
										onClick={() =>
											setInputValues({
												title: 'Australian Embassy',
												agency: 'Thailand',
												division: '',
											})
										}
										className="block px-4 py-2 border-b border-gray-200 w-full hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 cursor-pointer"
									>
										Australian Embassy
									</button>
									<button
										onClick={() =>
											setInputValues({
												title: 'Australian Consulate-General',
												agency: 'Ho Chi Minh City, Vietnam',
												division: '',
											})
										}
										className="block px-4 py-2 border-b border-gray-200 w-full hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 cursor-pointer"
									>
										Australian Consulate
									</button>
								</div>
								<div className="bg-white rounded-lg border border-gray-200 text-gray-900 text-sm font-medium mt-1">
									<button
										onClick={() =>
											setInputValues({
												title: 'PRIME MINISTER',
												agency: '',
												division: '',
											})
										}
										className="block px-4 py-2 border-b border-gray-200 w-full hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 cursor-pointer"
									>
										Prime Minister
									</button>

									<button
										onClick={() =>
											setInputValues({
												title: 'OFFICE OF THE PRIME MINISTER',
												agency: '',
												division: '',
											})
										}
										className="block px-4 py-2 border-b border-gray-200 w-full hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 cursor-pointer"
									>
										Office of the PM
									</button>

									<button
										onClick={() =>
											setInputValues({
												title: 'OFFICE OF THE PRIME MINISTER;CHIEF OF STAFF',
												agency: '',
												division: '',
											})
										}
										className="block px-4 py-2 border-b border-gray-200 w-full hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 cursor-pointer"
									>
										Multiple Ministers or Offices
									</button>

									<button
										onClick={() =>
											setInputValues({
												title: 'SENATOR GEORGE PEARCE',
												agency: '',
												division: '',
											})
										}
										className="block px-4 py-2 border-b border-gray-200 w-full hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 cursor-pointer"
									>
										Senator
									</button>

									<button
										onClick={() =>
											setInputValues({
												title:
													'THE HONOURABLE KEVIN RUDD AC;26th Prime Minister of Australia',
												agency: '',
												division: '',
											})
										}
										className="block px-4 py-2 border-b border-gray-200 w-full hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 cursor-pointer"
									>
										Past Ministers
									</button>
								</div>
							</div>
						</div>

						<div className="my-3 px-3 w-full overflow-hidden xl:w-1/4">
							<div className="w-full max-w-md mr-auto ml-auto">
								<div className="bg-white shadow rounded-md px-8 py-8">
									<div className="mb-4">
										<label
											className="block text-gray-700 text-sm font-medium mb-2"
											htmlFor="title"
										>
											Title
										</label>
										<textarea
											className="shadow-sm appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-600 text-sm leading-tight focus:outline-none focus:border-indigo-300"
											id="title"
											value={inputValues['title']}
											onChange={(e) =>
												setInputValues({
													...inputValues,
													title: e.target.value,
												})
											}
										/>
									</div>
									<div className="mb-6">
										<label
											className="block text-gray-700 text-sm font-medium mb-2"
											htmlFor="agency"
										>
											Agency
										</label>
										<textarea
											className="shadow-sm appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-600 text-sm leading-tight focus:outline-none focus:border-indigo-300"
											id="agency"
											value={inputValues['agency']}
											disabled={!inputValues.title}
											onChange={(e) =>
												setInputValues({
													...inputValues,
													agency: e.target.value,
												})
											}
										/>
									</div>
									<div className="mb-6">
										<label
											className="block text-gray-700 text-sm font-medium mb-2"
											htmlFor="division"
										>
											Division
										</label>
										<textarea
											className="shadow-sm appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-600 text-sm leading-tight focus:outline-none focus:border-indigo-300"
											id="division"
											value={inputValues['division']}
											disabled={!inputValues.agency}
											onChange={(e) =>
												setInputValues({
													...inputValues,
													division: e.target.value,
												})
											}
										/>
									</div>
									<div className="mb-6">
										<label
											className="block text-gray-700 text-sm font-medium mb-2"
											htmlFor="division"
										>
											SVG Height
										</label>
										<input
											className="shadow-sm appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-600 text-sm leading-tight focus:outline-none focus:border-indigo-300"
											id="division"
											type="number"
											defaultValue="350"
											onChange={(e) => setSVGHeight(Number(e.target.value))}
										/>
									</div>
								</div>
							</div>
						</div>

						<div className="my-3 px-3 w-full overflow-hidden xl:w-1/2">
							<Crest
								svgHeight={SVGHeight.toString()}
								svgWidth="100%"
								title={inputValues.title}
								agency={inputValues.agency}
								division={inputValues.division}
								crestRef={crestRef}
							/>
							<div className="mt-10 flex flex-wrap justify-center">
								<div className="my-5">
									<button
										className="bg-gray-300 margin-top-10 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
										onClick={saveSvg}
									>
										<svg
											className="fill-current w-4 h-4 mr-2"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20"
										>
											<path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
										</svg>
										<span>Download SVG</span>
									</button>
								</div>
							</div>
						</div>
					</div>
				</Content>
			</Body>
		</Layout>
	);
};

export default Home;
