import heart_2 from "./../assets/svg/heart-2.svg";
import share from "./../assets/svg/share.svg";
import answerButton from "./../assets/svg/share.svg";
import { Answer } from "./Answer";
import { CommentData, AnswerData } from "./types";
export class Comment {
  private firstName: string;
  private lastName: string;
  private value: string;
  private img: string;
  private like: number;
  private answerFirstName: string;
  private answerLastName: string;
  private answerTitle: string;
  private answerIMG: string;
  private answerText: string;
  private answerID: number;
  private answerMonth: number;
  private answerDay: number;
  private answerHours: number;
  private answerMinutes: number;
  data: {
    month: number;
    day: number;
    hours: number;
    minutes: number;
    seconds: number;
    id: number;
  };
  answers: Answer[];
  constructor(data: CommentData, answerData?: AnswerData) {
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.value = data.value;
    this.img = data.img;
    this.data = data.data;
    this.like = data.like;
    if (answerData) {
      this.answerIMG = answerData.img;

      this.answerFirstName = answerData.firstName;
      this.answerLastName = answerData.lastName;
      this.answerTitle = answerData.title;
      this.answerText = answerData.answer;
      this.answerID = answerData.id;
      this.answerMonth = answerData.month;
      this.answerDay = answerData.day;
      this.answerHours = answerData.hours;
      this.answerMinutes = answerData.minutes;
    }
  }

  generateHTML(): string {
    // Генерация HTML для ответов

    return `
    <div id="comment${this.data.id}"  class="comment">
      <div class="comment_avatar avatar">
        <img src='${this.img}' alt="avatar" />
      </div>
      <div class="comment_body">
        <div class="comment_body_header">
          <h3>${this.firstName} ${this.lastName}</h3>
          <span>${this.data.day}.${
      this.data.month < 10 ? "0" + this.data.month : this.data.month
    } - ${this.data.hours}:${this.data.minutes}</span>
        </div>
        <div class="comment_body_main">
          ${this.value}
        </div>
        <div class="comment_body_footer">
          <div id="answerButton${this.data.id}" >
            <img src="${answerButton}" />
            <span> Ответ</span>
          </div>
          <div id="favorites${this.data.id}" >
            <img src="${heart_2}" />
            <span>В избранном </span>
          </div>
          <div  class="counter">
            <div id='counterMinus${this.data.id}' >-</div>
            <div id='counterNumber${this.data.id}' >${this.like}</div>
            <div id='counterPlus${this.data.id}' >+</div>
          </div>
        </div>
      </div>
    </div>`;
  }
  generateHTMLAnswer(): string {
    return `<div class="answer">
          <div class="answer_avatar avatar">
            <img src="${this.answerIMG}" alt="avatar" />
          </div>
          <div class="answer_body">
            <div class="answer_body_header">
              <h3 id="userTwo">${this.answerFirstName} ${this.answerLastName}</h3>
              <img src="${share}" alt="share" />
              <span>${this.firstName} ${this.lastName}</span>
              <span>${this.answerDay}.${this.answerMonth} ${this.answerHours}.${this.answerMinutes}</span>
            </div>
            <div class="answer_body_main">
              ${this.answerText}
            </div>
            <div class="answer_body_footer">
              <div id='favoritesAnswer${this.answerID}' >
                <img src="${heart_2}" alt="" />
                <span> В Избранное </span>
              </div>
              <div class="counter">
                <div>-</div>
                <div>3</div>
                <div>+</div>
              </div>
            </div>
          </div>
        </div>`;
  }
  updateLike(newLike: number): void {
    this.like = newLike;
    // Обновите DOM-элемент для счетчика лайков
    const counterElement = document.getElementById(
      `counterNumber${this.data.id}`
    );
    if (counterElement) {
      counterElement.innerHTML = `${newLike}`;
    }
  }
}
