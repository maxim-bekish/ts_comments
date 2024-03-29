import { AnswerData, CommentData } from "./types";
import heart from './../assets/svg/heart-2.svg'
import heart_empty from './../assets/svg/heart_empty.svg'
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
    answer.id = `answer${el.id}`;
    answer.className = "answer";
    answer.innerHTML = answerElement;
    allAnswers.append(answer);
  }
  static toggleFavorites(
    element: HTMLElement,
    elementIMG: HTMLImageElement,
    x: boolean
  ): void {
    if (x) {
      element.innerText = "В избранном";
      elementIMG.src = heart;
    } else {
      element.innerText = "В избранное";
        elementIMG.src = heart_empty;
    }
  }
  static toggleLike(element: HTMLElement, text: string): void {
    element.innerText = text;
  }
  static counterComments(num: number): void {
    document.getElementById("countComments").innerText = `(${num})`;
  }
}
