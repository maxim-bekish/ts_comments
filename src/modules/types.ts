export interface CommentData {
  firstNameComment?: string;
  firstName: string | any;
  text: string;
  img: string;
  id: string;
  like: number;
  month: number;
  day: number;
  hours: number;
  minutes: number;
  favorites: boolean;
  answers?: AnswerData[];
}

export interface AnswerData {
  firstNameComment:string,
  firstName: string;
  text: string;
  img: string;
  id: string;
  idComment: string;
  like: number;
  month: number;
  day: number;
  hours: number;
  minutes: number;
  favorites: boolean;
}

export interface UserData {
  first: string;
  img: string;
}
