import { App } from "./App";
import { CommentDataController } from "./CommentDataController";

// export class Favorites {
//   // static favorites() {
//   //   const rrr = document.querySelector(".menu_favorites");

//   //   const re = new App();

//   //   const allComments = CommentDataController.getComments();
//   //   const favoriteComments = allComments.filter((comment) => comment.favorites);

//   //   rrr.addEventListener("click", function () {
//   //     const x = localStorage.getItem("favorites");
//   //     if (x === "false" || x === null) {
//   //       localStorage.setItem("favorites", "true");
//   //       re.renderComments(favoriteComments);
//   //     }
//   //     if (x === "true") {
//   //       localStorage.setItem("favorites", "false");
//   //       re.renderComments(allComments);
//   //     }
//   //   });
//   // }

//   static favorites() {
//     const rrr = document.querySelector(".menu_favorites");

//     rrr.addEventListener("click", function () {
//       const x = localStorage.getItem("favorites");

//       if (x === "false" || x === null) {
//         localStorage.setItem("favorites", "true");
//       } else if (x === "true") {
//         localStorage.setItem("favorites", "false");
//       }

//       // Получаем все комментарии
//       const allComments = CommentDataController.getComments();

//       // Фильтруем только избранные комментарии
//       const favoriteComments = allComments.filter(
//         (comment) => comment.favorites
//       );

//       // После того как мы обновили состояние избранного в localStorage,
//       // мы должны вызвать метод renderComments из класса App,
//       // передав только избранные комментарии для отрисовки.
//       const app = new App();
//       app.renderComments(favoriteComments);
//     });
//   }
// }
