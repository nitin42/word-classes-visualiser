import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Home } from "./pages/Home";

import "./index.css";

import { Reference } from "./pages/Reference";
import { Glossary } from "./pages/Glossary";

const App = () => (
	<BrowserRouter>
		<Switch>
			<Route path='/' component={Home} />
			<Route path='/reference' component={Reference} />
			<Route path='/glossary' component={Glossary} />
		</Switch>
	</BrowserRouter>
);

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("root")
);
