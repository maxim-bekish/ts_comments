import { CommentData } from "./types";

export class DOMHandler {
  static addCommentInDOM(commentElement: string, el: CommentData): void {
    let div_allComments = document.getElementById("allComments");
    let div_commentWrapper = document.createElement("div");

    div_commentWrapper.id = `commentWrapper${el.id}`;
    div_commentWrapper.className = "commentForm";
    let div_comment = document.createElement("div");
    div_comment.id = `comment${el.id}`;
    div_comment.className = `comment`;

    div_allComments.prepend(div_commentWrapper);
    div_commentWrapper.append(div_comment);
    div_comment.innerHTML = commentElement;
  }
}
