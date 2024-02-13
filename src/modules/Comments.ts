import { DOMHandler } from "./DOMHandler";
import { HTML_Comments } from "./HTML_Comments";
import { CommentData } from "./types";

export class Comments {
  newUser(
    newData: {
      first: string;
      last: string;
      title: string;
      img: string;
    },
    text: string
  ): void {
    const newComment: CommentData = {
      firstName: newData.first,
      lastName: newData.last,
      title: newData.title,
      img: newData.img,
      like: 0,
      favorites: false,
      text: text,
      month: new Date().getMonth() + 1,
      day: new Date().getDate(),
      hours: new Date().getHours(),
      minutes: new Date().getMinutes(),
      id: crypto.randomUUID(),
      answers: [],
    };
    const comments: CommentData[] = JSON.parse(localStorage.getItem("comments"))
      ? JSON.parse(localStorage.getItem("comments"))
      : [];
    comments.push(newComment);
    localStorage.setItem("comments", JSON.stringify(comments));
    let htmlComment = new HTML_Comments(newComment).generateHTML();
    DOMHandler.addCommentInDOM(htmlComment, newComment);
  }
}
