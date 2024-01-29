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
  updateLikeComment?: (newLike: number) => void;
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

  updateLikeAnswer?: (newLike: number) => void;
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
