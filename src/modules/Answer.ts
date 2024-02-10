import { CommentData, AnswerData, UserData } from "./types";
import { CommentDataController } from "./CommentDataController";
import { DOMHandler } from "./DOMHandler";
import { Favorites } from "./Favorites";
export class Answer {
  static submit(userData: UserData) {
    try {
      let comments: CommentData[] = CommentDataController.getComments();
      comments.forEach((element) => {
        // wrapperComment -  блок с комментами ответами и новым полем ввода
        const wrapperAnswer = document.getElementById(
          `wrapperAnswer${element.id}`
        );
        const buttonAnswer = document.getElementById(
          `answerButton${element.id}`
        ); // buttonAnswer - кнопка "ответить"
        const inputAnswer = document.createElement("input");
        const buttonAddAnswer = document.createElement("button"); //кнопка добавления комментария;
        inputAnswer.type = "text";
        buttonAddAnswer.innerHTML = "submit";
        buttonAnswer.addEventListener("click", () => {
          this.handleAnswerButtonClick(
            wrapperAnswer,
            inputAnswer,
            buttonAddAnswer
          );
        });
        buttonAddAnswer.addEventListener("click", () => {
          DOMHandler.clearElement(wrapperAnswer);
          this.handleButtonClick(
            inputAnswer,
            buttonAddAnswer,
            wrapperAnswer,
            userData,
            element
          );
        });
        CommentDataController.updateComments(comments);
        DOMHandler.counterLike(comments);
        DOMHandler.counterLikeAnswer(comments);
        Favorites.toggleFavoritesButton(comments);
      });
    } catch (error) {
      console.error("Ошибка при получении данных пользователя:", error);
    }
  }
  static answerTest(arrayComments: CommentData[]): void {
    arrayComments.forEach((el) => {});
  }
  private static handleButtonClick(
    inputAnswer: HTMLInputElement, // элемент input
    buttonAddAnswer: HTMLButtonElement, // элемент button
    wrapperAnswer: HTMLElement, // элемент div куда вставить ответ
    userData: UserData, // данные юзера который отвечает
    el: CommentData // один комментарий
  ): void {
    const answerData = {
      firstName: userData.results[0].name.first,
      lastName: userData.results[0].name.last,
      title: userData.results[0].name.title,
      text: inputAnswer.value,
      img: userData.results[0].picture.large,
      id: crypto.randomUUID(), // Use a unique identifier
      idComment: el.id,
      like: 0,
      month: new Date().getMonth() + 1,
      day: new Date().getDate(),
      hours: new Date().getHours(),
      minutes: new Date().getMinutes(),
      favorites: false,
    };
    el.answer.push(answerData);
    DOMHandler.appendAnswer(wrapperAnswer, el);
    buttonAddAnswer.style.display = "none";
    inputAnswer.style.display = "none";
  }
  // Добавляет форму ввода ответа
  private static handleAnswerButtonClick(
    wrapperAnswer: HTMLElement,
    inputAnswer: HTMLInputElement,
    buttonAddAnswer: HTMLButtonElement
  ): void {
    wrapperAnswer.append(inputAnswer);
    wrapperAnswer.append(buttonAddAnswer);
    buttonAddAnswer.style.display = "block";
    inputAnswer.style.display = "block";
    inputAnswer.value = "";
  }
}
