import "./sass/_style.scss";
import "./sass/_all.scss";

import { User } from "./modules/User";
import { CustomSelect } from "./modules/Filter";
// import { Answer } from "./modules/answer";
document.addEventListener("DOMContentLoaded", () => {
  new CustomSelect();
});

const user = new User();
user.start();
