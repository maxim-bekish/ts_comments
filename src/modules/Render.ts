import { DOMHandler } from "./DOMHandler";
import { HTML_Comments } from "./HTML_Comments";
import { CommentData } from "./types";

export class Render {
  static allCommentsAndAnswer(): void {
    const allComments = JSON.parse(localStorage.getItem("comments"));
    const isFav = JSON.parse(localStorage.getItem("isFav"));
    const sort = JSON.parse(localStorage.getItem("sort"));
    const filter = localStorage.getItem("filter");

    let x: any;
    isFav ? (x = sort) : (x = allComments);
    if (allComments) {
      DOMHandler.counterComments(allComments.length);
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
