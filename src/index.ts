import "./sass/_style.scss";
import "./sass/_all.scss";

import { App } from "./modules/App";

const app = new App();
app.start();




// import { CommentSystem } from "./test/CommentsSystem";

// const commentSystem = new CommentSystem();
// commentSystem.addComment("e333");
// commentSystem.addComment("hello");
// const commentsContainer = document.getElementById("allComments");

// if (commentsContainer) {
//   commentsContainer.innerHTML = commentSystem.renderComments();
//   commentSystem.addEvents();
// }

// const menuFavorites = document.getElementsByClassName("menu_favorites")[0];
// const menu_comments = document.getElementsByClassName("menu_comments")[0];

// menuFavorites.addEventListener("click", () => {
//   commentSystem.showFavorites();
//   menuFavorites.classList.add("active-menu");
//   menu_comments.classList.remove("active-menu");
// });

// menu_comments.addEventListener("click", () => {
//   commentSystem.showAll();
//   menuFavorites.classList.remove("active-menu");
//   menu_comments.classList.add("active-menu");
// });
