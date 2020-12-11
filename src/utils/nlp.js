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
			name: "noun",
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

export const getAdjectives = () => {};

export const getAdverbs = () => {};

export const getPrepositions = () => {};

export const getConjunctions = () => {};
