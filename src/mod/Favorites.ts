import { App } from "./App";
import { CommentDataController } from "./CommentDataController";
import { DOMHandler } from "./DOMHandler";
import { AnswerData, CommentData } from "./types";

export class Favorites {
  static updateToggle(): void {
    const rrr = document.querySelector(".menu_favorites");
    const allComments = document.getElementById("allComments");
    rrr.addEventListener("click", () => {
      // Получаем все комментарии
      const comments = CommentDataController.getComments();
      const sort = JSON.parse(localStorage.getItem("sort"));
      if (JSON.parse(localStorage.getItem("favorites"))) {
        localStorage.setItem("favorites", "false");
        DOMHandler.clearElement(allComments);
        App.renderComments(comments);
      } else {
        localStorage.setItem("favorites", "true");
        DOMHandler.clearElement(allComments);
        App.renderComments(sort);
      }
    });
  }

  static updateSort(arrayComments: CommentData[]): void {
    const listFavorites: any = [];
    // Фильтруем только избранные комментарии

    arrayComments.forEach((comment: any) => {
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
    localStorage.setItem("sort", JSON.stringify(listFavorites));
  }

  static toggleFavoritesButton(comments: CommentData[]): void {
    comments.forEach((comment: CommentData) => {
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
          // DOMHandler.counterLike(comments);

          // DOMHandler.counterLikeAnswer(comments);

          CommentDataController.updateComments(comments);
          Favorites.updateSort(comments);
        });
      if (comment.answer) {
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
              // DOMHandler.counterLike(comments);
              // DOMHandler.counterLikeAnswer(comments);

              CommentDataController.updateComments(comments);
              Favorites.updateSort(comments);
            });
        });
      }
    });
  }
}
