import { App } from "./App";
import { CommentDataController } from "./CommentDataController";
import { DOMHandler } from "./DOMHandler";
import { AnswerData, CommentData } from "./types";

export class Favorites {
  static favorites() {
    const rrr = document.querySelector(".menu_favorites");
    rrr.addEventListener("click", function () {
      Favorites.listFavorites();
    });
  }

  static listFavorites(): void {
    // Получаем все комментарии
    const comments = CommentDataController.getComments();

    const listFavorites: any = [];
    // Фильтруем только избранные комментарии
    console.log(comments);
    comments.forEach((comment: any) => {
      if (comment.favorites) {
        console.log(comment);
        listFavorites.push(comment);
      }
      comment.answer.forEach((answers: { favorites: any }) => {
        if (answers.favorites) {
          console.log(answers);
          listFavorites.push(answers);
        }
      });
    });
    // После того как мы обновили состояние избранного в localStorage,
    // мы должны вызвать метод renderComments из класса App,
    // передав только избранные комментарии для отрисовки.
    const app = new App();
    app.renderComments(listFavorites);
  }
  static toggleFavoritesButton(): void {
    const comments = CommentDataController.getComments();

    comments.forEach((comment: CommentData) => {
      // CommentDataController.updateComments(comments);
      document
        .getElementById(`favorites${comment.id}`)
        .addEventListener("click", function (event) {
          if (comment.favorites) {
            comment.favorites = false;
            DOMHandler.renderFavorites(event, false);
          } else {
            comment.favorites = true;
            DOMHandler.renderFavorites(event, true);
          }
          CommentDataController.updateComments(comments);
        });

      // CommentDataController.updateComments(comments);

      comment.answer.forEach((answers: AnswerData) => {
        document
          .getElementById(`favoritesAnswer${answers.id}`)
          .addEventListener("click", function (event) {
            if (answers.favorites) {
              answers.favorites = false;
              DOMHandler.renderFavorites(event, false);
            } else {
              answers.favorites = true;
              DOMHandler.renderFavorites(event, true);
            }
            CommentDataController.updateComments(comments);
            // DOMHandler.renderFavorites(event);
          });
      });
    });
  }
}
