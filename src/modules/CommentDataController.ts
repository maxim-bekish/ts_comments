import { CommentData } from "./types";
export class CommentDataController {
  static getComments(): CommentData[] {
    const comments = JSON.parse(localStorage.getItem("comments")) || [];
    return comments;
  }

  static updateComments(comments: CommentData[]): void {
    localStorage.setItem("comments", JSON.stringify(comments));
  }
}
