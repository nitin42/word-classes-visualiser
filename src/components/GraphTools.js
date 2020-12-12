export const GraphTools = (props) => {
	return (
		<div className='chart-tools'>
			<div className='word-classes-dropdown'>
				<label for='word-classes-select'>Display classes:</label>

				<select
					name='word-classes'
					id='word-classes-select'
					onChange={props.handleWordClassesDropdown}
					value={props.selectedWordClass}
				>
					<option value='default'>Default</option>
					{props.wordClassesNames.map((wordClass) => (
						<option value={wordClass}>{wordClass}</option>
					))}
				</select>
			</div>
		</div>
	);
};
