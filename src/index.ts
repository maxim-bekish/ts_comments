import "./sass/_style.scss";
import "./sass/_all.scss";

const userOne: HTMLElement | null = document.getElementById("user");
const avatarID: HTMLElement | null = document.getElementById("avatarID");
const submit: HTMLElement | null = document.getElementById("submit");
const commentForm: HTMLElement | null = document.getElementById("commentForm");

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
  arrayComments: [];

  constructor(
    firstName?: string,
    lastName?: string,
    title?: string,
    arrayComments: [] = []
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.title = title;
    this.arrayComments = arrayComments;
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
    const x = userData.results[0];
    userOne.textContent = `${x.name.title} ${x.name.first} ${x.name.last}`;

    // console.log(
    //   "Обработанные данные о пользователе:",
    //   userData.results[0].name
    // );
  }

  submits(userData: RandomUserResponse): void {
    const x = userData.results[0];

    submit.addEventListener("click", function () {
      let newPost = {
        firstName: x.name.first,
        lastName: x.name.last,
        value: textarea.value,
      };
      let r = JSON.parse(localStorage.getItem("comments"));

      r.push(newPost);
      localStorage.setItem("comments", JSON.stringify(r));


      r.map(
        (element: { firstName: string; lastName: string; value: string }) => {
          const comment: HTMLElement | null = document.createElement("div");
          comment.className = "comment";
          comment.id = "comment";
          commentForm.append(comment);
          // commentForm.innerHTML = "";

          comment.innerHTML = ` <div class="comment_avatar avatar">
            <img src="./../src/assets/img/test-1.jpg" alt="avatar" />
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
    });
  }
}

const user = new User();
console.log(user);
user.fetchUserData();
// user.submits()
