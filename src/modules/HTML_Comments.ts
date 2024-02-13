import heart_2 from "./../assets/svg/heart-2.svg";
import share from "./../assets/svg/share.svg";
import { CommentData } from "./types";

export class HTML_Comments {
  firstName: string;
  lastName: string;
  title: string;
  text: string;
  img: string;
  month: number;
  day: number;
  hours: number;
  minutes: number;
  like: number;
  id: string;
  favorites: boolean;
  firsCom: string;
  lastCom: string;

  constructor(data: CommentData, firsCom?: string, lastCom?: string) {
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
    this.firsCom = firsCom;
    this.lastCom = lastCom;
    this.favorites = data.favorites;
  }

  generateHTML(): string {
    // Генерация HTML для ответов
    return `
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
          <div  id="answerButton${this.id}">
            <img id="answerButton${this.id}" src="${share}" />
            <span id="answerButton${this.id}" > Ответ</span>
          </div>
          <div id="favorites${this.id}" >
            <img src="${heart_2}" />
            <span>${
              this.favorites ? "Удалить из избранного" : "Добавить в избранное"
            }</span>
          </div>
          <div  class="counter">
            <div id='counterMinus${this.id}' >-</div>
            <div id='counterNumber${this.id}' >${this.like}</div>
            <div id='counterPlus${this.id}' >+</div>
          </div>
        </div>
      </div>
    `;
  }

  generateHTMLAnswer(): string {
    return `
      <div class="answer_avatar avatar">
        <img src="${this.img}" alt="avatar" />
      </div>
      <div class="answer_body">
        <div class="answer_body_header">
          <h3>${this.firstName} ${this.lastName}</h3>
          <img src="${share}" alt="share" />
          <span>${this.firsCom} ${this.lastCom}</span>
          <span>${this.day}.${this.month} ${this.hours}.${this.minutes}</span>
        </div>
        <div class="answer_body_main">
          ${this.text}
        </div>
        <div class="answer_body_footer">
          <div id="favoritesAnswer${this.id}">
            <img src="${heart_2}" alt="" />
           <span>${
             this.favorites ? "Удалить из избранного" : "Добавить в избранное"
           }</span>
          </div>
          <div class="counter">
            <div id="counterMinus${this.id}">-</div>
            <div id="counterNumber${this.id}">${this.like}</div>
            <div id="counterPlus${this.id}">+</div>
          </div>
        </div>
      </div>`;
  }
}
