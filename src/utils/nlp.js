import nlp from "compromise";
import flattenDeep from "lodash.flattendeep";

import { noSpecialChars } from "./regexp";
import { nodeStyles, textLayout } from "./chart-styles";

export const getConjugateKeyName = (key) => {
	switch (key) {
		case "PastTense":
			return "Past tense";
		case "PresentTense":
			return "Present tense";
		case "FutureTense":
			return "Future tense";
		case "PerfectTense":
			return "Perfect tense";
		case "Pluperfect":
			return "Past perfect tense";
		case "Infinitive":
			return "Infinitive";
		case "Gerund":
			return "Gerund";
		case "Actor":
			return "Actor";
		default:
			return "";
	}
};

/**
 * 1. Get the data about the derived forms.
 * 2. Check if the data for each derived form is not empty
 * 3. Append the data to the array if it isn't empty.
 */

const getConjugates = (data) => {
	if (data) {
		const conjugates = [];

		Object.keys(data).forEach((key) => {
			if (data[key].length) {
				conjugates.push({
					name: getConjugateKeyName(key),
					nodeSvgShape: nodeStyles.conjugateNode,
					_collapsed: true,
					textLayout,
					children: [
						{
							name: data[key],
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
				});
			}
		});

		return conjugates;
	}
};

export const getNouns = (value) => {
	const nouns = nlp(value).nouns().out("array");

	const data = nouns.map((noun) => {
		return {
			name: `${noun.replace(noSpecialChars, "")}`,
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
			name: "Nouns",
			_collapsed: true,
			children: data,
			textLayout,
			nodeSvgShape: nodeStyles.nounNode,
		};
	}

	return [];
};

export const getVerbs = (value) => {
	const verbs = nlp(value).verbs().out("array");
	const rawData = verbs.map((d) => d.split(" "));

	const data = flattenDeep(rawData).map((verb) => {
		/**
		 * Attributes include derived forms.
		 */
		const conjugateInfo = nlp(verb.replace(noSpecialChars, ""))
			.verbs()
			.conjugate();

		return {
			name: `${verb.replace(noSpecialChars, "")}`,
			textLayout: {
				x: -5,
				y: 20,
			},
			_collapsed: true,
			nodeSvgShape: nodeStyles.verbsNameNode,
			children: [
				{
					name: "Derived forms",
					_collapsed: true,
					nodeSvgShape: {
						shape: "circle",
						shapeProps: { r: 10, stroke: "#DDD6FE", fill: "#DDD6FE" },
					},
					textLayout,
					children: getConjugates(conjugateInfo[0]),
				},
			],
		};
	});

	if (data.length) {
		return {
			name: "Verbs",
			children: data,
			textLayout,
			_collapsed: true,
			nodeSvgShape: nodeStyles.verbsNode,
		};
	}

	return [];
};

export const getAdjectives = (value) => {
	const adjectives = nlp(value).adjectives().out("array");

	const data = adjectives.map((adjective) => ({
		name: adjective.replace(noSpecialChars, ""),
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
	}));

	if (data.length) {
		return {
			name: "Adjectives",
			children: data,
			textLayout,
			_collapsed: true,
			nodeSvgShape: {
				shape: "circle",
				shapeProps: {
					r: 10,
					stroke: "#6EE7B7",
					fill: "#6EE7B7",
				},
			},
		};
	}

	return [];
};

export const getAdverbs = (value) => {
	const adverbs = nlp(value).adverbs().out("array");

	const data = adverbs.map((adverb) => {
		return {
			name: adverb.replace(noSpecialChars, ""),
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
			name: "Adverb",
			children: data,
			textLayout,
			_collapsed: true,
			nodeSvgShape: {
				shape: "circle",
				shapeProps: {
					r: 10,
					stroke: "#FCD34D",
					fill: "#FCD34D",
				},
			},
		};
	}

	return [];
};

export const getPrepositions = (value) => {
	const prepositions = nlp(value).prepositions().out("array");

	const data = prepositions.map((preposition) => {
		return {
			name: preposition.replace(noSpecialChars, ""),
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
			name: "Prepositions",
			children: data,
			textLayout,
			_collapsed: true,
			nodeSvgShape: {
				shape: "circle",
				shapeProps: {
					r: 10,
					stroke: "#A78BFA",
					fill: "#A78BFA",
				},
			},
		};
	}

	return [];
};

export const getConjunctions = (value) => {
	const conjunctions = nlp(value).conjunctions().out("array");

	const data = conjunctions.map((conjunction) => {
		return {
			name: conjunction.replace(noSpecialChars, ""),
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
			name: "Conjunctions",
			children: data,
			textLayout,
			_collapsed: true,
			nodeSvgShape: {
				shape: "circle",
				shapeProps: {
					r: 10,
					stroke: "#9D174D",
					fill: "#9D174D",
				},
			},
		};
	}

	return [];
};
