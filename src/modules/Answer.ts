import { DOMHandler } from "./DOMHandler";
import { CommentData } from "./types";
export class Answer {
  static submit(comments: CommentData[]): void {
    console.log(comments);
    comments.forEach((element) => {
      document
        .getElementById(`answerButton${element.data.id}`)
        .addEventListener("click", function () {
          const wrapperComment = document.getElementById(
            `wrapperComment${element.data.id}`
            
            );
            
        });
    });
  }
}
