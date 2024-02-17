import { UserDataFetcher } from "./UserDataFetcher";
import { Comments } from "./Comments";
import { AnswerData, CommentData, UserData } from "./types";
import { DOMHandler } from "./DOMHandler";
import { Render } from "./Render";
import { Filter } from "./Filter";
import { validInput } from "./valid";
export class App {
  private div__avatar_ID: HTMLElement;
  private img__avatarID_Img: HTMLImageElement;
  private h3__user: HTMLElement;
  private textarea__textarea: HTMLTextAreaElement;
  private submit__submit: HTMLButtonElement;
  private newData: UserData;
  constructor() {
    this.div__avatar_ID = document.getElementById("avatarID");
    this.img__avatarID_Img = document.createElement("img");
    this.h3__user = document.getElementById("user");
    this.submit__submit = document.getElementById(
      "submit"
    ) as HTMLButtonElement;
    this.textarea__textarea = document.getElementById(
      "textarea"
    ) as HTMLTextAreaElement;
  }

  start(): void {
    this.render(); // отрисовка всех комментариев
    this.addNewUser(); // создается новый пользователь
    Render.allCommentsAndAnswer(); // отрисовка всех комментариев и ответов
    this.favoritesClick(); // добавление флага и добавление в избранные
    Filter.setupEventListeners(); // фильтр
  }

  async addNewUser(): Promise<void> {
    try {
      const userData = await UserDataFetcher.fetchUserData();
      this.newData = this.processUserData(userData);
      this.renderUser(this.newData); // отрисовка нынешнего юзер
      this.setupCommentSubmission(this.newData);
    } catch (error) {
      console.error("Error while fetching user data:", error);
    }
  }

  private processUserData(userData: any): UserData {
    const data = {
      first: userData.results[0].name.first,
      img: userData.results[0].picture.large,
    };
    return data;
  }
  private renderUser(newData: UserData): void {
    this.img__avatarID_Img.id = "imgUser";
    this.img__avatarID_Img.className = "imgUser";
    this.img__avatarID_Img.src = newData.img;
    this.h3__user.innerText = `${newData.first}`;
    this.div__avatar_ID.append(this.img__avatarID_Img);
  }

  private setupCommentSubmission(newData: UserData): void {
    validInput(this.textarea__textarea, this.submit__submit, true);

    this.submit__submit.addEventListener("click", () => {
      document.getElementById("counterText").innerText = "Макс.  1000 символов";
      Comments.newUser(newData, this.textarea__textarea.value);
      this.textarea__textarea.value = "";
    });
  }

  private favoritesClick(): void {
    document
      .getElementById("menu_favorites")
      .addEventListener("click", () => this.menu_favorites());
  }

  render(): void {
    const allCommentsContainer = document.getElementById("allComments");

    allCommentsContainer.addEventListener(
      "click",
      this.handleCommentClick.bind(this)
    );
  }
  handleCommentClick(event: Event): void {
    const target = event.target as HTMLElement;
    let allCommentsFromLocalStorage = JSON.parse(
      localStorage.getItem("comments")
    );

    if (target) {
      if (target.id.startsWith("answerButton")) {
        this.handleAnswerButtonClick(target, allCommentsFromLocalStorage);
      }

      allCommentsFromLocalStorage.forEach((element: CommentData) => {
        if (target.id.startsWith("favorites")) {
          const commentId = target.id.replace("favorites", "");
          this.answerFavorites(commentId, element);
          localStorage.setItem(
            "comments",
            JSON.stringify(allCommentsFromLocalStorage)
          );
        }

        if (target.id.startsWith("counterMinus")) {
          const commentId = target.id.replace("counterMinus", "");
          this.answerDislike(commentId, element);
          localStorage.setItem(
            "comments",
            JSON.stringify(allCommentsFromLocalStorage)
          );
        }
        if (target.id.startsWith("counterPlus")) {
          const commentId = target.id.replace("counterPlus", "");
          this.answerLike(commentId, element);
          localStorage.setItem(
            "comments",
            JSON.stringify(allCommentsFromLocalStorage)
          );
        }

        if (target.id.startsWith("counterMinus")) {
          const commentId = target.id.replace("counterMinus", "");
          this.dislike(commentId, element);
          localStorage.setItem(
            "comments",
            JSON.stringify(allCommentsFromLocalStorage)
          );
        }

        if (target.id.startsWith("counterPlus")) {
          const commentId = target.id.replace("counterPlus", "");
          this.like(commentId, element);
          localStorage.setItem(
            "comments",
            JSON.stringify(allCommentsFromLocalStorage)
          );
        }

        if (target.id.startsWith("favorites")) {
          const commentId = target.id.replace("favorites", "");
          this.favorites(commentId, element);
          localStorage.setItem(
            "comments",
            JSON.stringify(allCommentsFromLocalStorage)
          );
        }
      });
    }
  }

  handleAnswerButtonClick(
    target: HTMLElement,
    allCommentsFromLocalStorage: CommentData[]
  ): void {
    if (document.getElementById("wrapperForm")) return;
    const commentId = target.id.replace("answerButton", "");
    const allAnswers = document.createElement(`div`);
    const wrapperForm = document.createElement("div");
    const input = document.createElement("textarea");
    input.rows = 1;
    const button = document.createElement("button");
    const buttonClosed = document.createElement("button");
    wrapperForm.className = "wrapperForm";
    wrapperForm.id = "wrapperForm";
    button.innerText = "Отправить";
    buttonClosed.innerText = "Закрыть";
    button.disabled = true;
    wrapperForm.append(input, button, buttonClosed);

    allAnswers.id = `allAnswers${commentId}`;
    document.getElementById(`commentWrapper${commentId}`).append(wrapperForm);

    this.addNewAnswer(
      button,
      input,
      buttonClosed,
      commentId,
      allCommentsFromLocalStorage,
      wrapperForm
    );
  }

  addNewAnswer(
    button: HTMLButtonElement,
    input: HTMLTextAreaElement,
    buttonClosed:HTMLButtonElement,
    commentId: string,
    allCommentsFromLocalStorage: CommentData[],
    wrapperForm: HTMLElement
  ): void {
    validInput(input, button, false);
buttonClosed.addEventListener('click',()=>  wrapperForm.remove())
    button.addEventListener("click", () => {
      wrapperForm.remove();
      const user = allCommentsFromLocalStorage.find(
        (user2: CommentData) => user2.id === commentId
      );

      Comments.newAnswer(this.newData, input.value, commentId, user.firstName);
    });
  }

  favorites(id: string, comments: CommentData): void {
    let element = document.getElementById(`favorites${id}`);
    let elementFmg = document.getElementById(
      `imgFavorites${id}`
    ) as HTMLImageElement;
    if (id === comments.id) {
      if (comments.favorites) {
        comments.favorites = false;
        DOMHandler.toggleFavorites(element, elementFmg, false);
        return;
      }
      if (!comments.favorites) {
        comments.favorites = true;
        DOMHandler.toggleFavorites(element, elementFmg, true);
        return;
      }
    }
  }
  answerFavorites(id: string, comments: CommentData): void {
    let element = document.getElementById(`favorites${id}`);
    let elementFmg = document.getElementById(`imgFavorites${id}`) as HTMLImageElement;
    comments.answers.forEach((elAnswer) => {
      if (elAnswer.id === id) {
        if (elAnswer.favorites) {
          elAnswer.favorites = false;
          DOMHandler.toggleFavorites(element, elementFmg, false);
          return;
        }
        if (!elAnswer.favorites) {
          elAnswer.favorites = true;
          DOMHandler.toggleFavorites(element, elementFmg, true);
          return;
        }
      }
    });
  }
  answerDislike(id: string, comments: CommentData): void {
    let number = document.getElementById(`counterNumber${id}`);
    comments.answers.forEach((elAnswer) => {
      if (elAnswer.id === id) {
        elAnswer.like--;
        DOMHandler.toggleLike(number, String(elAnswer.like));
        return;
      }
    });
  }
  answerLike(id: string, comments: CommentData): void {
    let number = document.getElementById(`counterNumber${id}`);
    comments.answers.forEach((elAnswer) => {
      if (elAnswer.id === id) {
        elAnswer.like++;
        DOMHandler.toggleLike(number, String(elAnswer.like));
        return;
      }
    });
  }

  dislike(id: string, comments: CommentData): void {
    let number = document.getElementById(`counterNumber${id}`);

    if (comments.id === id) {
      comments.like--;
      DOMHandler.toggleLike(number, String(comments.like));
      return;
    }
  }
  like(id: string, comments: CommentData): void {
    let number = document.getElementById(`counterNumber${id}`);

    if (comments.id === id) {
      comments.like++;
      DOMHandler.toggleLike(number, String(comments.like));
      return;
    }
  }

  menu_favorites(): void {
    if (JSON.parse(localStorage.getItem("isFav"))) {
      localStorage.setItem("isFav", "false");
    } else {
      localStorage.setItem("isFav", "true");
      const arrayComments = JSON.parse(localStorage.getItem("comments"));
      const fav: any = [];
      arrayComments.forEach((comment: any) => {
        if (comment.favorites) {
          const newComments = { ...comment, answers: [] }; // создаем новый объект с ответами
          fav.push(newComments);
        }

        comment.answers.forEach((answers: AnswerData) => {
          if (answers.favorites) {
            fav.push(answers);
          }
        });
      });
      localStorage.setItem("sort", JSON.stringify(fav));
    }
    Render.allCommentsAndAnswer();
  }
}
