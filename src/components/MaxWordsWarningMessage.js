export const MaxWordsWarningMessage = (props) =>
  props.value.length >= 220 && (
    <p className="description error">
      Note: The tree generated with the input text including more than 250
      characters will render a large number of nodes making the diagram
      difficult to read and understand. Use short sentences instead.
    </p>
  )
