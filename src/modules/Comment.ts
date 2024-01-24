import heart_2 from "./../assets/svg/heart-2.svg";
import answerButton from "./../assets/svg/share.svg";
import { CommentData } from "./types";
export class Comment {
  private firstName: string;
  private lastName: string;
  private value: string;
  private img: string;
  data: {
    month: number;
    day: number;
    hours: number;
    minutes: number;
    seconds: number;
    id: number;
  };
  like: number;

  constructor(data: CommentData) {
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.value = data.value;
    this.img = data.img;
    this.data = data.data;
    this.like = data.like;
  }

  generateHTML(): string {
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
            <img src="./../src/assets/img/test-1.jpg" alt="avatar" />
          </div>
          <div class="answer_body">
            <div class="answer_body_header">
              <h3 id="userTwo"></h3>
              <img src="./../src/assets/svg/share.svg" alt="share" />
              <span>Алексей_1994b </span>
              <span>15.01 15:18</span>
            </div>
            <div class="answer_body_main">
              Наверное, самая большая ошибка создателей сериала была в том, что
              они поставили уж слишком много надежд на поддержку фанатов
              вселенной. Как оказалось на деле, большинство 'фанатов' с самой
              настоящей яростью и желчью стали уничтожать сериал, при этом
              объективности в отзывах самый минимум.
            </div>
            <div class="answer_body_footer">
              <div>
                <img src="./../src/assets/svg/heart-3.svg" alt="" />
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
