import Tree from 'react-d3-tree'

import { baseStyles } from '../utils/chart-styles'

export const TreeGraph = (props) => {
  return (
    <div className="tree-graph" ref={props.chartContainerRef}>
      <Tree
        translate={props.translate}
        data={props.chartData}
        styles={baseStyles}
      />
    </div>
  )
}
