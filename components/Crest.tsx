import React from "react";
import CoatOfArms from "../utils/coatOfArms";

const crestWidth = 338.08;
const crestHeight = 248.76;

const fontFamily = "Times New Roman"; // "Liberation Serif" for open source
const titleFontSize = 70;
const titleSpacing = -2.5;
const titleFontWeight = "bold";
const agencyFontSize = 60;
const agencySpacing = -1.5;
const agencyFontWeight = "bold";
const divisionFontSize = 58;
const divisionSpacing = -1.5;
const divisionFontWeight = "normal";
const padding = 25;

function textLength(text: string, spacing: number, font: string) {
	const canvas = document.createElement("canvas") as HTMLCanvasElement;
	const context = canvas.getContext("2d") as CanvasRenderingContext2D;
	context.font = font;
	let totalWidth = context.measureText(text).width;

	let length = 0,
		wShorter = 0,
		wChar = 0;

	do {
		text = text.substring(1);

		if (text === "") {
			wShorter = 0;
		} else {
			wShorter = context.measureText(text).width;
		}

		wChar = totalWidth - wShorter;
		length += wChar + spacing;
		totalWidth = wShorter;
	} while (text !== "");

	return length;
}

export const Crest = ({
	title = "Australian Government",
	agency = "",
	division = "",
	svgWidth = "",
	svgHeight = "350",
	dark = true,
	orientation = "stacked",
	hideLines = false,
	crestRef,
}: {
	title: string;
	agency: string;
	division: string;
	svgWidth?: string;
	svgHeight: string;
	dark?: boolean;
	orientation?: "stacked" | "inline";
	hideLines?: boolean;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	crestRef: any;
}) => {
	const [mounted, setMounted] = React.useState(false);
	const [viewBoxWidth, setViewBoxWidth] = React.useState(0);

	const titleArray = title.split(/;|\n/).map((x) => x.trim());
	const agencyArray = agency.split(/;|\n/).map((x) => x.trim());
	const divisionArray = division.split(/;|\n/).map((x) => x.trim());

	React.useEffect(() => {
		if (orientation === "stacked") {
			setViewBoxWidth(
				Math.max(
					crestWidth,
					...titleArray.map((titleTitle) =>
						textLength(
							titleTitle,
							titleSpacing,
							`${titleFontWeight} ${titleFontSize}px ${fontFamily}`
						)
					),
					...agencyArray.map((agencyTitle) =>
						textLength(
							agencyTitle,
							agencySpacing,
							`${agencyFontWeight} ${agencyFontSize}px ${fontFamily}`
						)
					),
					...divisionArray.map((divisionTitle) =>
						textLength(
							divisionTitle,
							divisionSpacing,
							`${divisionFontWeight} ${divisionFontSize}px ${fontFamily}`
						)
					)
				)
			);
		} else {
			setViewBoxWidth(
				crestWidth +
					Math.max(
						...titleArray.map((titleTitle) =>
							textLength(
								titleTitle,
								titleSpacing,
								`${titleFontWeight} ${titleFontSize}px ${fontFamily}`
							)
						),
						...agencyArray.map((agencyTitle) =>
							textLength(
								agencyTitle,
								agencySpacing,
								`${agencyFontWeight} ${agencyFontSize}px ${fontFamily}`
							)
						)
					) +
					padding
			);
		}

		setMounted(true);
	}, [titleArray, agencyArray, divisionArray, orientation]);

	const viewBoxHeight =
		orientation === "stacked"
			? crestHeight +
			  (title
					? (padding / 2 + titleFontSize) * titleArray.length +
					  ((padding / 2) * (titleArray.length - 1) + 3)
					: 0) +
			  (agency
					? (padding / 2 + agencyFontSize) * agencyArray.length +
					  ((padding / 2) * (agencyArray.length - 1) + 3)
					: 0) +
			  (division ? agencyFontSize * divisionArray.length + padding : 0)
			: Math.max(
					crestHeight,
					(crestHeight / 2) + padding + ((agencyFontSize + padding) * agencyArray.length + 1)
			  );

	const transform =
		orientation === "stacked"
			? `translate(${viewBoxWidth / 2 - crestWidth / 2} 0)`
			: `translate(0 0)`;

	return mounted ? (
		<svg
			viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
			version="1.1"
			height={svgHeight}
			width={svgWidth}
			xmlns="http://www.w3.org/2000/svg"
			ref={crestRef}
			css={{ border: "1px solid black" }}
		>
			<g stroke={dark ? "000" : "white"} fill={dark ? "000" : "white"}>
				<g id="crest" transform={transform}>
					<CoatOfArms />
				</g>
				<g>
					{title &&
						titleArray.map(function (item, index) {
							return (
								<text
									key={index}
									x={orientation === "stacked" ? "50%" : crestWidth + padding}
									y={
										orientation === "stacked"
											? crestHeight + titleFontSize * (index + 1)
											: agency
											? (crestHeight + titleFontSize / 2) / 2 - padding + 6
											: (crestHeight + titleFontSize) / 2 +
											  (titleFontSize * index + 1)
									}
									style={{ letterSpacing: titleSpacing }}
									textAnchor={orientation === "stacked" ? "middle" : "right"}
									fontWeight={titleFontWeight}
									fontFamily={fontFamily}
									fontSize={titleFontSize + "px"}
								>
									{item}
								</text>
							);
						})}
					{agency &&
						agencyArray.map(function (item, index) {
							return (
								<React.Fragment key={index}>
									<line
										x1={orientation === "stacked" ? 0 : crestWidth + padding}
										y1={
											orientation === "stacked"
												? crestHeight + (agencyFontSize + padding) * (index + 1)
												: (crestHeight + agencyFontSize) / 2 +
												  ((agencyFontSize + padding) * index +
														(index > 0 ? padding / 2 : 0))
										}
										x2={viewBoxWidth}
										y2={
											orientation === "stacked"
												? crestHeight + (agencyFontSize + padding) * (index + 1)
												: (crestHeight + agencyFontSize) / 2 +
												  ((agencyFontSize + padding) * index +
														(index > 0 ? padding / 2 : 0))
										}
										stroke={dark ? "black" : "white"}
										strokeWidth="2"
										display={hideLines && index > 0 ? "none" : "block"}
									/>
									<text
										key={index}
										x={orientation === "stacked" ? "50%" : crestWidth + padding}
										y={
											orientation === "stacked"
												? crestHeight +
												  (agencyFontSize + padding) * (index + 1) +
												  agencyFontSize
												: agencyFontSize +
												  padding / 2 +
												  (crestHeight + agencyFontSize) / 2 +
												  ((agencyFontSize +
														(hideLines ? padding / 2 : padding)) *
														index +
														1)
										}
										style={{ letterSpacing: agencySpacing }}
										textAnchor={orientation === "stacked" ? "middle" : "right"}
										fontWeight={agencyFontWeight}
										fontFamily={fontFamily}
										fontSize={agencyFontSize + "px"}
									>
										{item}
									</text>
								</React.Fragment>
							);
						})}
					{division &&
						divisionArray.map(function (item, index) {
							return (
								<text
									key={index}
									x={orientation === "stacked" ? "50%" : crestWidth + padding}
									y={
										orientation === "stacked"
											? crestHeight +
											  (agencyFontSize + padding) * (agencyArray.length + 1) +
											  agencyFontSize
											: agencyFontSize +
											  padding / 2 +
											  (crestHeight + agencyFontSize) / 2 +
											  ((agencyFontSize +
													(hideLines ? padding / 2 : padding)) *
													agencyArray.length +
													1) +
											  agencyFontSize * index
									}
									style={{ letterSpacing: titleSpacing }}
									textAnchor={orientation === "stacked" ? "middle" : "right"}
									fontWeight={divisionFontWeight}
									fontFamily={fontFamily}
									fontSize={agencyFontSize + "px"}
								>
									{item}
								</text>
							);
						})}
				</g>
			</g>
		</svg>
	) : null;
};
