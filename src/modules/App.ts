import { CommentDataController } from "./CommentDataController";
import { DOMHandler } from "./DOMHandler";
import { UserDataFetcher } from "./UserDataFetcher";
import { CommentData, AnswerData } from "./types";
import {
  GenerationHTMLElementsAnswer,
  GenerationHTMLElementsComments,
} from "./Comment";
import { Answer } from "./Answer";
import { CustomSelect } from "./Filter";
// import { Favorites } from "./Favorites";

export class App {
  private userOne: HTMLElement | null;
  private submit: HTMLButtonElement;
  private arrayComments: CommentData[];
  private arrayAnswer: AnswerData[];
  private textarea: HTMLTextAreaElement;
  private allComments: HTMLDivElement | null;
  private main: HTMLElement | null;
  static renderComments: any;

  constructor() {
    this.userOne = document.getElementById("user");
    this.submit = document.getElementById("submit") as HTMLButtonElement;
    this.arrayComments = [];

    this.allComments = document.createElement("div");
    this.allComments.id = "allComments";
    this.textarea = document.getElementById("textarea") as HTMLTextAreaElement;
    this.main = document.getElementById("main");
  }

  async start(): Promise<void> {
    new CustomSelect();

    const userData = await this.fetchUserData();
    this.processUserData(userData);
    this.submits(userData);
    this.counterText();
    // Favorites.favorites();
    this.arrayComments = CommentDataController.getComments();

    this.renderComments(this.arrayComments);
    // this.renderAnswer();
    this.renderFavorites();
    this.renderFilter();


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

      const newComment: CommentData = {
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
        answer: [],
      };

      let comments: CommentData[] = CommentDataController.getComments(); // Получаем текущие комментарии

      comments.push(newComment); // Добавляем новый комментарий

      CommentDataController.updateComments(comments); // Обновляем комментарии в хранилище

      this.textarea.value = ""; // Очищаем форму
      this.disabledButton();
      DOMHandler.updateCounterText(
        document.getElementById("counterText"),
        "Max 1000"
      );

      this.arrayComments = comments; // Перерисовываем комментарии
      this.renderComments(this.arrayComments);
  
      this.renderFavorites();
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

  renderComments(arrayComments: CommentData[]): void {
    arrayComments.forEach((element) => {
      // Генерируем HTML-код для текущего комментария
      const commentHTML = new GenerationHTMLElementsComments(
        element
      ).generateHTML();
      const wrapperComment = document.createElement("div");
      this.allComments.append(wrapperComment);
      wrapperComment.id = `wrapperComment${element.id}`;
      // Добавляем текущий комментарий в DOM, используя DOMHandler.appendComment
      DOMHandler.appendComment(wrapperComment, commentHTML);
      this.renderAnswer(wrapperComment, element);
    
    });
    DOMHandler.counterLike(arrayComments); // Обновляем значение лайков комментариев
  DOMHandler.counterLikeAnswer(arrayComments);
    DOMHandler.countComments(); // Обновляем счетчик комментариев на странице
  }

  renderAnswer(wrapperComment: HTMLElement, element: CommentData): void {
    element.answer.forEach((answer: AnswerData) => {
      DOMHandler.appendAnswer(wrapperComment, answer, element);
    });
  }

  renderFavorites(): void {
    // Очищаем область отображения комментариев перед добавлением новых
    this.allComments.innerHTML = "";

    // Получаем только избранные комментарии
    const favoriteComments = this.arrayComments.filter(
      (comment) => comment.favorites
    );

    favoriteComments.forEach((element) => {
      const wrapperComment = document.createElement("div");

      this.allComments.appendChild(wrapperComment);

      const commentHTML = new GenerationHTMLElementsComments(
        element
      ).generateHTML();
      DOMHandler.appendComment(wrapperComment, commentHTML);
    });

    // Обновляем счетчик комментариев на странице
    // DOMHandler.countComments();

    // После отображения избранных комментариев вызываем метод для отображения остальных комментариев
    this.renderComments(
      this.arrayComments.filter((comment) => !comment.favorites)
    );
  }

  renderFilter(): void {
    const filter = CommentDataController.getFilter();
    DOMHandler.filter(filter);
  }
}
