import { Answer } from "./Answer";
import { AnswerData, CommentData } from "./types";
import { CommentDataController } from "./CommentDataController";
export class DOMHandler {
  static clearElement(element: HTMLElement): void {
    element.innerHTML = "";
  }
  static countComments() {
    const commentCount =
      JSON.parse(localStorage.getItem("comments"))?.length || 0;

    document.getElementById("countComments").innerHTML = `(${commentCount})`;
  }

  static appendComment(
    wrapperComment: HTMLElement,
    commentHTML: string,
    id: number
  ): void {
    const main = document.getElementById("main");
    const allComments = document.getElementById("allComments");
    wrapperComment.className = "commentForm";
    wrapperComment.id = `wrapperComment${id}`;

    // Заполняем созданный элемент HTML-кодом комментария
    wrapperComment.innerHTML = commentHTML;

    main.append(allComments);
  }
  static appendAnswer(
    wrapperComment: HTMLElement,
    generateHTMLAnswer: string,
    answer: AnswerData
  ) {
    const answerElement = document.createElement("div");
    answerElement.className = "answer";
    answerElement.id = `answerElement${answer}`;
    answerElement.innerHTML = generateHTMLAnswer;

    //  Добавляем обработчики событий для лайков на новый ответ

    // const counterMinusAnswer = answerElement.querySelector(
    //   `#counterMinus${answer}`
    // );
    // const counterPlusAnswer = answerElement.querySelector(
    //   `#counterPlus${answer}`
    // );
    // const counterNumberAnswer = answerElement.querySelector(
    //   `#counterNumber${answer}`
    // );

    wrapperComment.append(answerElement);
  }

  static counterLike(comments: CommentData[]): void {
    comments.forEach((element: any) => {
      // Для реализации лайков на комментариях
      const counterNumberComment = document.getElementById(
        `counterNumber${element.data.id}`
      );
      const counterMinusComment = document.getElementById(
        `counterMinus${element.data.id}`
      );
      const counterPlusComment = document.getElementById(
        `counterPlus${element.data.id}`
      );

      counterNumberComment.innerHTML = `${element.like}`;

      counterMinusComment.addEventListener("click", function () {
        element.like--;

        counterNumberComment.innerHTML = `${element.like ? element.like : 0}`;
        CommentDataController.updateComments(comments);
        // Обновление счетчика лайков в реальном времени
        const commentInstance = comments.find(
          (comment) => comment.data.id === element.data.id
        );
        if (commentInstance && commentInstance.updateLikeComment) {
          commentInstance.updateLikeComment(element.like);
        }
      });

      counterPlusComment.addEventListener("click", function () {
        element.like++;

        counterNumberComment.innerHTML = `${element.like}`;
        CommentDataController.updateComments(comments);
        // Обновление счетчика лайков в реальном времени
        const commentInstance = comments.find(
          (comment) => comment.data.id === element.data.id
        );
        if (commentInstance && commentInstance.updateLikeComment) {
          commentInstance.updateLikeComment(element.like);
        }
      });

      if (element.answers) {
        element.answers.forEach((el: AnswerData) => {
          // Для реализации лайков на ответах
          let counterNumberAnswer = document.getElementById(
            `counterNumber${el.id}`
          );

          let counterMinusAnswer = document.getElementById(
            `counterMinus${el.id}`
          );
          let counterPlusAnswer = document.getElementById(
            `counterPlus${el.id}`
          );

          counterMinusAnswer.addEventListener("click", function () {
            el.like--;

            counterNumberAnswer.innerHTML = `${el.like ? el.like : 0}`;
            CommentDataController.updateComments(comments);

            // Обновление счетчика лайков в реальном времени
            const commentInstance = comments.find(
              (comment) => comment.data.id === element.data.id
            );
            if (commentInstance && commentInstance.updateLikeAnswer) {
              commentInstance.updateLikeAnswer(element.like);
            }
          });
          counterPlusAnswer.addEventListener("click", function () {
            el.like++;

            counterNumberAnswer.innerHTML = `${el.like ? el.like : 0}`;
            CommentDataController.updateComments(comments);

            // Обновление счетчика лайков в реальном времени
            const commentInstance = comments.find(
              (comment) => comment.data.id === element.data.id
            );
            if (commentInstance && commentInstance.updateLikeAnswer) {
              commentInstance.updateLikeAnswer(element.like);
            }
          });
        });
      }
    });
  }

  static updateCounterText(counterText: HTMLElement, value: string): void {
    counterText.innerHTML = value;
  }
}
