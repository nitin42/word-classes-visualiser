export const baseStyles = {
	links: {
		stroke: "#9CA3AF",
		strokeWidth: 1,
	},
	nodes: {
		node: {
			circle: {
				stroke: "#6B7280",
				strokeWidth: 1,
			},
			name: {
				stroke: "#6B7280",
				strokeWidth: 1,
			},
		},
		leafNode: {
			circle: {
				stroke: "#6B7280",
				strokeWidth: 1,
			},
			name: {
				stroke: "#6B7280",
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
