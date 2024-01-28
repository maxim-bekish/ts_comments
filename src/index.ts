import "./sass/_style.scss";
import "./sass/_all.scss";

import { App } from "./modules/App";
// import { CustomSelect } from "./modules/Filter";

// document.("DOMContentLoaded", () => {
//   new CustomSelect();
// });

const app = new App();
app.start();
