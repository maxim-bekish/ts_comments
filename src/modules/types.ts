export interface CommentData {
  firstName: string;
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
  answer?:  AnswerData[];
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
  results: {
    name: {
      first: string;
      last: string;
      title: string;
    };
    picture: {
      large: string;
    };
  }[];
}
