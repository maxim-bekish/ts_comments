import { CommentData, AnswerData, UserData } from "./types";
import { CommentDataController } from "./CommentDataController";
import { GenerationHTMLElementsAnswer } from "./Comment";
import { DOMHandler } from "./DOMHandler";

export class Answer {
  static submit(userData: UserData): void {
    try {

      let dataComments = CommentDataController.getComments();

      dataComments.forEach((element) => {
        // wrapperComment -  блок с комментами ответами и новым полем ввода
        const wrapperComment = document.getElementById(
          `wrapperComment${element.id}`
        );

        const inputAnswer = document.createElement("input");
        const buttonAddAnswer = document.createElement("button"); //кнопка добавления комментария;
        inputAnswer.type = "text";
        buttonAddAnswer.innerHTML = "submit";

        // buttonAnswer - кнопка "ответить"
        const buttonAnswer = document.getElementById(
          `answerButton${element.id}`
        );
       

        buttonAnswer.addEventListener("click", () => {
          this.handleAnswerButtonClick(
            wrapperComment,
            inputAnswer,
            buttonAddAnswer
          );
        });

        buttonAddAnswer.addEventListener("click", () => {
          this.handleButtonClick(
            inputAnswer,
            buttonAddAnswer,
            wrapperComment,
            element.id,
            element.firstName,
            element.lastName,
            userData
          );
        });

      });
    } catch (error) {
      console.error("Ошибка при получении данных пользователя:", error);
    }
  }

  private static handleButtonClick(
    inputAnswer: HTMLInputElement,
    buttonAddAnswer: HTMLButtonElement,
    wrapperComment: HTMLElement,
    idComment: string,
    firstNameComment: string,
    LastNameComment: string,
    userData: UserData
  ): void {
    const answerData = {
      firstName: userData.results[0].name.first,
      lastName: userData.results[0].name.last,
      title: userData.results[0].name.title,
      text: inputAnswer.value,
      img: userData.results[0].picture.large,
      id: crypto.randomUUID(), // Use a unique identifier
      infoComment: {
        first: firstNameComment,
        last: LastNameComment,
        id: idComment,
      },
      like: 0,
      month: new Date().getMonth() + 1,
      day: new Date().getDate(),
      hours: new Date().getHours(),
      minutes: new Date().getMinutes(),
      favorites: false,
    };

    const arrayAnswer = CommentDataController.getAnswer();
    arrayAnswer.push(answerData);
    CommentDataController.updateAnswer(arrayAnswer);
    buttonAddAnswer.style.display = "none";
    inputAnswer.style.display = "none";

    arrayAnswer.forEach((answer: any) => {
      const dom = new GenerationHTMLElementsAnswer(answer).generateHTMLAnswer();
      if (!document.getElementById(`answerElement${answer.id}`)) {
        DOMHandler.appendAnswer(wrapperComment, dom, answer.id);
      }
    });
  }

  private static handleAnswerButtonClick(
    wrapperComment: HTMLElement,
    inputAnswer: HTMLInputElement,
    buttonAddAnswer: HTMLButtonElement
  ): void {
    wrapperComment.append(inputAnswer);
    wrapperComment.append(buttonAddAnswer);
    buttonAddAnswer.style.display = "block";
    inputAnswer.style.display = "block";
    inputAnswer.value = "";
  }
}
