import { App } from "./App";
import { CommentDataController } from "./CommentDataController";

export class Favorites {
  static favorites() {
    const rrr = document.querySelector(".menu_favorites");

    rrr.addEventListener("click", function () {
      const x = localStorage.getItem("favorites");
      console.log(123);
      if (x === "false" || x === null) {
        localStorage.setItem("favorites", "true");
      } else if (x === "true") {
        localStorage.setItem("favorites", "false");
      }
    });
  }

  static funrend() {
    // Получаем все комментарии
    const comments = CommentDataController.getComments();

    const listFavorites: any = [];
    // Фильтруем только избранные комментарии
    comments.forEach((comment: any) => {
      if (comment.favorites) {
        listFavorites.push(comment);
      }
      comment.answer.forEach((answers: { favorites: any }) => {
        if (answers.favorites) {
          listFavorites.push(answers);
        }
      });
    });
    console.log(listFavorites);
    // После того как мы обновили состояние избранного в localStorage,
    // мы должны вызвать метод renderComments из класса App,
    // передав только избранные комментарии для отрисовки.
    // const app = new App();
    // app.renderComments(listFavorites);
  }
}
