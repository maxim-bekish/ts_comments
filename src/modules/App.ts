import { UserDataFetcher } from "./UserDataFetcher";
import { Comments } from "./Comments";
import { HTML_Comments } from "./HTML_Comments";
import { CommentData, UserData } from "./types";
import { DOMHandler } from "./DOMHandler";
export class App {
  private div__avatar_ID: HTMLElement;
  private img__avatarID_Img: HTMLImageElement | null;
  private h3__user: HTMLElement | null;
  private textarea__textarea: HTMLTextAreaElement | null;
  private submit__submit: HTMLButtonElement | null;

  constructor() {
    this.div__avatar_ID = document.getElementById("avatarID");
    this.h3__user = document.getElementById("user");
    this.submit__submit = document.getElementById(
      "submit"
    ) as HTMLButtonElement;
    this.img__avatarID_Img = document.createElement("img");
    this.textarea__textarea = document.getElementById(
      "textarea"
    ) as HTMLTextAreaElement;
  }

  start(): void {
    this.addNewUser(); // создается новый пользователь
    this.allCommentsAndAnswer(); // отрисовка всех комментариев
    this.setupCommentEvents(); // отрисовка всех комментариев
  }

  async addNewUser(): Promise<any> {
    const userData = await UserDataFetcher.fetchUserData();

    const newData = this.processUserData(userData);

    this.presentUser(newData); // отрисовка нынешнего юзер
    this.setupCommentSubmission(newData);
  }
  private processUserData(userData: any): UserData {
    const data = {
      title: userData.results[0].name.title,
      first: userData.results[0].name.first,
      last: userData.results[0].name.last,
      img: userData.results[0].picture.large,
    };
    return data;
  }

  private presentUser(newData: UserData): void {
    this.img__avatarID_Img.id = "imgUser";
    this.img__avatarID_Img.className = "imgUser";
    this.img__avatarID_Img.src = newData.img;
    this.h3__user.innerText = `${newData.title} ${newData.first} ${newData.last} `;
    this.div__avatar_ID.append(this.img__avatarID_Img);
  }

  private setupCommentSubmission(newData: UserData): void {
    this.textarea__textarea.addEventListener("input", () => {
      this.textarea__textarea.value !== ""
        ? (this.submit__submit.disabled = false)
        : (this.submit__submit.disabled = true);
    });

    const user = new Comments();
    this.submit__submit.addEventListener("click", () => {
      user.newUser(newData, this.textarea__textarea.value);
      this.textarea__textarea.value = "";
    });
  }

  setupCommentEvents(): void {
    const allCommentsContainer = document.getElementById("allComments");
    const allAnswers = document.createElement("div");
    

    allCommentsContainer.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;

      if (target && target.id.startsWith("answerButton")) {
        // Если нажата кнопка "Ответить"

        const commentId = target.id.replace("answerButton", "");
        console.log(commentId);
        // Здесь можно реализовать логику добавления комментария к указанному комментарию
        this.replyToComment(commentId);
      }
    });
  }
  replyToComment(commentId: string): void {
    // Реализация логики добавления комментария в ответ на указанный комментарий
  }
  allCommentsAndAnswer(): void {
    const allComments = JSON.parse(localStorage.getItem("comments"));

    if (allComments) {
      allComments.forEach((element: CommentData) => {
        let htmlComment = new HTML_Comments(element).generateHTML();
        DOMHandler.addCommentInDOM(htmlComment, element);
      });
    }
  }
}
