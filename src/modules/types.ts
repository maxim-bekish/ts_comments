export interface CommentData {
  firstName: string | any;
  lastName: string;
  title: string;
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
  firstName: string;
  lastName: string;
  title: string;
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
  last: string;
  title: string;
  img: string;
}
