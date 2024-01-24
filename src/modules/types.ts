export interface CommentData {
  firstName: string;
  lastName: string;
  value: string;
  img: string;
  data: {
    month: number;
    day: number;
    hours: number;
    minutes: number;
    seconds: number;
    id: number;
  };
  like: number;
  updateLike?: (newLike: number) => void;
}
