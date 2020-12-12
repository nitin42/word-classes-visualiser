import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";

import { Home } from "./pages/Home";
import { Diagram } from "./pages/Diagram";

import "./index.css";

const App = () => (
	<BrowserRouter>
		<Route exact path='/' component={Home} />
		<Route path='/diagram' component={Diagram} />
	</BrowserRouter>
);

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("root")
);
