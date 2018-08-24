import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
//import App from "./routerPractice/App";
import App from "./App";

import { BrowserRouter } from "react-router-dom";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

/*setTimeout(() => {
  ReactDOM.unmountComponentAtNode(document.getElementById("root2")); // our root2 div component will unmount from screen after 1 sec
}, 10000);*/

registerServiceWorker();
