import "./sass/_style.scss";
import "./sass/_all.scss";
import heart_2 from "./assets/svg/heart-2.svg";
import share from "./assets/svg/share.svg";

interface CommentData {
  firstName: string;
  lastName: string;
  value: string;
  img: string;
  data: {
    month: number;
    day: number;
    hours: number;
    minutes: number;
    seconds: number;
    id: number;
  };
  like: number;
  updateLike?: (newLike: number) => void;
}

class Comment {
  private firstName: string;
  private lastName: string;
  private value: string;
  private img: string;
  data: {
    month: number;
    day: number;
    hours: number;
    minutes: number;
    seconds: number;
    id: number;
  };
  like: number;

  constructor(data: CommentData) {
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.value = data.value;
    this.img = data.img;
    this.data = data.data;
    this.like = data.like;
  }

  generateHTML(): string {
    return `
      <div class="comment_avatar avatar">
        <img src='${this.img}' alt="avatar" />
      </div>
      <div class="comment_body">
        <div class="comment_body_header">
          <h3>${this.firstName} ${this.lastName}</h3>
          <span>${this.data.day}.${
      this.data.month < 10 ? "0" + this.data.month : this.data.month
    } - ${this.data.hours}:${this.data.minutes}</span>
        </div>
        <div class="comment_body_main">
          ${this.value}
        </div>
        <div class="comment_body_footer">
          <div>
            <img src="${share}" />
            <span> Ответ</span>
          </div>
          <div>
            <img src="${heart_2}" />
            <span>В избранном </span>
          </div>
          <div  class="counter">
            <div id='counterMinus${this.data.id}' >-</div>
            <div id='counterNumber${this.data.id}' >${this.like}</div>
            <div id='counterPlus${this.data.id}' >+</div>
          </div>
        </div>
      </div>`;
  }
  updateLike(newLike: number): void {
    this.like = newLike;
    // Обновите DOM-элемент для счетчика лайков
    const counterElement = document.getElementById(
      `counterNumber${this.data.id}`
    );
    if (counterElement) {
      counterElement.innerHTML = `${newLike}`;
    }
  }
}

class DOMHandler {
  static clearElement(element: HTMLElement): void {
    element.innerHTML = "";
  }
  static countComments() {
    document.getElementById("countComments").innerHTML = `(${
      JSON.parse(localStorage.getItem("comments"))?.length
        ? JSON.parse(localStorage.getItem("comments")).length
        : 0
    })`;
  }

  static appendComment(parentElement: HTMLElement, commentHTML: string): void {
    const commentElement = document.createElement("div");
    commentElement.className = "comment";
    commentElement.id = "comment";
    commentElement.innerHTML = commentHTML;
    parentElement.append(commentElement);
  }
  static counterLike(comments: CommentData[]): void {
    comments.forEach((element: any) => {
      let q = document.getElementById(`counterNumber${element.data.id}`);
      let w = document.getElementById(`counterMinus${element.data.id}`);
      let e = document.getElementById(`counterPlus${element.data.id}`);
      q.innerHTML = `${element.like}`;

      w.addEventListener("click", function () {
        element.like--;

        q.innerHTML = `${element.like ? element.like : 0}`;
        CommentDataController.updateComments(comments);
        // Обновление счетчика лайков в реальном времени
        const commentInstance = comments.find(
          (comment) => comment.data.id === element.data.id
        );
        if (commentInstance && commentInstance.updateLike) {
          commentInstance.updateLike(element.like);
        }
      });

      e.addEventListener("click", function () {
        element.like++;

        q.innerHTML = `${element.like}`;
        CommentDataController.updateComments(comments);
        // Обновление счетчика лайков в реальном времени
        const commentInstance = comments.find(
          (comment) => comment.data.id === element.data.id
        );
        if (commentInstance && commentInstance.updateLike) {
          commentInstance.updateLike(element.like);
        }
      });
    });
  }
  static updateCounterText(counterText: HTMLElement, value: string): void {
    counterText.innerHTML = value;
  }
}

class UserDataFetcher {
  static async fetchUserData(): Promise<any> {
    try {
      const response = await fetch("https://randomuser.me/api/");
      const userData = await response.json();
      return userData;
    } catch (error) {
      console.error("Ошибка при запросе к API:", error);
      throw error;
    }
  }
}

class User {
  private userOne: HTMLElement | null;
  private submit: HTMLButtonElement;
  private arrayComments: CommentData[];
  private textarea: HTMLTextAreaElement;
  private commentFormOne: HTMLDivElement;
  private main: HTMLElement | null;

  constructor() {
    this.userOne = document.getElementById("user");
    this.submit = document.getElementById("submit") as HTMLButtonElement;
    this.arrayComments = [];
    this.textarea = document.getElementById("textarea") as HTMLTextAreaElement;
    this.commentFormOne = document.createElement("div");
    this.commentFormOne.className = "commentForm";
    this.main = document.getElementById("main");
  }

  async start(): Promise<void> {
    const userData = await this.fetchUserData();
    this.processUserData(userData);
    this.submits(userData);
    this.counterText();
    this.arrayComments = CommentDataController.getComments();
    this.renderComments();
    DOMHandler.counterLike(this.arrayComments);
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
    let x: string;
    if (
      this.textarea.value.split("").length <= 1000 &&
      this.textarea.value.split("").length > 0
    ) {
      this.submit.disabled = false;
      x = this.textarea.value;
    } else {
      this.submit.disabled = true;
    }
    return x;
  }
  submits(userData: any): void {
    if (!this.submit || !this.main) return;

    this.main.append(this.commentFormOne);

    this.submit.addEventListener("click", () => {
      DOMHandler.clearElement(this.commentFormOne);

      const x = userData.results[0];
      const newPost: CommentData = {
        firstName: x.name.first,
        lastName: x.name.last,
        value: this.disabledButton(),

        img: x.picture.large,
        data: this.getData(),
        like: 0,
      };

      let comments: CommentData[] = CommentDataController.getComments();
      comments.push(newPost);

      CommentDataController.updateComments(comments);
      this.arrayComments = comments;
      this.renderComments();

      this.textarea.value = "";
      this.disabledButton();

      DOMHandler.updateCounterText(
        document.getElementById("counterText"),
        "Max 1000"
      );

      DOMHandler.counterLike(this.arrayComments);
    });
  }

  getData(): {
    month: number;
    day: number;
    hours: number;
    minutes: number;
    seconds: number;
    id: number;
  } {
    const currentDateAndTime = new Date();
    const month = currentDateAndTime.getMonth() + 1;
    const day = currentDateAndTime.getDate();
    const hours = currentDateAndTime.getHours();
    const minutes = currentDateAndTime.getMinutes();
    const seconds = currentDateAndTime.getSeconds();
    const id = currentDateAndTime.getTime();

    return {
      month,
      day,
      hours,
      minutes,
      seconds,
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
    DOMHandler.clearElement(this.commentFormOne);

    this.arrayComments.map((element) => {
      const commentHTML = new Comment(element).generateHTML();
      DOMHandler.appendComment(this.commentFormOne, commentHTML);
    });

    DOMHandler.countComments();
  }
}
class CommentDataController {
  static getComments(): CommentData[] {
    const comments = JSON.parse(localStorage.getItem("comments")) || [];
    return comments;
  }

  static updateComments(comments: CommentData[]): void {
    localStorage.setItem("comments", JSON.stringify(comments));
  }
}

const user = new User();
user.start();
