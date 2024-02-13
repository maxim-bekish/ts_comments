import { AnswerData, CommentData } from "./types";
import { CommentDataController } from "./CommentDataController";
import { GenerationHTMLElementsAnswer } from "./Comment";
import { Favorites } from "./Favorites";
export class DOMHandler {
  static clearElement(element: HTMLElement): void {
    element.innerHTML = "";
  }

  static countComments() {
    const commentCount =
      JSON.parse(localStorage.getItem("comments"))?.length || 0;

    document.getElementById("countComments").innerHTML = `(${commentCount})`;
  }

  static appendComment(wrapperComment: HTMLElement, commentHTML: string): void {
    wrapperComment.innerHTML = commentHTML;

    const allComments = document.getElementById("allComments");

    if (allComments) {
      allComments.appendChild(wrapperComment);

      wrapperComment.className = "commentForm";
    }
  }

  static appendAnswer(wrapperAnswer: HTMLElement, comment: CommentData) {
    const wrapperComment = document.getElementById(
      `wrapperComment${comment.id}`
    );

    wrapperComment.appendChild(wrapperAnswer);
    wrapperAnswer.className = "answerForm";

    if (comment?.answer) {
      comment.answer.forEach((answer: AnswerData) => {
        const elementHTMLAnswer = new GenerationHTMLElementsAnswer(
          answer,
          comment.firstName,
          comment.lastName
        ).generateHTMLAnswer();
        const answerElement = document.createElement("div");
        answerElement.className = "answer";
        answerElement.id = `answerElement${answer.id}`;
        answerElement.setAttribute("data-answer", comment.id);
        answerElement.innerHTML = elementHTMLAnswer;
        wrapperAnswer.append(answerElement);
      });
    }
  }





  static counterLike(comments: CommentData[]): void {
    comments.forEach((element: CommentData) => {
      // Для реализации лайков на комментариях
      const counterNumberComment = document.getElementById(
        `counterNumber${element.id}`
      );
      const counterMinusComment = document.getElementById(
        `counterMinus${element.id}`
      );
      const counterPlusComment = document.getElementById(
        `counterPlus${element.id}`
      );
      counterMinusComment.addEventListener("click", function () {
        element.like--;
        counterNumberComment.innerHTML = `${element.like ? element.like : 0}`;

        // Обновление счетчика лайков в реальном времени


        CommentDataController.updateComments(comments);
      });
      // }
      counterPlusComment.addEventListener("click", function () {
        element.like++;

        counterNumberComment.innerHTML = `${element.like}`;


        CommentDataController.updateComments(comments);

        // Обновление счетчика лайков в реальном времени
      });
      // }
    });
  }

  static counterLikeAnswer(comments: CommentData[]): void {
    // Для реализации лайков на ответах
    // debugger;

    comments.forEach((elementTwo) => {
      // debugger;

      if (elementTwo.answer) {
        elementTwo.answer.forEach((el) => {
          let counterNumberAnswer = document.getElementById(
            `counterNumber${el.id}`
          );
          let counterMinusAnswer = document.getElementById(
            `counterMinus${el.id}`
          );
          let counterPlusAnswer = document.getElementById(
            `counterPlus${el.id}`
          );
          if (counterMinusAnswer != null) {
            counterMinusAnswer.addEventListener("click", function () {
              el.like--;
              counterNumberAnswer.innerHTML = `${el.like ? el.like : 0}`;
              CommentDataController.updateComments(comments);
            });
          }
          if (counterPlusAnswer != null) {
            counterPlusAnswer.addEventListener("click", function () {
              el.like++;
              counterNumberAnswer.innerHTML = `${el.like ? el.like : 0}`;
              CommentDataController.updateComments(comments);
            });
          }
        });
      }
    });
  }

  static renderFavorites(event: any, x: Boolean) {
    event.srcElement.innerHTML = `${
      x ? "Удалить из избранного" : "Добавить в избранное"
    }`;
  }

  static updateCounterText(counterText: HTMLElement, value: string): void {
    counterText.innerHTML = value;
  }

  static filter(filter: string): void {
    const optionsList = document.getElementById(
      `${filter}`
    ) as HTMLUListElement;
    const option = document.querySelector(".selected-option");
    if (filter) {
      option.innerHTML = optionsList.textContent;
    } else {
      option.innerHTML = "По дате";
    }
  }
}
