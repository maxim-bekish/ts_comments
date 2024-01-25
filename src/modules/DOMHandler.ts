import { CommentData } from "./types";
import { CommentDataController } from "./CommentDataController";
export class DOMHandler {
  static clearElement(element: HTMLElement): void {
    element.innerHTML = "";
    // while (element?.firstChild) {
    //   element.removeChild(element.firstChild);
    // }
  }
  static countComments() {
    const commentCount =
      JSON.parse(localStorage.getItem("comments"))?.length || 0;

    document.getElementById("countComments").innerHTML = `(${commentCount})`;
  }

  static appendComment(
    wrapperComment: HTMLElement,
    commentHTML: string,
    id: number
  ): void {
    const main = document.getElementById("main");
    const allComments = document.getElementById("allComments");
    wrapperComment.className = "commentForm";
    wrapperComment.id = `wrapperComment${id}`;

    // Заполняем созданный элемент HTML-кодом комментария
    wrapperComment.innerHTML = commentHTML;

    main.append(allComments);
  }
  static appendAnswer(wrapperComment: HTMLElement) {
 
    // const answer = document.createElement("div");
    // answer.className = "1";
    // answer.id = "111111111111111111111111";
    // answer.setAttribute('datar',"11111111111");


    // wrapperComment.append(answer);
  }
  static counterLike(comments: CommentData[]): void {
    comments.forEach((element: any) => {
      let q = document.getElementById(`counterNumber${element.data.id}`);
      let w = document.getElementById(`counterMinus${element.data.id}`);
      let e = document.getElementById(`counterPlus${element.data.id}`);
      q.innerHTML = `${element.like}`;

      w.addEventListener("click", function () {
        element.like--;

        q.innerHTML = `${element.like ? element.like : 0}`;
        CommentDataController.updateComments(comments);
        // Обновление счетчика лайков в реальном времени
        const commentInstance = comments.find(
          (comment) => comment.data.id === element.data.id
        );
        if (commentInstance && commentInstance.updateLike) {
          commentInstance.updateLike(element.like);
        }
      });

      e.addEventListener("click", function () {
        element.like++;

        q.innerHTML = `${element.like}`;
        CommentDataController.updateComments(comments);
        // Обновление счетчика лайков в реальном времени
        const commentInstance = comments.find(
          (comment) => comment.data.id === element.data.id
        );
        if (commentInstance && commentInstance.updateLike) {
          commentInstance.updateLike(element.like);
        }
      });
    });
  }
  static updateCounterText(counterText: HTMLElement, value: string): void {
    counterText.innerHTML = value;
  }
}
