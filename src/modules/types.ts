export interface CommentData {
  answerData: any;
  firstName: string;
  lastName: string;
  value: string;
  img: string;
  like: number;
  data?: {
    month: number;
    day: number;
    hours: number;
    minutes: number;
    seconds: number;
    id: number;
  };
  answers?: AnswerData[];
  updateLike?: (newLike: number) => void;
}

export interface AnswerData {
  firstName?: string;
  lastName?: string;
  title?: string;
  img?: string;
  answer?: string;
  id?: number;
  month?: number;
  day?: number;
  hours?: number;
  minutes?: number;
}
