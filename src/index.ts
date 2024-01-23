import "./sass/_style.scss";
import "./sass/_all.scss";

const userOne: HTMLElement | null = document.getElementById("user");
const submit: HTMLElement | null = document.getElementById("submit");

let arrayComments: [] = [];
const textarea = document.getElementById("textarea") as HTMLTextAreaElement;
localStorage.setItem("comments", JSON.stringify(arrayComments));
interface RandomUserResponse {
  results: {
    name: { first: string; last: string; title: string };
    email: string;
    picture: { large: string };
  }[];
}
class User {
  firstName: string;
  lastName: string;
  title: string;
  large: string;
  constructor(firstName?: string, lastName?: string, title?: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.title = title;
  }

  start(): void {
    this.fetchUserData();
  }

  async fetchUserData(): Promise<RandomUserResponse> {
    try {
      const response = await fetch("https://randomuser.me/api/");
      const userData: RandomUserResponse = await response.json();

      // Обработка полученных данных
      this.processUserData(userData);
      this.submits(userData);

      return userData;
    } catch (error) {
      console.error("Ошибка при запросе к API:", error);
      throw error;
    }
  }
  processUserData(userData: RandomUserResponse): void {
    const avatarIMG = document.createElement("img");
    const avatarID = document.getElementById("avatarID");
    const x = userData.results[0];
    avatarIMG.src = x.picture.large;
    avatarID.append(avatarIMG);
    userOne.textContent = `${x.name.title} ${x.name.first} ${x.name.last}`;

    console.log("Обработанные данные о пользователе:", userData.results[0]);
  }

  submits(userData: RandomUserResponse): void {
    const x = userData.results[0];
    const main: HTMLElement | null = document.getElementById("main");
    const commentFormOne: HTMLElement = document.createElement("div");
    commentFormOne.className = "commentForm";
    main.append(commentFormOne);
    submit.addEventListener("click", function () {
      commentFormOne.innerHTML = "";
      let newPost = {
        firstName: x.name.first,
        lastName: x.name.last,
        value: textarea.value,
        img: x.picture.large,
      };
      let r = JSON.parse(localStorage.getItem("comments"));

      r.push(newPost);
      localStorage.setItem("comments", JSON.stringify(r));

      r.map(
        (element: {
          firstName: string;
          lastName: string;
          value: string;
          img: string;
        }) => {
          const comment: HTMLElement | null = document.createElement("div");
          comment.className = "comment";
          comment.id = "comment";
          commentFormOne.append(comment);

          comment.innerHTML = ` <div class="comment_avatar avatar">
            <img src='${element.img}' alt="avatar" />
          </div>
          <div class="comment_body">
            <div class="comment_body_header">
              <h3>${element.firstName} ${element.lastName}</h3>
              <span> data</span>
            </div>
            <div class="comment_body_main">
           ${element.value}
            </div>
            <div class="comment_body_footer">
              <div>
                <img src="./../src/assets/svg/share.svg" />
                <span> Ответ</span>
              </div>
              <div>
                <img src="./../src/assets/svg/heart-2.svg" />
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
      );
      textarea.value = "";
    });
  }
}

const user = new User();

user.start();
