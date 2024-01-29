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
  static getFilter(): string {
    const filter = localStorage.getItem("option");
    return filter;
  }

  static updateComments(comments: CommentData[]): void {

    console.log(comments);
    localStorage.setItem("comments", JSON.stringify(comments));

  }
  // static updateAnswer(answer: AnswerData[]): void {
  //   const x = JSON.parse(localStorage.getItem("comments"));
  //   x.forEach((el: CommentData) => {

      
  //   });
  //   localStorage.setItem("answer", JSON.stringify(answer));
  // }
  static updateFilter(option: string): void {
    localStorage.setItem("filter", option);
  }
}
