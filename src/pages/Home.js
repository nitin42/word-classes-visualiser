import { useState } from "react";

import { Para } from "../components/Para";
import { Link } from "../components/Link";

export const Home = () => {
	const [value, setValue] = useState("");

	const handleChange = (event) => {
		const value = event.target.value;

		setValue(value);
	};

	return (
		<div className='main-content'>
			<div>
				<h1 className='main-heading'>Grammar Visualiser</h1>
				<Para>
					A small tool to visualise the different{" "}
					<Link href='https://dictionary.cambridge.org/grammar/british-grammar/word-classes-and-phrase-classes'>
						word-classes
					</Link>{" "}
					from the english grammar.
				</Para>
				<Para>
					Using the input text, it generates an interactive tree diagram which
					shows different word-classes, and also some useful information like{" "}
					<Link href='https://en.wikipedia.org/wiki/Grammatical_conjugation'>
						derived forms (conjugates)
					</Link>
					.
				</Para>
				<div className='text-input'>
					<textarea
						id='input-text'
						name='input-text'
						value={value}
						onChange={handleChange}
						placeholder='Enter any text here...'
					/>
				</div>
				<div className='reference-links'>
					<Link href='/reference'>How to read the diagram?</Link>
					<Link href='/glossary'>Glossary</Link>
				</div>
			</div>
			<div className='chart-container'></div>
		</div>
	);
};
