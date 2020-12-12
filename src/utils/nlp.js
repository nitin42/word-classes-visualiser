import nlp from 'compromise'
import flattenDeep from 'lodash.flattendeep'

import { noSpecialChars } from './regexp'
import { nodeStyles, textLayout } from './chart-styles'

const conjugateEnum = {
  PastTense: 'Past tense',
  PresentTense: 'Present tense',
  FutureTense: 'Future tense',
  PerfectTense: 'Perfect tense',
  Pluperfect: 'Past perfect tense',
  Infinitive: 'Infinitive',
  Gerund: 'Gerund',
  Actor: 'Actor',
}

const wordClassesEnum = {
  Nouns: 'Nouns',
  Verbs: 'Verbs',
  Adjectives: 'Adjectives',
  Adverbs: 'Adverbs',
  Conjunctions: 'Conjunctions',
  Prepositions: 'Prepositions',
}

export const getConjugateKeyName = (key) => {
  switch (key) {
    case 'PastTense':
      return conjugateEnum['PastTense']
    case 'PresentTense':
      return conjugateEnum['PresentTense']
    case 'FutureTense':
      return conjugateEnum['FutureTense']
    case 'PerfectTense':
      return conjugateEnum['PerfectTense']
    case 'Pluperfect':
      return conjugateEnum['Pluperfect']
    case 'Infinitive':
      return conjugateEnum['Infinitive']
    case 'Gerund':
      return conjugateEnum['Gerund']
    case 'Actor':
      return conjugateEnum['Actor']
    default:
      return ''
  }
}

const getConjugates = (data) => {
  if (data) {
    const conjugates = []

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
                shape: 'none',
                shapeProps: {
                  width: 20,
                  height: 20,
                  x: -10,
                  y: -10,
                },
              },
            },
          ],
        })
      }
    })

    return conjugates
  }
}

export const getNouns = (value) => {
  const nouns = nlp(value).nouns().out('array')

  const data = nouns.map((noun) => {
    return {
      name: `${noun.replace(noSpecialChars, '')}`,
      textLayout: {
        x: 10,
        y: -5,
      },
      nodeSvgShape: {
        shape: 'none',
        shapeProps: {
          width: 20,
          height: 20,
          x: -10,
          y: -10,
        },
      },
    }
  })

  if (data.length) {
    return {
      name: wordClassesEnum.Nouns,
      _collapsed: true,
      children: data,
      textLayout,
      nodeSvgShape: nodeStyles.nounNode,
    }
  }

  return []
}

export const getVerbs = (value) => {
  const verbs = nlp(value).verbs().out('array')
  const rawData = verbs.map((d) => d.split(' '))

  const data = flattenDeep(rawData).map((verb) => {
    /**
     * Attributes include derived forms.
     */
    const conjugateInfo = nlp(verb.replace(noSpecialChars, ''))
      .verbs()
      .conjugate()

    return {
      name: `${verb.replace(noSpecialChars, '')}`,
      textLayout: {
        x: -5,
        y: 20,
      },
      _collapsed: true,
      nodeSvgShape: nodeStyles.verbsNameNode,
      children: [
        {
          name: 'Derived forms',
          _collapsed: true,
          nodeSvgShape: {
            shape: 'circle',
            shapeProps: { r: 10, stroke: '#DDD6FE', fill: '#DDD6FE' },
          },
          textLayout,
          children: getConjugates(conjugateInfo[0]),
        },
      ],
    }
  })

  if (data.length) {
    return {
      name: wordClassesEnum.Verbs,
      children: data,
      textLayout,
      _collapsed: true,
      nodeSvgShape: nodeStyles.verbsNode,
    }
  }

  return []
}

export const getAdjectives = (value) => {
  const adjectives = nlp(value).adjectives().out('array')

  const data = adjectives.map((adjective) => ({
    name: adjective.replace(noSpecialChars, ''),
    textLayout: {
      x: 10,
      y: -5,
    },
    nodeSvgShape: {
      shape: 'none',
      shapeProps: {
        width: 20,
        height: 20,
        x: -10,
        y: -10,
      },
    },
  }))

  if (data.length) {
    return {
      name: wordClassesEnum.Adjectives,
      children: data,
      textLayout,
      _collapsed: true,
      nodeSvgShape: {
        shape: 'circle',
        shapeProps: {
          r: 10,
          stroke: '#6EE7B7',
          fill: '#6EE7B7',
        },
      },
    }
  }

  return []
}

export const getAdverbs = (value) => {
  const adverbs = nlp(value).adverbs().out('array')

  const data = adverbs.map((adverb) => {
    return {
      name: adverb.replace(noSpecialChars, ''),
      textLayout: {
        x: 10,
        y: -5,
      },
      nodeSvgShape: {
        shape: 'none',
        shapeProps: {
          width: 20,
          height: 20,
          x: -10,
          y: -10,
        },
      },
    }
  })

  if (data.length) {
    return {
      name: wordClassesEnum.Adverbs,
      children: data,
      textLayout,
      _collapsed: true,
      nodeSvgShape: {
        shape: 'circle',
        shapeProps: {
          r: 10,
          stroke: '#FCD34D',
          fill: '#FCD34D',
        },
      },
    }
  }

  return []
}

export const getPrepositions = (value) => {
  const prepositions = nlp(value).prepositions().out('array')

  const data = prepositions.map((preposition) => {
    return {
      name: preposition.replace(noSpecialChars, ''),
      textLayout: {
        x: 10,
        y: -5,
      },
      nodeSvgShape: {
        shape: 'none',
        shapeProps: {
          width: 20,
          height: 20,
          x: -10,
          y: -10,
        },
      },
    }
  })

  if (data.length) {
    return {
      name: wordClassesEnum.Prepositions,
      children: data,
      textLayout,
      _collapsed: true,
      nodeSvgShape: {
        shape: 'circle',
        shapeProps: {
          r: 10,
          stroke: '#A78BFA',
          fill: '#A78BFA',
        },
      },
    }
  }

  return []
}

export const getConjunctions = (value) => {
  const conjunctions = nlp(value).conjunctions().out('array')

  const data = conjunctions.map((conjunction) => {
    return {
      name: conjunction.replace(noSpecialChars, ''),
      textLayout: {
        x: 10,
        y: -5,
      },
      nodeSvgShape: {
        shape: 'none',
        shapeProps: {
          width: 20,
          height: 20,
          x: -10,
          y: -10,
        },
      },
    }
  })

  if (data.length) {
    return {
      name: wordClassesEnum.Conjunctions,
      children: data,
      textLayout,
      _collapsed: true,
      nodeSvgShape: {
        shape: 'circle',
        shapeProps: {
          r: 10,
          stroke: '#9D174D',
          fill: '#9D174D',
        },
      },
    }
  }

  return []
}

export const filterWordClassData = (data) => {
  if (!Array.isArray(data)) {
    return [data].filter((d) => Object.keys(d).length !== 0)
  }

  return data.filter((d) => Object.keys(d).length !== 0)
}

export const getWordClassesNames = (data) =>
  filterWordClassData(data).map((wordClassObj) => wordClassObj.name)

export const getWordClassesData = (inputValue, wordClass) => {
  const nouns = getNouns(inputValue)
  const verbs = getVerbs(inputValue)
  const adjectives = getAdjectives(inputValue)
  const adverbs = getAdverbs(inputValue)
  const conjunctions = getConjunctions(inputValue)
  const prepositions = getPrepositions(inputValue)

  const wordClassesNames = getWordClassesNames([
    nouns,
    verbs,
    adjectives,
    adverbs,
    conjunctions,
    prepositions,
  ])

  switch (wordClass) {
    case 'default': {
      return {
        data: filterWordClassData([
          nouns,
          verbs,
          adjectives,
          adverbs,
          conjunctions,
          prepositions,
        ]),
        wordClassesNames,
      }
    }
    case wordClassesEnum.Nouns:
      return {
        data: filterWordClassData(nouns),
        wordClassesNames,
      }
    case wordClassesEnum.Verbs:
      return {
        data: filterWordClassData(verbs),
        wordClassesNames,
      }
    case wordClassesEnum.Adjectives:
      return {
        data: filterWordClassData(adjectives),
        wordClassesNames,
      }
    case wordClassesEnum.Adverbs:
      return {
        data: filterWordClassData(adverbs),
        wordClassesNames,
      }
    case wordClassesEnum.Conjunctions:
      return {
        data: filterWordClassData(conjunctions),
        wordClassesNames,
      }
    case wordClassesEnum.Prepositions:
      return {
        data: filterWordClassData(prepositions),
        wordClassesNames,
      }
    default:
      return
  }
}
