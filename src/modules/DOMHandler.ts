import { AnswerData, CommentData } from "./types";

export class DOMHandler {
  static addCommentInDOM(commentElement: string, el: CommentData): void {
    let allComments = document.getElementById("allComments");
    let commentWrapper = document.createElement("div");
    let AllAnswers = document.createElement("div");

    commentWrapper.id = `commentWrapper${el.id}`;
    AllAnswers.id = `allAnswers${el.id}`;
    AllAnswers.className = `allAnswers`;

    commentWrapper.className = "commentForm";
    let comment = document.createElement("div");
    comment.id = `comment${el.id}`;
    comment.className = `comment`;

    allComments.prepend(commentWrapper);
    commentWrapper.append(comment, AllAnswers);
    comment.innerHTML = commentElement;
  }
  static addAnswerInDOM(answerElement: string, el: AnswerData): void {
    const allAnswers = document.getElementById(`allAnswers${el.idComment}`);
    const answer = document.createElement("div");
    answer.id = el.id;
    answer.className = "answer";
    answer.innerHTML = answerElement;
    allAnswers.append(answer);
  }
}
