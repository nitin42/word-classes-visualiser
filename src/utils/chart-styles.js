export const baseStyles = {
  links: {
    stroke: '#E5E7EB',
    strokeWidth: 1,
  },
  nodes: {
    node: {
      name: {
        stroke: '#4B5563',
        strokeWidth: 1,
      },
    },
    leafNode: {
      name: {
        stroke: '#4B5563',
        strokeWidth: 1,
      },
    },
  },
}

export const textLayout = {
  x: -20,
  y: 20,
}

export const nodeStyles = {
  nounNode: {
    shape: 'circle',
    shapeProps: { r: 10, stroke: '#F472B6', fill: '#F472B6' },
  },
  verbsNameNode: {
    shape: 'circle',
    shapeProps: { r: 10, stroke: '#C4B5FD', fill: '#C4B5FD' },
  },
  verbsNode: {
    shape: 'circle',
    shapeProps: { r: 10, stroke: '#A78BFA', fill: '#A78BFA' },
  },
  conjugateNode: {
    shape: 'circle',
    shapeProps: { r: 10, stroke: '#EDE9FE', fill: '#EDE9FE' },
  },
}

export const leafNodeTextLayout = {
  x: -5,
  y: 20,
}

export const childNodeSvgStyles = {
  shape: 'none',
  shapeProps: {
    width: 20,
    height: 20,
    x: -10,
    y: -10,
  },
}
