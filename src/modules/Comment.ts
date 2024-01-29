import heart_2 from "./../assets/svg/heart-2.svg";
import share from "./../assets/svg/share.svg";
import answerButton from "./../assets/svg/share.svg";
import { CommentData, AnswerData } from "./types";
export class GenerationHTMLElementsComments {
  firstName: string;
  lastName: string;
  title: string;
  text: string;
  img: string;
  id: string;
  month: number;
  day: number;
  hours: number;
  minutes: number;
  like: number;
  favorites: boolean;
  answer?: AnswerData[];
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
    this.favorites = data.favorites;
  }

  generateHTML(): string {
    // Генерация HTML для ответов
    // console.log('generateHTML',this);
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
    </div>`;
  }

  updateLikeComment(newLike: number): void {
    this.like = newLike;
    // Обновите DOM-элемент для счетчика лайков
    const counterElement = document.getElementById(`counterNumber${this.id}`);
    if (counterElement) {
      counterElement.innerHTML = `${newLike}`;
    }
  }
}
export class GenerationHTMLElementsAnswer extends GenerationHTMLElementsComments {
  private firstNameComment: string;
  private lastNameComment: string;

  constructor(answerData: AnswerData, firstName?: string, lastName?: string) {
    super(answerData);
    this.firstNameComment = firstName;
    this.lastNameComment = lastName;
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
          <span>${this.firstNameComment} ${this.lastNameComment}</span>
          <span>${this.day}.${this.month} ${this.hours}.${this.minutes}</span>
        </div>
        <div class="answer_body_main">
          ${this.text}
        </div>
        <div class="answer_body_footer">
          <div id="favoritesAnswer${this.id}">
            <img src="${heart_2}" alt="" />
            <span>В Избранное</span>
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
