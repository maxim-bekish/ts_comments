import { AnswerData, CommentData } from "./types";
import { CommentDataController } from "./CommentDataController";
import { GenerationHTMLElementsAnswer } from "./Comment";
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

  static appendAnswer(
    // wrapperComment: HTMLElement,
    answerData: AnswerData,
    comment: CommentData
  ) {
    const dom = new GenerationHTMLElementsAnswer(
      answerData,
      comment.firstName,
      comment.lastName
    ).generateHTMLAnswer();
    const wrapperComment = document.getElementById(
      `wrapperComment${comment.id}`
    );

    const answerElement = document.createElement("div");
    answerElement.className = "answer";
    answerElement.id = `answerElement${comment.id}`;
    answerElement.setAttribute("data-answer", answerData.id);
    answerElement.innerHTML = dom;
    if (wrapperComment != null) {
      wrapperComment.append(answerElement);
    }

    // arrayAnswer.forEach((answer: any) => {
    //   const dom = new GenerationHTMLElementsAnswer(answer).generateHTMLAnswer();
    //   if (!document.getElementById(`answerElement${answer.id}`)) {
    //     DOMHandler.appendAnswer(wrapperComment, dom, answer.id);
    //   }
    // });
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
      // if (counterMinusComment != null) {
      counterMinusComment.addEventListener("click", function () {
        // debugger
        element.like--;

        counterNumberComment.innerHTML = `${element.like ? element.like : 0}`;
        CommentDataController.updateComments(comments);
        // Обновление счетчика лайков в реальном времени
        const commentInstance = comments.find(
          (comment) => comment.id === element.id
        );
        if (commentInstance && commentInstance.updateLikeComment) {
          commentInstance.updateLikeComment(element.like);
        }
      });
      // }
      // if (counterPlusComment != null) {
      counterPlusComment.addEventListener("click", function () {
        element.like++;

        counterNumberComment.innerHTML = `${element.like}`;
        CommentDataController.updateComments(comments);
        // Обновление счетчика лайков в реальном времени
        const commentInstance = comments.find(
          (comment) => comment.id === element.id
        );
        if (commentInstance && commentInstance.updateLikeComment) {
          commentInstance.updateLikeComment(element.like);
        }
      });
      // }
    });
  }

  static counterLikeAnswer(element: CommentData[]): void {
    // Для реализации лайков на ответах
    // debugger;
    element.forEach((elementTwo) => {
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
              CommentDataController.updateComments(element);
            });
          }
          if (counterPlusAnswer != null) {
            counterPlusAnswer.addEventListener("click", function () {
              el.like++;
              counterNumberAnswer.innerHTML = `${el.like ? el.like : 0}`;
              CommentDataController.updateComments(element);
            });
          }
        });
      }
    });
  }

  static renderFavorites(event: any, x: Boolean) {
    console.log(
      (event.srcElement.innerHTML = `${
        x ? "Удалить из избранного" : "Добавить в избранное"
      }`)
    );
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
