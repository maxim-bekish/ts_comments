import { AnswerData, CommentData } from "./types";
import { CommentDataController } from "./CommentDataController";
import { Comment } from "./Comment";

export class Answer {
  static submit(comments: CommentData[], userData: any): void {
    try {
      comments.forEach((element) => {
        const wrapperComment = document.getElementById(
          `wrapperComment${element.data.id}`
        );

        const answerWrapper = document.createElement("div");

        const input = document.createElement("input");
        const button = document.createElement("button");

        input.type = "text";
        button.innerHTML = "submit";

        button.addEventListener("click", () => {
          this.handleButtonClick(
            element,
            input,
            answerWrapper,

            comments,
            userData
          );
          button.style.display = "none";
          input.style.display = "none";
        });

        document
          .getElementById(`answerButton${element.data.id}`)
          .addEventListener("click", () => {
            this.handleAnswerButtonClick(
              wrapperComment,
              element,
              input,
              button,

              answerWrapper
            );
          });
      });
    } catch (error) {
      console.error("Ошибка при получении данных пользователя:", error);
    }
  }

  private static handleButtonClick(
    element: CommentData,
    input: HTMLInputElement,
    answerWrapper: HTMLDivElement,
    comments: CommentData[],
    userData: any
  ): void {
    const answerData = {
      firstName: userData.results[0].name.first,
      lastName: userData.results[0].name.last,
      title: userData.results[0].name.title,
      img: userData.results[0].picture.large,
      answer: input.value,
      id: new Date().getTime(), // Use a unique identifier
      month: new Date().getMonth() + 1,
      day: new Date().getDate(),
      hours: new Date().getHours(),
      minutes: new Date().getMinutes(),
    };

    // Добавляем новый ответ к текущим комментариям
    element.answers = element.answers || [];
    element.answers.push(answerData);


    const updatedComments = this.updateCommentsWithAnswer(
      comments,
      element,
      answerData
    );

    CommentDataController.updateComments(updatedComments);


    const dom = new Comment(element, answerData).generateHTMLAnswer();

    answerWrapper.insertAdjacentHTML("beforeend", `${dom}`);
  }

  private static handleAnswerButtonClick(
    wrapperComment: HTMLElement,
    element: CommentData,
    input: HTMLInputElement,
    button: HTMLButtonElement,
    answerWrapper: HTMLDivElement
  ): void {
    answerWrapper.id = `answerWrapper${new Date().getTime()}`;
    wrapperComment.append(answerWrapper);
    wrapperComment.append(input);
    wrapperComment.append(button);
  }

  private static updateCommentsWithAnswer(
    comments: CommentData[],
    element: CommentData,
    answerData: any
  ): CommentData[] {
    return comments.map((comment) => {
      if (comment.data.id === element.data.id) {
        // comment.answerData = answerData;
      }
      return comment;
    });
  }
}
