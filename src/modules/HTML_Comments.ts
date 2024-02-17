import heart_2 from "./../assets/svg/heart-2.svg";
import heart_empty from "./../assets/svg/heart_empty.svg";
import share from "./../assets/svg/share.svg";
import { CommentData } from "./types";

export class HTML_Comments {
  firstNameComment?: string;
  firstName: string;
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

  constructor(data: CommentData) {
    this.firstNameComment = data.firstNameComment;
    this.firstName = data.firstName;
    this.text = data.text;
    this.img = data.img;
    this.month = data.month;
    this.day = data.day;
    this.hours = data.hours;
    this.minutes = data.minutes;
    this.like = data.like;
    this.id = data.id;
    this.favorites = data.favorites;
  }

  generateHTML(): string {
    // Генерация HTML для ответов
    return `

      <div class="comment__avatar avatar">
        <img src='${this.img}' alt="avatar" class="avatar__image" />
      </div>
      <div class="comment__body">
        <div class="comment__header">
          <h3 class="comment__author" >${this.firstName}</h3>
${
  this.firstNameComment
    ? `<img src="${share}" alt="share" class="comment__share-icon" />
    <span class="comment__reply">${this.firstNameComment}</span>`
    : ""
}
          <span class="comment__timestamp" >${this.day}.${
      this.month < 10 ? "0" + this.month : this.month
    } - ${this.hours}:${this.minutes}</span>
        </div>
        <div class="comment__content">
          ${this.text}
        </div>
        <div class="comment__footer">
${
  !this.firstNameComment
    ? `<div id='answerButton${this.id}' class="comment__reply-button" >
    <img id='answerButton${this.id}' src='${share}' class="comment__reply-icon"  />
    <span id='answerButton${this.id}'  class="comment__reply-text" >Ответ</span>
    </div>`
    : ""
}
          <div class='comment__favorites favorites' >
            <img id="imgFavorites${this.id}"  src="${
      this.favorites ? heart_2 : heart_empty
    }" class="comment__favorites-icon" />
            <span id="favorites${this.id}" class="comment__favorites-text" >${
      this.favorites ? "В избранном" : "В избранное"
    }</span>
          </div>
          <div  class="comment__likes likes">
            <div id='counterMinus${
              this.id
            }' class="comment__like-button comment__like-button--minus" >-</div>
            <div id='counterNumber${this.id}' class="comment__like-count" >${
      this.like
    }</div>
            <div id='counterPlus${
              this.id
            }' class="comment__like-button comment__like-button--plus" >+</div>
          </div>
        </div>
      </div>
    `;
  }

  generateHTMLAnswer(): string {
    return `

      <div class="answer__avatar avatar">
        <img src="${this.img}" alt="avatar" class="avatar__image" />
      </div>
      <div class="answer__body">
        <div class="answer__header">
          <div>
            <h3 class="answer__author" >${this.firstName}</h3>
            <img src="${share}" alt="share" class="answer__share-icon" />
            <span class="answer__comment" >${this.firstNameComment}</span>
          </div>
          <span class="answer__timestamp" >${this.day}.${this.month} ${
      this.hours
    }.${this.minutes}</span>
        </div>
        <div class="answer__content">
          ${this.text}
        </div>
        <div class="answer__footer">
          <div class='answer__favorites favorites' >
            <img id="imgFavorites${this.id}" src="${
      this.favorites ? heart_2 : heart_empty
    }" alt="" class="answer__favorites-icon" />
          <span id="favorites${this.id}" class="answer__favorites-text" >${
      this.favorites ? "В избранном" : "В избранное"
    }</span>
          </div>
          <div class="answer__likes likes">
            <div  id="counterMinus${
              this.id
            }" class="answer__like-button answer__like-button--minus">-</div>
            <div id="counterNumber${this.id}" class="answer__like-count" >${
      this.like
    }</div>
            <div id="counterPlus${
              this.id
            }"  class="answer__like-button answer__like-button--plus">+</div>
          </div>
        </div>
      </div>
      `;
  }
}
