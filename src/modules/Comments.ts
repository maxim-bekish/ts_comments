import { DOMHandler } from "./DOMHandler";
import { HTML_Comments } from "./HTML_Comments";
import { AnswerData, CommentData } from "./types";

export class Comments {
  static newUser(
    newData: {
      first: string;
      img: string;
    },
    text: string
  ): void {
    const newComment: CommentData = {
      firstName: newData.first,
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
    DOMHandler.counterComments(comments.length);
  }
  static newAnswer(
    newData: {
      first: string;
      img: string;
    },
    text: string,
    idComment: string,
    firstName: string,

  ): void {
    const newAnswer: AnswerData = {
      firstNameComment: firstName,
      firstName: newData.first,
      img: newData.img,
      like: 0,
      favorites: false,
      text: text,
      month: new Date().getMonth() + 1,
      day: new Date().getDate(),
      hours: new Date().getHours(),
      minutes: new Date().getMinutes(),
      id: crypto.randomUUID(),
      idComment: idComment,
    };
    const comments: CommentData[] = JSON.parse(
      localStorage.getItem("comments")
    );
    comments.forEach((el) => {
      if (el.id === idComment) {
        el.answers.push(newAnswer);
        let htmlAnswer = new HTML_Comments(newAnswer).generateHTMLAnswer();
        DOMHandler.addAnswerInDOM(htmlAnswer, newAnswer);
      }
    });

    // comments.push(newComments);
    localStorage.setItem("comments", JSON.stringify(comments));
  }
}
