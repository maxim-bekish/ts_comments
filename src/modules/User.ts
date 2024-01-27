import { CommentDataController } from "./CommentDataController";
import { DOMHandler } from "./DOMHandler";
import { UserDataFetcher } from "./UserDataFetcher";
import { CommentData, AnswerData } from "./types";
import {
  GenerationHTMLElementsAnswer,
  GenerationHTMLElementsComments,
} from "./Comment";
import { Answer } from "./Answer";

export class User {
  private userOne: HTMLElement | null;
  private submit: HTMLButtonElement;
  private arrayComments: CommentData[];
  private arrayAnswer: AnswerData[];

  private textarea: HTMLTextAreaElement;
  private allComments: HTMLDivElement | null;
  private main: HTMLElement | null;

  constructor() {
    this.userOne = document.getElementById("user");
    this.submit = document.getElementById("submit") as HTMLButtonElement;
    this.arrayComments = [];
    this.arrayAnswer = [];
    this.allComments = document.createElement("div");
    this.allComments.id = "allComments";
    this.textarea = document.getElementById("textarea") as HTMLTextAreaElement;
    this.main = document.getElementById("main");
  }

  async start(): Promise<void> {
    const userData = await this.fetchUserData();
    this.processUserData(userData);
    this.submits(userData);
    this.counterText();
    this.arrayComments = CommentDataController.getComments();
    this.arrayAnswer = CommentDataController.getAnswer();

    this.renderComments();
    this.renderAnswer();
    DOMHandler.counterLike(this.arrayComments);
    DOMHandler.counterLikeAnswer(this.arrayAnswer);
    Answer.submit(userData);
  }

  async fetchUserData(): Promise<any> {
    const userData = await UserDataFetcher.fetchUserData();
    return userData;
  }

  processUserData(userData: any): void {
    const avatarIMG = document.createElement("img");
    const avatarID = document.getElementById("avatarID");
    const x = userData.results[0];
    avatarIMG.src = x.picture.large;
    avatarID.append(avatarIMG);
    if (this.userOne) {
      this.userOne.textContent = `${x.name.title} ${x.name.first} ${x.name.last}`;
    }
  }
  disabledButton(): string {
    let text: string;
    if (
      this.textarea.value.split("").length <= 1000 &&
      this.textarea.value.split("").length > 0
    ) {
      this.submit.disabled = false;
      text = this.textarea.value;
    } else {
      this.submit.disabled = true;
    }
    return text;
  }
  submits(userData: any): void {
    if (!this.submit || !this.main) return;

    this.main.append(this.allComments);

    this.submit.addEventListener("click", async () => {
      DOMHandler.clearElement(this.allComments);

      const data = userData.results[0]; // Загружаем данные пользователя

      const newPost: CommentData = {
        firstName: data.name.first,
        lastName: data.name.last,
        title: data.name.title,
        img: data.picture.large,
        like: 0,
        favorites: false,
        text: this.disabledButton(),
        month: new Date().getMonth() + 1,
        day: new Date().getDate(),
        hours: new Date().getHours(),
        minutes: new Date().getMinutes(),
        id: crypto.randomUUID(),
      };

      let comments: CommentData[] = CommentDataController.getComments(); // Получаем текущие комментарии

      comments.push(newPost); // Добавляем новый комментарий

      CommentDataController.updateComments(comments); // Обновляем комментарии в хранилище

      this.textarea.value = ""; // Очищаем форму
      this.disabledButton();
      DOMHandler.updateCounterText(
        document.getElementById("counterText"),
        "Max 1000"
      );

      this.arrayComments = comments; // Перерисовываем комментарии
      this.renderComments();
      // this.renderAnswer();

      DOMHandler.counterLike(this.arrayComments);
    });
  }

  getData(): {
    month: number;
    day: number;
    hours: number;
    minutes: number;
    id: string;
  } {
    const currentDateAndTime = new Date();
    const month = currentDateAndTime.getMonth() + 1;
    const day = currentDateAndTime.getDate();
    const hours = currentDateAndTime.getHours();
    const minutes = currentDateAndTime.getMinutes();
    const id = crypto.randomUUID();
    return {
      month,
      day,
      hours,
      minutes,
      id,
    };
  }

  counterText(): void {
    if (!this.textarea) return;

    this.textarea.addEventListener("input", () => {
      this.disabledButton();
      DOMHandler.updateCounterText(
        document.getElementById("counterText"),
        `${this.textarea.value.split("").length} /1000`
      );
    });

    this.textarea.addEventListener("blur", () => {
      this.disabledButton();
      DOMHandler.updateCounterText(
        document.getElementById("counterText"),
        this.textarea.value.split("").length > 0
          ? `${this.textarea.value.split("").length} /1000`
          : "Max 1000"
      );
    });

    this.textarea.addEventListener("focus", () => {
      this.disabledButton();
      DOMHandler.updateCounterText(
        document.getElementById("counterText"),
        this.textarea.value.split("").length > 0
          ? `${this.textarea.value.split("").length} /1000`
          : "0/1000"
      );
    });
  }
  renderComments(): void {
    // Перебираем массив комментариев (this.arrayComments)
    this.arrayComments.forEach((element) => {
      // Генерируем HTML-код для текущего комментария

      const commentHTML = new GenerationHTMLElementsComments(
        element
      ).generateHTML();

      const wrapperComment = document.createElement("div");
      wrapperComment.className = "commentForm";
      wrapperComment.id = `wrapperComment${element.id}`;
      this.allComments?.append(wrapperComment);
      // Генерируем HTML-код для текущего ответа

      // Добавляем текущий комментарий в DOM, используя DOMHandler.appendComment
      DOMHandler.appendComment(wrapperComment, commentHTML, element.id);
      // НУЖНО РЕШИТЬ
      // if (element.answers) {
      //   element.answers.forEach((answer: any) => {
      //     // id="answerElement1706283654745"
      //     const generateHTMLAnswer = new Comment(
      //       element,
      //       answer
      //     ).generateHTMLAnswer();

      //     DOMHandler.appendAnswer(
      //       wrapperComment,
      //       generateHTMLAnswer,
      //       answer.id
      //     );
      //   });
      // }
    });

    // Обновляем счетчик комментариев на странице
    DOMHandler.countComments();
  }

  renderAnswer(): void {
    const arrayAnswer = CommentDataController.getAnswer();
    arrayAnswer.forEach((answer: AnswerData) => {
      const wrapperComment = document.getElementById(
        `wrapperComment${answer.infoComment.id}`
      );
      const generateHTMLAnswer = new GenerationHTMLElementsAnswer(
        answer
      ).generateHTMLAnswer();

      DOMHandler.appendAnswer(wrapperComment, generateHTMLAnswer, answer.id);
    });
    //

    // DOMHandler.appendAnswer(wrapperComment, dom, answer.id);
  }
}
