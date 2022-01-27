import React from "react";
import CoatOfArms from "../utils/coatOfArms";

const crestWidth = 338.08;
const crestHeight = 248.76;

const fontFamily = "Times New Roman"; // "Liberation Serif" for open source
const titleFontSize = 71;
const titleSpacing = -2.5;
const titleFontWeight = "bold";
const agencyFontSize = 63;
const agencySpacing = -1.5;
const agencyFontWeight = "bold";
const divisionFontSize = 63;
const divisionSpacing = -1.5;
const divisionFontWeight = "normal";
const paddingTopBottom = 25;

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
	crestRef,
}: {
	title: string;
	agency: string;
	division: string;
	svgWidth: string;
	svgHeight: string;
	dark?: boolean;
	orientation?: "stacked" | "inline";
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
					textLength(
						titleArray[0],
						titleSpacing,
						`${titleFontWeight} ${titleFontSize}px ${fontFamily}`
					) + paddingTopBottom
			);
		}


		setMounted(true);
	}, [titleArray, agencyArray, divisionArray, orientation]);

	const viewBoxHeight =
		orientation === "stacked"
			? crestHeight +
			  (title
					? (paddingTopBottom / 2 + titleFontSize) * titleArray.length +
					  ((paddingTopBottom / 2) * (titleArray.length - 1) + 3)
					: 0) +
			  (agency
					? (paddingTopBottom / 2 + agencyFontSize) * agencyArray.length +
					  ((paddingTopBottom / 2) * (agencyArray.length - 1) + 3)
					: 0) +
			  (division
					? agencyFontSize * divisionArray.length + paddingTopBottom
					: 0)
			: crestHeight;

	const calculateViewBox = `0 0 ${viewBoxWidth} ${viewBoxHeight}`;
	const transform =
		orientation === "stacked"
			? `translate(${viewBoxWidth / 2 - crestWidth / 2} 0)`
			: `translate(0 0)`;

	return mounted ? (
		<svg
			viewBox={calculateViewBox}
			version="1.1"
			height={svgHeight}
			width={svgWidth}
			xmlns="http://www.w3.org/2000/svg"
			ref={crestRef}
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
									x={orientation === "stacked" ? "50%" : crestWidth + paddingTopBottom}
									y={
										orientation === "stacked"
											? crestHeight + titleFontSize * (index + 1)
											: ((crestHeight + titleFontSize) / 2) + (titleFontSize * index + 1)
									} // crest height + padding + height of text
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
										x1={0}
										y1={
											crestHeight +
											(agencyFontSize + paddingTopBottom) * (index + 1)
										}
										x2={viewBoxWidth}
										y2={
											crestHeight +
											(agencyFontSize + paddingTopBottom) * (index + 1)
										}
										stroke={dark ? "black" : "white"}
										strokeWidth="2"
									/>
									<text
										key={index}
										x="50%"
										y={
											crestHeight +
											(agencyFontSize + paddingTopBottom) * (index + 1) +
											agencyFontSize
										} // crest height + padding + height of text
										style={{ letterSpacing: agencySpacing }}
										textAnchor="middle"
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
									x="50%"
									y={
										crestHeight +
										(paddingTopBottom / 2 + titleFontSize) * titleArray.length +
										(paddingTopBottom / 2) * (titleArray.length - 1) +
										(paddingTopBottom / 2 + agencyFontSize) *
											agencyArray.length +
										(paddingTopBottom / 2) * (agencyArray.length - 1) +
										paddingTopBottom / 2 +
										agencyFontSize * (index + 1)
									}
									style={{ letterSpacing: titleSpacing }}
									textAnchor="middle"
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
