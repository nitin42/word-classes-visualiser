import React, { createRef, useEffect, useState } from "react";
import Tree from "react-d3-tree";
import nlp from "compromise";
import chunk from "lodash.chunk";
import flattenDeep from "lodash.flattendeep";

import adjective from "compromise-adjectives";

nlp.extend(adjective); //done!

const nodeColors = {
	noun: "#F472B6",
	verbs: "#A78BFA",
	adverbs: "#FCD34D",
	adjectives: "#6EE7B7",
	prepositions: "#A78BFA",
	conjunctions: "#9D174D",
};

const normaliseConjugateNames = (conjugates) => {
	if (conjugates) {
		console.log({ conjugates });
		return [
			{
				name: "Past tense",
				nodeSvgShape: {
					shape: "circle",
					shapeProps: { r: 10, stroke: "#EDE9FE", fill: "#EDE9FE" },
				},
				children: [
					{
						name: conjugates["PastTense"],
						textLayout: {
							x: 10,
							y: -5,
						},
						nodeSvgShape: {
							shape: "none",
							shapeProps: {
								width: 20,
								height: 20,
								x: -10,
								y: -10,
							},
						},
					},
				],
			},
			{
				name: "Present tense",
				nodeSvgShape: {
					shape: "circle",
					shapeProps: { r: 10, stroke: "#EDE9FE", fill: "#EDE9FE" },
				},
				children: [
					{
						name: conjugates["PresentTense"],
						textLayout: {
							x: 10,
							y: -5,
						},
						nodeSvgShape: {
							shape: "none",
							shapeProps: {
								width: 20,
								height: 20,
								x: -10,
								y: -10,
							},
						},
					},
				],
			},
			{
				name: "Future tense",
				nodeSvgShape: {
					shape: "circle",
					shapeProps: { r: 10, stroke: "#EDE9FE", fill: "#EDE9FE" },
				},
				children: [
					{
						name: conjugates["FutureTense"],
						textLayout: {
							x: 10,
							y: -5,
						},
						nodeSvgShape: {
							shape: "none",
							shapeProps: {
								width: 20,
								height: 20,
								x: -10,
								y: -10,
							},
						},
					},
				],
			},
			{
				name: "Perfect tense",
				nodeSvgShape: {
					shape: "circle",
					shapeProps: { r: 10, stroke: "#EDE9FE", fill: "#EDE9FE" },
				},
				children: [
					{
						name: conjugates["PerfectTense"],
						textLayout: {
							x: 10,
							y: -5,
						},
						nodeSvgShape: {
							shape: "none",
							shapeProps: {
								width: 20,
								height: 20,
								x: -10,
								y: -10,
							},
						},
					},
				],
			},
			{
				name: "Pluperfect",
				nodeSvgShape: {
					shape: "circle",
					shapeProps: { r: 10, stroke: "#EDE9FE", fill: "#EDE9FE" },
				},
				children: [
					{
						name: conjugates["Pluperfect"],
						textLayout: {
							x: 10,
							y: -5,
						},
						nodeSvgShape: {
							shape: "none",
							shapeProps: {
								width: 20,
								height: 20,
								x: -10,
								y: -10,
							},
						},
					},
				],
			},
			{
				name: "Infinitive",
				nodeSvgShape: {
					shape: "circle",
					shapeProps: { r: 10, stroke: "#EDE9FE", fill: "#EDE9FE" },
				},
				children: [
					{
						name: conjugates["Infinitive"],
						textLayout: {
							x: 10,
							y: -5,
						},
						nodeSvgShape: {
							shape: "none",
							shapeProps: {
								width: 20,
								height: 20,
								x: -10,
								y: -10,
							},
						},
					},
				],
			},
			{
				name: "Gerund",
				nodeSvgShape: {
					shape: "circle",
					shapeProps: { r: 10, stroke: "#EDE9FE", fill: "#EDE9FE" },
				},
				children: [
					{
						name: conjugates["Gerund"],
						textLayout: {
							x: 10,
							y: -5,
						},
						nodeSvgShape: {
							shape: "none",
							shapeProps: {
								width: 20,
								height: 20,
								x: -10,
								y: -10,
							},
						},
					},
				],
			},
			{
				name: "Actor",
				nodeSvgShape: {
					shape: "circle",
					shapeProps: { r: 10, stroke: "#EDE9FE", fill: "#EDE9FE" },
				},
				children: [
					{
						name: conjugates["Actor"],
						textLayout: {
							x: 10,
							y: -5,
						},
						nodeSvgShape: {
							shape: "none",
							shapeProps: {
								width: 20,
								height: 20,
								x: -10,
								y: -10,
							},
						},
					},
				],
			},
			// {"Present tense": conjugates["PresentTense"]},
			// {"Future tense": conjugates["FutureTense"]},
			// {"Perfect tense": conjugates["PerfectTense"]},
			// {"Past perfect tense": conjugates["Pluperfect"]},
			// {Infinitive: conjugates["Infinitive"]},
			// {Gerund: conjugates["Gerund"]},
			// {Actor: conjugates["Actor"]}
		];
	}
};

const getVerbs = (testInput) => {
	const verbs = nlp(testInput).verbs().out("array");
	const data = flattenDeep(verbs.map((d) => d.split(" "))).map((verb) => {
		const attrs = nlp(verb.replace(",", "")).verbs().conjugate();

		return {
			name: `${verb.replace(",", "")}`,
			textLayout: {
				x: -5,
				y: 20,
			},
			nodeSvgShape: {
				shape: "circle",
				shapeProps: { r: 10, stroke: "#C4B5FD", fill: "#C4B5FD" },
			},
			children: [
				{
					name: "Derived forms",
					nodeSvgShape: {
						shape: "circle",
						shapeProps: { r: 10, stroke: "#DDD6FE", fill: "#DDD6FE" },
					},
					children: normaliseConjugateNames(attrs[0]),
				},
			],
		};
	});

	if (data.length) {
		return {
			name: "Verbs",
			children: data,
			textLayout: {
				x: -20,
				y: 20,
			},
			nodeSvgShape: {
				shape: "circle",
				shapeProps: { r: 10, stroke: "#A78BFA", fill: "#A78BFA" },
			},
		};
	}

	return [];
};

const getNouns = (value) => {
	const nouns = nlp(value).nouns().out("array");

	const data = nouns.map((noun) => {
		return {
			name: `${noun.replace(",", "")}`,
			textLayout: {
				x: 10,
				y: -5,
			},
			nodeSvgShape: {
				shape: "none",
				shapeProps: {
					width: 20,
					height: 20,
					x: -10,
					y: -10,
				},
			},
		};
	});

	if (data.length) {
		return {
			name: "noun",
			_collapsed: true,
			children: data,
			textLayout: {
				x: -20,
				y: 20,
			},
			nodeSvgShape: {
				shape: "circle",
				shapeProps: { r: 10, stroke: "#F472B6", fill: "#F472B6" },
			},
		};
	}

	return [];
};

const getAdjectives = (testInput) => {
	const adjectives = nlp(testInput).adjectives().out("array");

	const data = adjectives.map((adjective, index) => {
		return {
			name: adjective.replace(",", ""),
		};
	});

	// const chnk = chunk(data, 4).map((d, i) => {
	//   return {
	//     name: i,
	//     _collapsed: true,
	//     children: d
	//   };
	// });

	if (data.length) {
		return {
			name: "Adjective",
			children: data,
			nodeSvgShape: {
				shape: "circle",
				shapeProps: {
					r: 10,
					stroke: nodeColors.adjectives,
					fill: nodeColors.adjectives,
				},
			},
			textLayout: {
				x: -20,
				y: 20,
			},
		};
	}

	return [];
};

const getAdverbs = (testInput) => {
	const adverbs = nlp(testInput).adverbs().out("array");

	const data = adverbs.map((adverb, index) => {
		return {
			name: adverb.replace(",", ""),
		};
	});

	const chnk = chunk(data, 4).map((d, i) => {
		return {
			name: i,
			_collapsed: true,
			children: d,
		};
	});

	if (chnk.length) {
		return {
			name: "Adverb",
			children: chnk,
		};
	}

	return [];
};

const containerStyles = {
	width: "100%",
	height: "100vh",
};

export default function CenteredTree() {
	const [translate, setTranslate] = useState();
	const [value, setValue] = useState("");
	const [data, setData] = useState({});
	const ref = createRef();

	useEffect(() => {
		const dimensions = ref.current.getBoundingClientRect();
		setTranslate({
			x: dimensions.width / 2,
			y: dimensions.height / 2,
		});
	}, []);

	const handleChange = (e) => {
		const value = e.target.value;
		setValue(value);

		let data;

		const n = getNouns(value);
		const v = getVerbs(value);
		const aD = getAdjectives(value);
		const aDv = getAdverbs(value);

		data = [n, v, aD, aDv].filter((d) => {
			return Object.keys(d).length !== 0;
		});

		setData({
			name: "Input",
			children: data,
			textLayout: {
				x: -20,
				y: -30,
			},
		});
	};

	return (
		<div style={containerStyles} ref={ref}>
			<input
				value={value}
				onChange={handleChange}
				style={{
					width: "10rem",
					display: "flex",
					justifyContent: "center",
					padding: "1rem",
					margin: "5rem",
				}}
			/>
			<Tree
				styles={{
					links: {
						stroke: "#E5E7EB",
						strokeWidth: 1,
					},
					nodes: {
						node: {
							name: {
								stroke: "#4B5563",
								strokeWidth: 1,
							},
						},
						leafNode: {
							name: {
								stroke: "#4B5563",
								strokeWidth: 1,
							},
						},
					},
				}}
				data={data}
				translate={translate}
				orientation={"horizontal"}
			/>
			<br />
			<br />
		</div>
	);
}
