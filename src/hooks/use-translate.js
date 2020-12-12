import { useEffect } from 'react'

/**
 * Given a state updater function and chart container ref, it
 * translates the rendered SVG to the middle of the container.
 */
export const useTranslate = (chartContainerRef, setTranslate) => {
  useEffect(() => {
    const dimensions = chartContainerRef.current.getBoundingClientRect()

    setTranslate({
      x: dimensions.width / 2,
      y: dimensions.height / 2,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
