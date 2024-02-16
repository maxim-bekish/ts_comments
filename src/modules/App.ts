import { UserDataFetcher } from "./UserDataFetcher";
import { Comments } from "./Comments";
import { HTML_Comments } from "./HTML_Comments";
import { AnswerData, CommentData, UserData } from "./types";
import { DOMHandler } from "./DOMHandler";
import { CustomSelect } from "./Filter";
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
    // this.counterComments()
    this.render(); // отрисовка всех комментариев
    this.addNewUser(); // создается новый пользователь
    this.allCommentsAndAnswer(); // отрисовка всех комментариев и ответов
    this.favoritesClick(); // добавление флага и добавление в избранные
    this.setupEventListeners(); // фильтр
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
      title: userData.results[0].name.title,
      first: userData.results[0].name.first,
      last: userData.results[0].name.last,
      img: userData.results[0].picture.large,
    };
    return data;
  }

  private renderUser(newData: UserData): void {
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

  private favoritesClick(): void {
    document
      .getElementById("menu_favorites")
      .addEventListener("click", () => this.menu_favorites());
  }

  render(): void {
    const allCommentsContainer = document.getElementById("allComments");

    allCommentsContainer.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;
      let allCommentsFromLocalStorage = JSON.parse(
        localStorage.getItem("comments")
      );
    
      if (target) {
        if (target.id.startsWith("answerButton")) {
          const commentId = target.id.replace("answerButton", "");
          const allAnswers = document.createElement(`div`);
          const wrapperForm = document.createElement("div");
          const input = document.createElement("input");
          const button = document.createElement("button");
          button.innerText = "Отправить";
          wrapperForm.append(input, button);
          this.replyToComment(commentId, allAnswers, wrapperForm);
          this.addNewAnswer(
            button,
            input,
            commentId,
            allCommentsFromLocalStorage,
            wrapperForm
          );
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
          if (target.id.startsWith("favorites")) {
            const commentId = target.id.replace("favorites", "");
            this.favorites(commentId, element);
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
        });
      }
    });
  }

  favorites(id: string, comments: CommentData): void {
    let element = document.getElementById(`favorites${id}`);
    if (id === comments.id) {
      if (comments.favorites) {
        comments.favorites = false;

        DOMHandler.toggleFavorites(element, "Добавить в избранное");
        return;
      }
      if (!comments.favorites) {
        comments.favorites = true;
        console.log(comments);
        DOMHandler.toggleFavorites(element, "Удалить из избранного");
        return;
      }
    }
  }

  replyToComment(
    commentId: string,
    allAnswers: HTMLElement,
    wrapperForm: HTMLElement
  ): void {
    allAnswers.id = `allAnswers${commentId}`;
    document.getElementById(`commentWrapper${commentId}`).append(wrapperForm);

    // Реализация логики добавления комментария в ответ на указанный комментарий
  }

  answerFavorites(id: string, comments: CommentData): void {
    let element = document.getElementById(`favorites${id}`);
    comments.answers.forEach((elAnswer) => {
      if (elAnswer.id === id) {
        if (elAnswer.favorites) {
          elAnswer.favorites = false;
          DOMHandler.toggleFavorites(element, "Добавить в избранное");
          return;
        }
        if (!elAnswer.favorites) {
          elAnswer.favorites = true;
          DOMHandler.toggleFavorites(element, "Удалить из избранного");
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

  addNewAnswer(
    button: HTMLButtonElement,
    input: HTMLInputElement,
    commentId: string,
    allCommentsFromLocalStorage: CommentData[],
    wrapperForm: HTMLElement
  ): void {
    button.addEventListener("click", () => {
      wrapperForm.remove();
      const user = allCommentsFromLocalStorage.find(
        (user2: CommentData) => user2.id === commentId
      );

      const addAnswer = new Comments();
      addAnswer.newAnswer(
        this.newData,
        input.value,
        commentId,
        user.lastName,
        user.firstName
      );
    });
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
    this.allCommentsAndAnswer();
  }

  setupEventListeners() {
    const customSelect = document.querySelector(
      ".custom-select"
    ) as HTMLDivElement;
    const selectedOption = customSelect.querySelector(
      ".selected-option"
    ) as HTMLSpanElement;
    const optionsList = customSelect.querySelector(
      ".options-list"
    ) as HTMLUListElement;

    customSelect.addEventListener("click", () => {
      optionsList.style.display === "block"
        ? (optionsList.style.display = "none")
        : (optionsList.style.display = "block");
    });

    optionsList.addEventListener("click", (event) => {
      const target = event.target as HTMLLIElement;

      if (target.tagName === "LI") {
        localStorage.setItem("filter", target.attributes[0].value);

        selectedOption.textContent = target.textContent || ""; // Скрываем список после выбора опции

        this.allCommentsAndAnswer();
      }
    });

    document.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;
      if (!customSelect.contains(target)) {
        optionsList.style.display = "none";
      }
    });
  }

  allCommentsAndAnswer(): void {
    const allComments = JSON.parse(localStorage.getItem("comments"));
    const isFav = JSON.parse(localStorage.getItem("isFav"));
    const sort = JSON.parse(localStorage.getItem("sort"));
    const filter = localStorage.getItem("filter");

  DOMHandler.counterComments(allComments.length);
    let x: any;
    isFav ? (x = sort) : (x = allComments);
    if (allComments) {
      switch (filter) {
        case "option1":
          break;
        case "option2":
          x.sort((a: CommentData, b: CommentData) => a.like - b.like);
          break;
        case "option3":
          x.sort(
            (a: CommentData, b: CommentData) =>
              a.answers.length - b.answers.length
          );
          break;
      }

      document.getElementById("allComments").innerHTML = "";
      x.forEach((element: CommentData) => {
        let htmlComment = new HTML_Comments(element).generateHTML();
        DOMHandler.addCommentInDOM(htmlComment, element);
        if (element.answers) {
          if (element.answers.length !== 0) {
            element.answers.forEach((el) => {
              let htmlAnswer = new HTML_Comments(el).generateHTMLAnswer();
              DOMHandler.addAnswerInDOM(htmlAnswer, el);
            });
          }
        }
      });
    }
  }
}
