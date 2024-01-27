import { CommentData } from "./types";
import { CommentDataController } from "./CommentDataController";
import { Comment } from "./Comment";
import { DOMHandler } from "./DOMHandler";

export class Answer {
  static submit(comments: CommentData[], userData: any): void {
    try {
      comments.forEach((element) => {
        const wrapperComment = document.getElementById(
          `wrapperComment${element.data.id}`
        );
        const input = document.createElement("input");
        const button = document.createElement("button");
        input.type = "text";
        button.innerHTML = "submit";
        button.addEventListener("click", () => {
          this.handleButtonClick(element, input, comments, userData);

          const objComments = CommentDataController.getComments();
          objComments.forEach((el) => {
            if (el.answers) {
              el.answers.forEach((answer: any) => {
                const dom = new Comment(el, answer).generateHTMLAnswer();
                if (!document.getElementById(`answerElement${answer.id}`)) {
                  DOMHandler.appendAnswer(wrapperComment, dom, answer.id);
                }
              });
            }
          });
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
              button
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
      like: 0,
    };
    // Добавляем новый ответ к текущим комментариям
    element.answers = element.answers || [];
    element.answers.push(answerData);
    const updatedComments = comments.map((comment) => {
      if (comment.data.id === element.data.id) {
        return { ...comment, answers: element.answers };
      }
      return comment;
    });
    CommentDataController.updateComments(updatedComments);
    // console.log(updatedComments);
// DOMHandler.counterLike(updatedComments);

  }

  private static handleAnswerButtonClick(
    wrapperComment: HTMLElement,
    _element: CommentData,
    input: HTMLInputElement,
    button: HTMLButtonElement
  ): void {
    wrapperComment.append(input);
    wrapperComment.append(button);
    button.style.display = "block";
    input.style.display = "block";
    input.value = "";
  }
}
