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
  };
}

class Comment {
  private firstName: string;
  private lastName: string;
  private value: string;
  private img: string;
  private data: {
    month: number;
    day: number;
    hours: number;
    minutes: number;
    seconds: number;
  };

  constructor(data: CommentData) {
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.value = data.value;
    this.img = data.img;
    this.data = data.data;
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
          <div class="counter">
            <div>-</div>
            <div>6</div>
            <div>+</div>
          </div>
        </div>
      </div>`;
  }
}

class DOMHandler {
  static clearElement(element: HTMLElement): void {
    element.innerHTML = "";
  }

  static appendComment(parentElement: HTMLElement, commentHTML: string): void {
    const commentElement = document.createElement("div");
    commentElement.className = "comment";
    commentElement.id = "comment";
    commentElement.innerHTML = commentHTML;
    parentElement.append(commentElement);
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
  private submit: HTMLElement | null;
  private arrayComments: CommentData[];
  private textarea: HTMLTextAreaElement;
  private commentFormOne: HTMLDivElement;
  private main: HTMLElement | null;

  constructor() {
    this.userOne = document.getElementById("user");
    this.submit = document.getElementById("submit");
    this.arrayComments = [];
    this.textarea = document.getElementById("textarea") as HTMLTextAreaElement;
    this.commentFormOne = document.createElement("div");
    this.commentFormOne.className = "commentForm";
    this.main = document.getElementById("main");

    localStorage.setItem("comments", JSON.stringify(this.arrayComments));
  }

  async start(): Promise<void> {
    const userData = await this.fetchUserData();
    this.processUserData(userData);
    this.submits(userData);
    this.counterText();
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
    console.log("Обработанные данные о пользователе:", userData.results[0]);
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
        value:
          this.textarea.value.split("").length <= 10 &&
          this.textarea.value.split("").length > 0
            ? this.textarea.value
            : "2",
        img: x.picture.large,
        data: this.getData(),
      };

      let comments: CommentData[] = JSON.parse(
        localStorage.getItem("comments")
      );
      comments.push(newPost);
      localStorage.setItem("comments", JSON.stringify(comments));

      comments.map((element) => {
        const commentHTML = new Comment(element).generateHTML();

        DOMHandler.appendComment(this.commentFormOne, commentHTML);
      });

      this.textarea.value = "";
      DOMHandler.updateCounterText(
        document.getElementById("counterText"),
        "Max 1000"
      );
    });
  }

  getData(): {
    month: number;
    day: number;
    hours: number;
    minutes: number;
    seconds: number;
  } {
    const currentDateAndTime = new Date();
    const month = currentDateAndTime.getMonth() + 1;
    const day = currentDateAndTime.getDate();
    const hours = currentDateAndTime.getHours();
    const minutes = currentDateAndTime.getMinutes();
    const seconds = currentDateAndTime.getSeconds();

    return {
      month,
      day,
      hours,
      minutes,
      seconds,
    };
  }

  counterText(): void {
    if (!this.textarea) return;

    this.textarea.addEventListener("input", () => {
      DOMHandler.updateCounterText(
        document.getElementById("counterText"),
        `${this.textarea.value.split("").length} /1000`
      );
    });

    this.textarea.addEventListener("blur", () => {
      DOMHandler.updateCounterText(
        document.getElementById("counterText"),
        this.textarea.value.split("").length > 0
          ? `${this.textarea.value.split("").length} /1000`
          : "Max 1000"
      );
    });

    this.textarea.addEventListener("focus", () => {
      DOMHandler.updateCounterText(
        document.getElementById("counterText"),
        this.textarea.value.split("").length > 0
          ? `${this.textarea.value.split("").length} /1000`
          : "0/1000"
      );
    });
  }
}

const user = new User();
user.start();
