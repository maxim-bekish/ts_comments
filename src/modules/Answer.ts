import { Comment } from "./Comment";
import { User } from "./User";
import { UserDataFetcher } from "./UserDataFetcher";
import { CommentData } from "./types";
export class Answer {
  static submit(comments: CommentData[], userData: any): void {
    const user = new User().getData();
    const userAnswer = userData.results[0];
    console.log(userAnswer);
    comments.forEach((element) => {
      const wrapperComment = document.getElementById(
        `wrapperComment${element.data.id}`
      );

      const x = document.createElement("div");
      const input = document.createElement("input");
      const button = document.createElement("button");
      input.type = "text";
      button.innerHTML = "submit";

      button.addEventListener("click", function () {
        const dom = new Comment(element).generateHTMLAnswer({
          firstName: userAnswer.name.first,
          lastName: userAnswer.name.last,
          title: userAnswer.name.title,
          img: userAnswer.picture.large,
          answer: input.value,
          id: user.id,
          month: user.month,
          day: user.day,
          hours: user.hours,
          minutes: user.minutes,
        });
        x.innerHTML = `${dom}`;
        input.style.display = "none";
        button.style.display = "none";
      });

      document
        .getElementById(`answerButton${element.data.id}`)
        .addEventListener("click", function () {
          wrapperComment.append(x);
          wrapperComment.append(input);
          wrapperComment.append(button);
          x.id = `answer${element.data.id}`;
        });
    });
  }
}
