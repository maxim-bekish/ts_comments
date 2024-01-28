import "./sass/_style.scss";
import "./sass/_all.scss";

import { User } from "./modules/User";
// import { CustomSelect } from "./modules/Filter";

// document.addEventListener("DOMContentLoaded", () => {
//   new CustomSelect();
// });

const user = new User();
user.start();
