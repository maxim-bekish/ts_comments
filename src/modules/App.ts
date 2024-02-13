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
  private newData: UserData;
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

    this.newData = this.processUserData(userData);
    // this.setupCommentEvents(newData);
    this.presentUser(this.newData); // отрисовка нынешнего юзер
    this.setupCommentSubmission(this.newData);
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
 
    allCommentsContainer.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;
      if (target && target.id.startsWith("answerButton")) {
        const commentId = target.id.replace("answerButton", "");
   const allAnswers = document.createElement(`allAnswer${commentId}`);
        const wrapperForm = document.createElement("div");
        const input = document.createElement("input");
        const button = document.createElement("button");
        button.innerText = "Отправить";

        wrapperForm.append(input, button);

        // тут мне нужно получить данные юзера , как мне это сделать?
        this.replyToComment(commentId, allAnswers, wrapperForm);
        this.addNewAnswer(button, input, commentId);
      }
    });
  }
  replyToComment(
    commentId: string,
    allAnswers: HTMLElement,
    wrapperForm: HTMLElement
  ): void {
    allAnswers.id = `allAnswers${commentId}`;
    document.getElementById(`commentWrapper${commentId}`).append(allAnswers);
    allAnswers.append(wrapperForm);

    // Реализация логики добавления комментария в ответ на указанный комментарий
  }
  addNewAnswer(
    button: HTMLButtonElement,
    input: HTMLInputElement,
    commentId: string
  ): void {
    button.addEventListener("click", () => {
      const answer = document.createElement("div");
      const user = new Comments();
      user.newAnswer(this.newData, input.value, commentId);
    });
  }

  allCommentsAndAnswer(): void {
    const allComments = JSON.parse(localStorage.getItem("comments"));

    if (allComments) {
      allComments.forEach((element: CommentData) => {
        let htmlComment = new HTML_Comments(element).generateHTML();
        DOMHandler.addCommentInDOM(htmlComment, element);
   
        if (element.answers.length !== 0) {
          element.answers.forEach((el) => {
            let htmlAnswer = new HTML_Comments(
              el,
              element.firstName,
              element.lastName
            ).generateHTMLAnswer();
            DOMHandler.addAnswerInDOM(htmlAnswer, el);
          });
        }
      });
    }
  }
}
