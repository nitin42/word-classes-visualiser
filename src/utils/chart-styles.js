export const baseStyles = {
	links: {
		stroke: "#E5E7EB",
		strokeWidth: 1,
	},
	nodes: {
		node: {
			name: {
				stroke: "#4B5563",
				strokeWidth: 1,
			},
		},
		leafNode: {
			name: {
				stroke: "#4B5563",
				strokeWidth: 1,
			},
		},
	},
};

export const baseNodeTextLayout = {
	x: -20,
	y: 20,
};

export const leafNodeTextLayout = {
	x: -5,
	y: 20,
};

export const childNodeSvgStyles = {
	shape: "none",
	shapeProps: {
		width: 20,
		height: 20,
		x: -10,
		y: -10,
	},
};
