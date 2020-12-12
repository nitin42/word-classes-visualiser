import { createRef, useState } from "react";
import Tree from "react-d3-tree";
import { useLocation } from "react-router-dom";
import { useTranslate } from "../hooks/use-translate";

import { baseStyles } from "../utils/chart-styles";

export const Diagram = () => {
	const {
		state: { chartData },
	} = useLocation();
	const [translate, setTranslate] = useState({});

	const chartContainerRef = createRef();

	useTranslate(chartContainerRef, setTranslate);

	return (
		<div style={{ height: "100vh", width: "100vw" }} ref={chartContainerRef}>
			<Tree translate={translate} data={chartData} styles={baseStyles} />
		</div>
	);
};
