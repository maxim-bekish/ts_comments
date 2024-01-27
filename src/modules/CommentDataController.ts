import { CommentData, AnswerData } from "./types";
export class CommentDataController {
  static getComments(): CommentData[] {
    const comments = JSON.parse(localStorage.getItem("comments")) || [];
    return comments;
  }
  static getAnswer(): AnswerData[] {
    const answer = JSON.parse(localStorage.getItem("answer")) || [];
    return answer;
  }

  static updateComments(comments: CommentData[]): void {
    localStorage.setItem("comments", JSON.stringify(comments));
  }
  static updateAnswer(answer: AnswerData[]): void {
    localStorage.setItem("answer", JSON.stringify(answer));
  }
}
