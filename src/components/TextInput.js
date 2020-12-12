import { MaxWordsWarningMessage } from "./MaxWordsWarningMessage";

export const TextInput = (props) => (
	<>
		<div className='text-input'>
			<textarea
				id='input-text'
				name='input-text'
				value={props.value}
				onChange={props.handleChange}
				placeholder='Type any sentence. For example - I love dancing!'
			/>
			<MaxWordsWarningMessage value={props.value} />
		</div>
	</>
);
