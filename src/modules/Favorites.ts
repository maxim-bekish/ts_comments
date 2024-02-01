import { App } from "./App";
import { CommentDataController } from "./CommentDataController";
import { DOMHandler } from "./DOMHandler";
import { AnswerData, CommentData } from "./types";

export class Favorites {
  static favorites(): void {
    const rrr = document.querySelector(".menu_favorites");
    rrr.addEventListener("click", function () {
      // Получаем все комментарии
      const comments = CommentDataController.getComments();

      const listFavorites: any = [];
      // Фильтруем только избранные комментарии

      comments.forEach((comment: any) => {
        if (comment.favorites) {
          const newComments = { ...comment, answer: [] }; // создаем новый объект с ответами
          listFavorites.push(newComments);
        }
        const tempAnswer = comment.answer;
        tempAnswer.forEach((answers: { favorites: Boolean; id: string }) => {
          if (answers.favorites) {
            listFavorites.push(answers);
          }
        });
      });



      document.getElementById("allComments").innerHTML = "";

      if (JSON.parse(localStorage.getItem("favorites"))) {
        localStorage.setItem("favorites", "false");
        const app = new App();
        app.renderComments(comments);
      } else {
        localStorage.setItem("favorites", "true");
        const app = new App();
        app.renderComments(listFavorites);
      }

      // const app = new App();
      // app.renderComments(listFavorites);
    });
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
