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
      console.log(comments);
      comments.forEach((comment: any) => {
        // debugger;
        if (comment.favorites) {
          console.log(comment);
          listFavorites.push(comment);
        }
        comment.answer.forEach(
          (answers: { favorites: boolean; id: string }, idwww: number) => {
            if (answers.favorites) {
              console.log(idwww);
              listFavorites[listFavorites.length - 1].answer.push(answers);
            }
            if (!answers.favorites) {
              if (
                answers.id ===
                listFavorites[listFavorites.length - 1]?.answer[idwww]?.id
              ) {
                listFavorites[listFavorites.length - 1].answer.splice(idwww, 1);
              }
            }
          }
        );
      });

      console.log(listFavorites);

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
