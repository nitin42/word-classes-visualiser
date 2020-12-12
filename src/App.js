import { createRef, useState } from 'react'

import { Para } from './components/Para'
import { Link } from './components/Link'

import { useTranslate } from './hooks/use-translate'
import { getWordClassesData } from './utils/nlp'
import { GraphTools } from './components/GraphTools'
import { TreeGraph } from './components/TreeGraph'
import { TextInput } from './components/TextInput'

const defaultChartData = {
  name: 'Input',
  textLayout: {
    x: -20,
    y: -30,
  },
  nodeSvgShape: {
    shape: 'circle',
    shapeProps: {
      r: 10,
      stroke: '#D1D5DB',
      fill: '#D1D5DB',
    },
  },
}

export const App = () => {
  /**
   * State for storing the user input text value
   */
  const [value, setValue] = useState('')
  /**
   * State for storing the coordinates to translate the Graph
   * to the center of the container
   */
  const [translate, setTranslate] = useState({})
  /**
   * State for storing the data about the word classes
   */
  const [chartData, setChartData] = useState(defaultChartData)
  /**
   * State for the currently selected word class from the dropdown
   */
  const [selectedWordClass, setSelectedWordClass] = useState('default')
  /**
   * State for listing all the names of word classes extracted from
   * the user input in the dropdown
   */
  const [wordClassesNames, setWordClassesNames] = useState([])

  const chartContainerRef = createRef(null)

  const handleChange = (event) => {
    const inputValue = event.target.value
    const { data, wordClassesNames: names } = getWordClassesData(
      inputValue,
      selectedWordClass
    )

    setValue(inputValue)
    setChartData({ ...chartData, children: data })
    setWordClassesNames(names)
  }

  const handleWordClassesDropdown = (event) => {
    const selectedWordClasses = event.target.value
    const { data, wordClassesNames: names } = getWordClassesData(
      value,
      selectedWordClasses
    )

    setSelectedWordClass(selectedWordClasses)
    setChartData({ ...chartData, children: data })
    setWordClassesNames(names)
  }

  useTranslate(chartContainerRef, setTranslate)

  return (
    <>
      <div className="main-content">
        <div>
          <h1 className="main-heading">Word classes visualiser</h1>

          <h2>What is it?</h2>
          <Para>
            A small tool based on{' '}
            <Link href="https://github.com/spencermountain/compromise">
              Compromise
            </Link>{' '}
            to visualise the different{' '}
            <Link href="https://dictionary.cambridge.org/grammar/british-grammar/word-classes-and-phrase-classes">
              word classes
            </Link>{' '}
            from the english grammar.
          </Para>

          <Para>To get started, enter any text below.</Para>
          <TextInput value={value} handleChange={handleChange} />

          <h2>How does it work?</h2>
          <Para>
            Using the input text, it generates an interactive tree graph which
            shows a hierarchy of different word classes, and also some useful
            information like{' '}
            <Link href="https://en.wikipedia.org/wiki/Grammatical_conjugation">
              derived forms (conjugates)
            </Link>
            .
          </Para>

          <h2>About the graph</h2>
          <Para>
            Each and every part of the graph is interactive, which means:
          </Para>

          <ul className="diagram-info">
            <li>You can drag the whole graph anywhere.</li>
            <li>Scroll up/down within the graph container to scale up/down.</li>
            <li>Click on each node.</li>
          </ul>
        </div>

        <div className="chart-container">
          <GraphTools
            handleWordClassesDropdown={handleWordClassesDropdown}
            selectedWordClass={selectedWordClass}
            wordClassesNames={wordClassesNames}
          />
          <TreeGraph
            translate={translate}
            chartData={chartData}
            chartContainerRef={chartContainerRef}
          />
        </div>
      </div>

      <footer className="footer-text">
        <p>© {new Date().getFullYear()} Nitin Tulswani All Rights Reserved</p>
      </footer>
    </>
  )
}
