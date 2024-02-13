import { UserDataFetcher } from "./UserDataFetcher";
import { Comments } from "./Comments";
import { HTML_Comments } from "./HTML_Comments";
import { CommentData } from "./types";
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

  async addNewUser(): Promise<any> {
    const userData = await UserDataFetcher.fetchUserData();

    const newData = {
      title: userData.results[0].name.title,
      first: userData.results[0].name.first,
      last: userData.results[0].name.last,
      img: userData.results[0].picture.large,
    };
    this.img__avatarID_Img.id = "imgUser";
    this.img__avatarID_Img.className = "imgUser";
    this.img__avatarID_Img.src = newData.img;
    this.h3__user.innerText = `${newData.title} ${newData.first} ${newData.last} `;
    this.div__avatar_ID.append(this.img__avatarID_Img);

    this.textarea__textarea.addEventListener("input", () => {
      this.textarea__textarea.value !== ""
        ? (this.submit__submit.disabled = false)
        : (this.submit__submit.disabled = true);
    });

    this.submit__submit.addEventListener("click", () => {
      let user = new Comments();
      user.newUser(newData, this.textarea__textarea.value);
      this.textarea__textarea.value = "";
    });
  }
  start(): void {
    this.addNewUser(); // создается новый пользователь
    this.allComments(); // отрисовка всех комментариев
  }

  allComments(): void {
    const allComments = JSON.parse(localStorage.getItem("comments"));

    if (allComments) {
      allComments.forEach((element: CommentData) => {
        let htmlComment = new HTML_Comments(element).generateHTML();
        DOMHandler.addCommentInDOM(htmlComment, element);
      });
    }
  }
}
