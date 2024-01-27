import heart_2 from "./../assets/svg/heart-2.svg";
import share from "./../assets/svg/share.svg";
import answerButton from "./../assets/svg/share.svg";
import { Answer } from "./Answer";
import { CommentData, AnswerData } from "./types";
export class GenerationHTMLElementsComments {
  private firstName: string;
  private lastName: string;
  private title: string;
  private text: string;
  private img: string;
  private id: string;
  private month: number;
  private day: number;
  private hours: number;
  private minutes: number;
  private like: number;

  // private answerFirstName: string;
  // private answerLastName: string;
  // private answerTitle: string;
  // private answerText: string;
  // private answerIMG: string;
  // private answerID: string;
  // private answerMonth: number;
  // private answerDay: number;
  // private answerHours: number;
  // private answerMinutes: number;
  // private answerLike: number;

  constructor(data: CommentData) {
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.title = data.title;
    this.text = data.text;
    this.img = data.img;
    this.month = data.month;
    this.day = data.day;
    this.hours = data.hours;
    this.minutes = data.minutes;
    this.like = data.like;
    this.id = data.id;

    // if (answerData) {
    //   this.answerFirstName = answerData.firstName;
    //   this.answerLastName = answerData.lastName;
    //   this.answerTitle = answerData.title;
    //   this.answerText = answerData.text;
    //   this.answerIMG = answerData.img;
    //   this.answerMonth = answerData.month;
    //   this.answerDay = answerData.day;
    //   this.answerHours = answerData.hours;
    //   this.answerMinutes = answerData.minutes;
    //   this.answerLike = answerData.like;
    //   this.answerID = answerData.id;
    // }
  }

  generateHTML(): string {
    // Генерация HTML для ответов
    return `
    <div id="comment${this.id}"  class="comment">
      <div class="comment_avatar avatar">
        <img src='${this.img}' alt="avatar" />
      </div>
      <div class="comment_body">
        <div class="comment_body_header">
          <h3> ${this.title} ${this.firstName} ${this.lastName}</h3>
          <span>${this.day}.${
      this.month < 10 ? "0" + this.month : this.month
    } - ${this.hours}:${this.minutes}</span>
        </div>
        <div class="comment_body_main">
          ${this.text}
        </div>
        <div class="comment_body_footer">
          <div id="answerButton${this.id}" >
            <img src="${answerButton}" />
            <span> Ответ</span>
          </div>
          <div id="favorites${this.id}" >
            <img src="${heart_2}" />
            <span>В избранном </span>
          </div>
          <div  class="counter">
            <div id='counterMinus${this.id}' >-</div>
            <div id='counterNumber${this.id}' >${this.like}</div>
            <div id='counterPlus${this.id}' >+</div>
          </div>
        </div>
      </div>
    </div>`;
  }
  // generateHTMLAnswer(): string {
  //   console.log(this);
  //   return `
  //         <div class="answer_avatar avatar">
  //           <img src="${this.answerIMG}" alt="avatar" />
  //         </div>
  //         <div class="answer_body">
  //           <div class="answer_body_header">
  //             <h3 id="userTwo">${this.answerFirstName} ${this.answerLastName}</h3>
  //             <img src="${share}" alt="share" />
  //             <span>${this.firstName} ${this.lastName}</span>
  //             <span>${this.answerDay}.${this.answerMonth} ${this.answerHours}.${this.answerMinutes}</span>
  //           </div>
  //           <div class="answer_body_main">
  //             ${this.answerText}
  //           </div>
  //           <div class="answer_body_footer">
  //             <div id='favoritesAnswer${this.answerID}' >
  //               <img src="${heart_2}" alt="" />
  //               <span> В Избранное </span>
  //             </div>
  //             <div class="counter">
  //               <div id='counterMinus${this.answerID}' >-</div>
  //               <div id='counterNumber${this.answerID}' >${this.answerLike}</div>
  //               <div id='counterPlus${this.answerID}' >+</div>
  //             </div>
  //           </div>
  //         </div>
     
  //      `;
  // }
  updateLikeComment(newLike: number): void {
    this.like = newLike;
    // Обновите DOM-элемент для счетчика лайков
    const counterElement = document.getElementById(`counterNumber${this.id}`);
    if (counterElement) {
      counterElement.innerHTML = `${newLike}`;
    }
  }
  // НУЖНО РЕШИТЬ
  // updateLikeAnswer(newLike: number): void {
  //   this.like = newLike;
  //   // Обновите DOM-элемент для счетчика лайков
  //   const counterElement = document.getElementById(
  //     `counterNumber${this.date.id}`
  //   );
  //   if (counterElement) {
  //     counterElement.innerHTML = `${newLike}`;
  //   }
  // }
}

export class GenerationHTMLElementsAnswer {
  private FirstName: string;
  private LastName: string;
  private Text: string;
  private Img: string;
  private Id: string;
  private Month: number;
  private Day: number;
  private Hours: number;
  private Minutes: number;
  private Like: number;
  private FirstNameComment: string;
  private LastNameComment: string;


  constructor(answerData: AnswerData) {
    this.FirstName = answerData.firstName;
    this.LastName = answerData.lastName;
    this.Text = answerData.text;
    this.Img = answerData.img;
    this.Month = answerData.month;
    this.Day = answerData.day;
    this.Hours = answerData.hours;
    this.Minutes = answerData.minutes;
    this.Like = answerData.like;
    this.Id = answerData.id;
    this.FirstNameComment = answerData.infoComment.first;
    this.LastNameComment = answerData.infoComment.last;
  }

  generateHTMLAnswer(): string {
    return `
          <div class="answer_avatar avatar">
            <img src="${this.Img}" alt="avatar" />
          </div>
          <div class="answer_body">
            <div class="answer_body_header">
              <h3 id="userTwo">${this.FirstName} ${this.LastName}</h3>
              <img src="${share}" alt="share" />
              <span>${this.FirstNameComment} ${this.LastNameComment}</span>
              <span>${this.Day}.${this.Month} ${this.Hours}.${this.Minutes}</span>
            </div>
            <div class="answer_body_main">
              ${this.Text}
            </div>
            <div class="answer_body_footer">
              <div id='favoritesAnswer${this.Id}' >
                <img src="${heart_2}" alt="" />
                <span> В Избранное </span>
              </div>
              <div class="counter">
                <div id='counterMinus${this.Id}' >-</div>
                <div id='counterNumber${this.Id}' >${this.Like}</div>
                <div id='counterPlus${this.Id}' >+</div>
              </div>
            </div>
          </div>
     
       `;
  }
  // updateLikeComment(newLike: number): void {
  //   this.like = newLike;
  //   // Обновите DOM-элемент для счетчика лайков
  //   const counterElement = document.getElementById(`counterNumber${this.id}`);
  //   if (counterElement) {
  //     counterElement.innerHTML = `${newLike}`;
  //   }
  // }
  // НУЖНО РЕШИТЬ
  // updateLikeAnswer(newLike: number): void {
  //   this.like = newLike;
  //   // Обновите DOM-элемент для счетчика лайков
  //   const counterElement = document.getElementById(
  //     `counterNumber${this.date.id}`
  //   );
  //   if (counterElement) {
  //     counterElement.innerHTML = `${newLike}`;
  //   }
  // }
}
